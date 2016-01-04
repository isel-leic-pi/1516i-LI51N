'use strict';


//
//(function() {
//
//
//})();


window.onload = function() {
   let submitBtn = document.getElementById("submit-task");

    submitBtn.onclick = function () {
        let description = document.getElementById("description").value;
        let status = document.getElementById("status").value;
        let duedate = document.getElementById("duedate").value;
        let method = document.getElementById("task-form").method;
        let uri = document.getElementById("task-form").action;

        makeHttpRequest(description, status, duedate, method, uri);

        return false;
    }


    function makeHttpRequest(description, status, duedate, method, uri) {
        let xhr = new XMLHttpRequest();

        method = method.toUpperCase();
        console.log("uri", uri);
        console.log("method", method);
        xhr.open(method, uri);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        var body = "description=" + description + "&status=" + status + "&duedate=" + duedate;

        console.log(body);
        xhr.send(body);

        xhr.onreadystatechange = function() {
            console.log("onreadystatechange: " + xhr.readyState);
            if(xhr.readyState == 4) {
                console.log("Server replied with :", xhr.status);
                alert("Server replied" + xhr.responseText);
            }
        }
    }
}