const app = require('./server');
const router = require('./routes/main');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret: 'coiso e tal',
    // create new redis store.
    store: new redisStore({ 
        host: 'localhost', 
        port: 6379, 
        client: client,
        ttl : 260}),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));

app.use('/',router);