"use strict";

module.exports.parse = function (parserConfig, args) {

    //{ switchPrefix: "-", multiValueDelimiter: ","}
    console.log(parserConfig);
    args = args.slice(2);
    console.log(args);

    var config = { }//hasErrors: function() { return false; }};

    args.forEach((e, idx, a) => {
        console.log("e: %s. idx: %s. sw: %s", e, idx, e.startsWith("-"));
        if(idx%2 == 0 && e.startsWith(parserConfig.switchPrefix)) {
            console.log("######");
            var propName = e.substr(parserConfig.switchPrefix.length);
            var value = a[idx+1].split(parserConfig.multiValueDelimiter);
            config[propName] = value.length == 1 ? value[0] : value;
            console.log("config[%s] = %s", propName, config[propName]);
        }
    });
    console.log(config);
    return config;

};





