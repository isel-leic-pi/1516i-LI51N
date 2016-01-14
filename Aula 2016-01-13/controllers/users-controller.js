'use strict';

const debug = require("debug")("users-controller");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

function verifyCredentialsAndGetUser(username, password, done) {
    debug("username: %s - password: %s", username, password);

    if(username == password) {
        done(null, {name: username, secret: "SLB é o maior"} );
    }
    else {
        done(null, false, { message: 'Incorrect username or password.' })
    }
}

passport.use(new LocalStrategy(
    function(username, password, done) {
        verifyCredentialsAndGetUser(username, password, done);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    //User.findById(id, function(err, user) {
        done(null, user);
    //});
});

const tasksModel = require("../app-logic/tasks-model");



var express = require('express');
var router = express.Router();




router.get('/login', function(req, res) {
    debug("error flash session: %j", req.session.flash)
    let error = req.flash("error");
    debug("error flash session after: %j", req.session.flash)
    debug("error flash: %j", error);

    res.render('login', { error: error});
});

router.post("/login",
    passport.authenticate('local',
        { successRedirect: '/tasks',  failureRedirect: '/login', failureFlash: true }),
    function(req, res, next) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        debug("user %j is logged in", req.user);
        next();
    }
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});


module.exports = router;