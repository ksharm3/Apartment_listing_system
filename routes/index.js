const signupRoutes = require('./users');
const loginRoutes = require("./users")
const constructorMethod = (app) => {

  app.use('/', signupRoutes);
  //app.use('/login', loginRoutes);
    
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;