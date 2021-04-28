const signupRoutes = require('./userSignup');
const loginRoutes = require('./userLogin');
const logoutRoutes = require('./userLogout');
const homepageRoutes = require('./homepage');

const constructorMethod = (app) => {

  app.use('/', homepageRoutes);
  app.use('/signup', signupRoutes);
  app.use('/login', loginRoutes);
  app.use('/logout', logoutRoutes);
    
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;