'use strict';


window.onload = function () {
    Array.prototype.forEach.call(document.querySelectorAll("a.delete")
        ,a => a.onclick = processDelete

    );
    Array.prototype.forEach.call(document.querySelectorAll("a.status")
        ,a => a.onclick = changeTaskStatus

    );

    function changeTaskStatus() {
        makeHttpRequest("PUT", this.href, statusChanged, {status: this.innerHTML});

        return false;

        function statusChanged(rsp) {
            console.log(rsp);
        }

    }

    function processDelete() {
        console.log(this.href);
        makeHttpRequest("DELETE", this.href, deleteTask);

        return false;

        function deleteTask(rsp) {
            console.log(rsp);
            var obj = JSON.parse(rsp);
            var div = document.getElementById(obj.id);
            div.parentNode.removeChild(div);
        }
    }





    let submitBtn = document.getElementById("submit-task");

    submitBtn.onclick = function () {
        var formData = {};

        let method = document.getElementById("task-form").method;
        let uri = document.getElementById("task-form").action;

        var formElems = document.querySelectorAll("input,select,textarea");
        Array.prototype.forEach.call(formElems, fe => {
            if(fe.name) formData[fe.name] = fe.value;
    }
    )
    ;


    console.log(formData);


    makeHttpRequest(method, uri, insertNewTask, formData);

    return false;
}


const API_PREFIX = "/api";

submitBtn.onmouseover = function () {
    let uri = document.getElementById("task-form").action;

    console.log("action in form: " + uri);
    //console.log(prefixUriWith(uri, API_PREFIX));
}

function prefixUriWith(uri, prefix) {

    var parser = document.createElement('a');
    parser.href = uri;

    parser.pathname = prefix + parser.pathname;

    //parser.hostname; // => "example.com"
    //parser.port;     // => "3000"
    //parser.pathname; // => "/pathname/"
    //parser.search;   // => "?search=test"
    //parser.hash;     // => "#hash"
    //parser.host;
    console.log(parser.href);

    return parser.href;
}


function insertNewTask(taskHtml) {
    document.getElementById("tasks").innerHTML += taskHtml;
}

function createBodyString(formData) {
    if(!formData) {
        return null;
    }

    let str = "";
    for (let k in formData) {
        str += k + "=" + formData[k] + "&";
    }

    return str.substring(0, str.length - 1);
}

function makeHttpRequest(method, uri, cb, formData) {
    uri = prefixUriWith(uri, API_PREFIX);

    let xhr = new XMLHttpRequest();

    method = method.toUpperCase();
    console.log("uri", uri);
    console.log("method", method);
    xhr.open(method, uri);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var body = createBodyString(formData);
    console.log(body);
    xhr.send(body);

    xhr.onreadystatechange = function () {
        console.log("onreadystatechange: " + xhr.readyState);
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("Server replied with :", xhr.status);
            cb(xhr.responseText);
        }
    }
}
}