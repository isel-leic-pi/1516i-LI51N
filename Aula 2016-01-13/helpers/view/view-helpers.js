'use strict';

const debug = require("debug")("view-helpers");
const classes = require('./status-to-css-classes.json');
const Handlebars = require('hbs');

Handlebars.registerPartials(__dirname + '/views/partials');

debug("Handlebars object " +  Handlebars.registerHelper);






module.exports = function() {
    Handlebars.registerHelper('statusClass', function(status, classType) {
        return new Handlebars.SafeString(classes[status][classType]);
    });
};


