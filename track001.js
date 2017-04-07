/**
 * Created by Sergey on 07.04.17.
 */
function uuid() {
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function getDomain() {
    var result = ""

    try {
        if (window.location.hostname) {
            result = window.location.hostname;
        } else {
            var link = document.createElement("a");
            link.setAttribute("href", window.location.origin);
            result = link.hostname;
        }
    } catch (e) {
        console.error(e);
    }

    return result;
}

function getPath() {
    var result = "";

    try {
        if (window.location.hostname) {
            result = window.location.hostname;
        } else {
            var link = document.createElement("a");
            link.setAttribute("href", window.location.origin);
            result = link.pathname;
        }
    } catch (e) {
        console.error(e);
    }
}

function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var result = "";

    try {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }        } catch (e) {
        console.error(e);
    }

    if(!result){
        result = uuid();
        setCookie(name, uuid(), 365*10);
    }

    return result;
}

(function () {
    var userData = {
        domain: getDomain(),
        path: getPath(),
        cookie: getCookie("appmobiles"),
        allCookie: document.cookie
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/track", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    console.log("user data:" + JSON.stringify(userData));

    // send the collected data as JSON
    xhr.send(JSON.stringify(userData));

    xhr.onloadend = function () {
        // done
    };
})();