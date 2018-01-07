// Setting up
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectRedis = require("connect-redis")(session);
const csrf = require("csurf");
const cJSON = require("circular-json");
const compression = require("compression");
const redis = require("redis");
const helmet = require("helmet");
const fs = require("fs-extra");
const path = require("path");
const uuid = require("uuid");
const url = require("url");
const morgan = require("morgan");
const http = require("http");
const https = require("https");
const DiscordStrategy = require("./serverModules/DiscordStratagey");
const passportRefresh = require("passport-oauth2-refresh");
const favicon = require("serve-favicon");
const cluster = require("cluster");
const constants = new (require("../Internals/Constants"))()
// const serverUtils = new (require("./serverUtils"))();

exports.init = () => {

    // This is for morgan
    console.stream = {
        write: (message, encoding) => {
            console.log(constants.web.morgan.FORMAT(cluster.worker.id, message));
        },
    };

    var redisInstance = null;
    // The Arguments have been temp disabled with this statement because, well I have no idea what DB should be. - Oscar (oskikiboy)
    if (!config.devConfig.redisCredentials) {
        redisInstance = redis.createClient();
    } else {
        redisInstance = redis.createClient(config.redis.pass ? { host: config.redis.host, port: config.redis.pass, db: config.redis.db, pass: config.redis.pass } : { host: config.redis.host, port: config.redis.pass, db: config.redis.db });
    }
    const app = express(),
          redisPub = redis.createClient(config.redis.pass ? { host: config.redis.host, port: config.redis.pass, pass: config.redis.pass } : { host: config.redis.host, port: config.redis.pass }),
          redisSub = redisPub.duplicate(),
          httpServer = http.createServer(/* {cert: fs.readFileSync(path.join(__dirname, "ssl.pem")).toString()}, */app),
          discordStrat = new DiscordStrategy({
              clientID: config.discord.id,
              clientSecret: config.discord.clientSecret,
              callbackURL: config.discord.callback,
          },
                                             (accessToken, refreshToken, profile, done) => {
              profile.refreshToken = refreshToken;
              redisPub.publish(config.devConfig.instanceName || "dbots.io", cJSON.stringify({ req: "newJoinOAuthInviteRequest", access_token: accessToken, id: profile.id }), err => {
                  if (!err) { console.info("NOTIF - Asking bot to join new user to dbots.io guild."); } else { console.error(`An error has occoured, ${err}`); console.debug(`Error Stacktrace: ${err.stack}`); }
              });
              process.nextTick(() => done(null, profile));
          });

    redisSub.subscribe(config.devConfig.instanceName || "dbots.io");
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(csrf({ cookie: true }));
    app.enable("trust proxy");
    app.use(compression({ filter: function (req, res) {
        if (req.headers["x-no-compression"]) {
            return false;
        }
        return compression.filter(req, res);
    } }));
    app.use("/", express.static(`${__dirname}/static`));
    app.use("/nm", express.static(path.join(__dirname, "../../../node_modules")));
    app.use(favicon(`${__dirname}/static/img/favicon.ico`));
    app.use(require("morgan")(`${":method".bold} ${":url".italic} :response-time ~ [:remote-addr :remote-user]`, { stream: console.stream }));
    //serverUtils.createSecret().then(s =>{
        app.use(session({
            store: new connectRedis({ client: redisInstance }),
            genid: function () {
                return uuid.v4();
            },

            name: "session",
            secret: /*s*/ config.discord.secret,
            resave: false,
            saveUninitialized: false,
        }));
    //})
    app.use(helmet(constants.web.helmet.CONFIG));
    app.use((req, res, next) => {
        res.setHeader("X-Powered-By", "Magic");
        next();
    });
    passportRefresh.use(discordStrat);
    passport.use(discordStrat);
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((id, done) => {
        done(null, id);
    });
    app.use(passport.initialize());
    app.use(passport.session());

    fs.readdir(path.join(__dirname, "./serverModules/routers"), (err, files) => {
        let count = 0;
        files.forEach(file => {
            loadedFiles = files;
            app.use(require(`./serverModules/routers/${file}`));
            count++;
        });
        console.info(`Succesfuly loaded ${count} router files!`);
        app.use((req, res, next) => {
            res.status(404).render("error", { title: "Error", location: "error", code: 404, msg: "Not Found", req, res });
        });
        app.use((err, req, res, next) => {
            console.error(err);
            if (err) {
                res.status(500).render("error", { title: "Error", location: "error", code: 500, msg: "Internal Server Error", req, res });
            }
        });
    });

    // Broadcasts data saying that the webserver is ready
    Utils.workerReady("web");

    // Start listenng on the defined port, or default to 8081
    httpServer.listen(config.port || 8081, err => {
        if (err) {
            console.crit("Failed to bind webserver to port", { err_name: err.name, err_message: err.message });

            return console.debug("Worker stack trace: ", { stack: err.stack });
        }
        console.info(`Successfully started server...listening on port ${config.port || 8081}`);
    });
};
