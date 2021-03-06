// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config,
    appDatabaseURI;

var appHost = (process.env.VCAP_APP_HOST || 'localhost');
var appPort = (process.env.VCAP_APP_PORT || 2368);
var appUrl = (process.env.APP_URL || 'http://localhost:' + appPort);

var mailUsername = (process.env.MAIL_USER || 'test');
var mailPassword = (process.env.MAIL_PASS || 'test');

if(process.env.VCAP_SERVICES) {
    var services = JSON.parse(process.env.VCAP_SERVICES);
    appDatabaseURI = services.elephantsql[0].credentials.uri;
} else {
    appDatabaseURI = "postgresql://localhost/peter";
}

var env = process.env.NODE_ENV || 'development';

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: appUrl,
        mail: {
            transport: 'SMTP',
            host: 'smtp.mailgun.org',
            port: 587,
            options: {
                service: 'Mailgun',
                auth:{
                    user: mailUsername,
                    pass: mailPassword
                }
            }
        },
        database: {
            client: 'postgres',
            connection: appDatabaseURI,
            pool: {
                min: 1,
                max: 5
            },
            debug: false
        },

        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: appHost,
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: appPort
        },
        fileStorage: false
    },

    // ### Development **(default)**
    development: {
        url: appUrl,
        mail: {
            transport: 'SMTP',
            host: 'smtp.mandrillapp.com',
            port: 587,
            options: {
                service: 'Mandrill',
                auth:{
                    user: mailUsername,
                    pass: mailPassword
                }
            }
        },
        database: {
            client: 'postgres',
            connection: appDatabaseURI,
            pool: {
                min: 2,
                max: 4
            },
            debug: false
        },
        server: {
            host: '127.0.0.1',
            port: '2368'
        },
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '129.168.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

// Export config
module.exports = config;
