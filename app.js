var createError = require('http-errors');
var express = require('express');
const Sequelize = require('sequelize')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');

var app = express();

const sequelize = new Sequelize('sohochallenge','root','', {
  host:'localhost',
  dialect:'mysql'
})

const proyectosModel = sequelize.define('proyectos', {
  "id": { type:Sequelize.INTEGER, primaryKey:true},
  "siteImageUrl": Sequelize.STRING,
  "logoImageUrl": Sequelize.STRING,
  "tituloProyecto": Sequelize.STRING,
  "descripcion": Sequelize.STRING,
  "tags": Sequelize.STRING
})

sequelize.authenticate().then(() => {
  console.log('Conectado')
}).catch(error => console.log('Error: ', error))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.listen(3000, () => {
  console.log('Serve rup en puerto 3000')
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});



module.exports = app;
