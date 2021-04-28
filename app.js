const express = require('express');
const session = require('express-session');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs= require('express-handlebars');

app.use('/public', static);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}));

app.use('/logout', async (req,res,next)=>{
  if(!req.session.user)
  return res.status(403).render("error", {title:"User not logged in"});
  else
  next();
});

configRoutes(app);

app.listen(3000,() => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});