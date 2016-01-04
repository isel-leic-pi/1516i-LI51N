'use strict';

const debug = require("debug")("view-helpers");
const classes = require('./status-to-css-classes.json');
const Handlebars = require('hbs');

debug("Handlebars object " +  Handlebars.registerHelper);






module.exports = function() {
    Handlebars.registerHelper('statusPanelClass', function(status) {
        return new Handlebars.SafeString(classes[status].panelClass);
    });
    Handlebars.registerHelper('statusIconClass', function(status) {
        return new Handlebars.SafeString(classes[status].iconClass);
    });
};


