
const clp = require("../clp");
const fapi = require("../fapi");




var clo = clp.parse(process.argv);



fapi.getLeagues(clo.leagues, processLeagues);




function processLeagues(leagues) {
    l.forEach(leagues)
}





