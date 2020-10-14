const bodyParser = require('body-parser')
    , cors = require('cors')
    , createError = require('http-errors')
    , express = require('express')
    , helmet = require('helmet')
    , logger = require('morgan')
    , passport = require('passport')
    , path = require('path')
    , Sequelize = require("sequelize")
    , session = require('express-session')
    , SequelizeStore = require("connect-session-sequelize")(session.Store)
    , {uuid} = require('uuidv4');

require('dotenv').config({path: `./env/${process.env.ENVIRONMENT}.env`});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

let sequelize = new Sequelize(process.env.DATABASE_CONNECTION_STRING, {
    define: {
        schema: process.env.DATABASE_CONNECTION_SCHEMA
    }
});

let store = new SequelizeStore({
    db: sequelize,
    tableName: 'session'
});

app.use(session({
    genid: (req) => {
        return uuid();
    },
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 30 * 1000 * 60}
}));

app.use(passport.initialize());

app.use(passport.session());

app.use('/api', require('./routes/Routes')(passport));



app.use(function (req, res, next) {
    next(createError(404));
});


app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
