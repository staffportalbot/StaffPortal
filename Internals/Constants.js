class constants {
    constructor() {
        this.web = {
            helmet: {
                COMFIG: {
                    frameguard: {
                        action: "deny",
                    },
                    noCache: false,
                    xssFilter: true,
                    hsts: false,
                    expectCt: false,
                    hidePoweredBy: false,
                    referrerPolicy: true,
                    hpkp: false,
                    ieNoOpen: true,
                    noSniff: true,
                    frameguard: {
                        action: "sameorigin",
                    }
                }},


            morgan: {
                FORMAT: (id, msg) => `(${new Date().toUTCString()}) (Web) [${"INFO".blue}]` + ` - ${msg}`
            }
        }
    };
};

module.exports = constants;