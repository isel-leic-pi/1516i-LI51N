

var outraFrame = "Granda penalidade";

function oFrame(req, rsp) {
    console.log("Method: " + req.method);
    console.log("Uri: " + req.url);
    console.log("Headers: " + JSON.stringify(req.headers))

    rsp.setHeader("Content-Type", "text/plain")
    rsp.setHeader("Set-Cookie", ["MAXIMA_DO_DIA=O Frame", "OUTRA_MAXIMA=Granda penalidade"]);
    rsp.end("Hello World\n")
}

module.exports.processRequest = oFrame;
