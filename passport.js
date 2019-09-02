const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./models/CompanyAdminModel')
const opts = {};


opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        User.findOne({_id: jwt_payload.id})
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => {
                console.error(err);
                return done(err, false)
            });
    }));
}