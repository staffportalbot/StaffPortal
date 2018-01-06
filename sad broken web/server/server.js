// Cluster
import cluster from 'cluster';

// Express
import ejs from 'ejs';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import minifyHTML from 'express-minify-html';

var { buildSchema } = require('graphql');

// Configuration
import config from './config.json';

// Native Modules
import path from 'path';

const app = express();
const port = process.env.PORT || config.port;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  }
};

// App config
app.set('json spaces', 2);
app.set('port', port);
app.set('views', path.join(__dirname, '..', 'web', 'views'));
app.set('view engine', 'ejs');

// Middleware
/*app.use('/api/:v/:p', require('./routes/api'));
app.use('/api/:v', require('./routes/api'))*/
app.use('/api/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.use(minifyHTML(config.expressMinify));
app.use('/', express.static(path.join(__dirname, '..', 'web', 'static')));
app.use('/', require('./routes'));
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Magic');
    next();
});

// Start listening on defined port & notify master
app.listen(app.get('port'), () => {
  cluster.worker.send({
    "type": "status",
    "subject": "web",
    "data":"ready"
  });
});