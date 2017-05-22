let passport          = require('passport');
let LocalStrategy     = require('passport-local').Strategy
let pgp               = require('pg-promise')();
let pwd               = require('pwd');


/**
 * Settings
 */
let settings  = require('./settings');
let db        = pgp(settings.postgres);

/**
 * Helpers
 */
let {
  handleQuery, 
  handleResp, 
  handleCatch,
} = require('./helpers');


/*================================
=            Passport            =
================================*/
let authenticate = function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    console.log('Passport: Authenticate');
    if (err || !user) {
      let msg = err;
      if(err && err.message){
        msg = err.message;
      }
      else if(info && info.message){
        msg = info.message;
      }
      return handleCatch(res, msg);
    }
    else{
      req.logIn(user, function(err) {
        if (err) {
          handleCatch(res, err);
        }
        else{
          return handleResp(res, user);
          // return res.redirect('/home');
        }
      });
    }
  })(req, res, next);
};

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass'
  },
  (email, password, done) => {
    let user;
    console.log("Passport: LocalStrategy");
    return db.one("SELECT id, uname, email, password, salt, hash FROM users WHERE email=$1", [email])
    .then(res => {
      user = res;
      return pwd.hash(password, res.salt);
    })
    .then(res => {
      let {email, id, uname} = user;
      
      if(id === 0 && user.password){
        if(user.password === password){
          return done(null, {
            email, id, uname
          });
        }
        else{
          return done('Login details were incorrect');
        }
      }
      else if(user.hash === res.hash ){
        // Return user object
        return done(null, {
          email, id, uname
        });
      }
      else{
        return done('Login details were incorrect');
      }
    })
    .catch((err) => {
      return done(err);
    });
}));

passport.serializeUser(function(user, done) {
  console.log('Passport: serializeUser');
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('Passport: deserializeUser');
  done(null, user);


  // let query = db.one('select id, email FROM users WHERE user_id = $1', [id])
  // .then((user)=>{
  //   done(null, user);
  // })
  // .catch((err)=>{
  //   done(new Error(`User with the id ${id} does not exist`));
  // })
});

/*=====  End of Passport  ======*/

module.exports = authenticate;