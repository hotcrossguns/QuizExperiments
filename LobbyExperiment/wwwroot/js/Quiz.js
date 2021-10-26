"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/lobby").build();
var group = document.getElementById("groupName").textContent;

connection.on("UpdatePlayerList", function (players) {
    var list = document.getElementById("playerList");
    list.innerHTML = ``;
    for (var i = 0; i < players.length; i++) {
        var li = document.createElement("li");
        list.appendChild(li);
        li.textContent = `${players[i]}`;
    }
});

connection.start().then(function () {
    console.log("Start");
    connection.invoke("AddToGroup", group).catch(function (err) {
        return console.error(err.toString());
    });
    getListOfPlayers();
}).catch(function (err) {
    return console.error(err.toString());
});

function getListOfPlayers() {
    connection.invoke("GetListOfPlayers", group).catch(function (err) {
        return console.error(err.toString());
    });
}

document.getElementById("option1").addEventListener("click", function (event) {
    console.log("option1");
    disableButtons("option1");
    event.preventDefault();
});

document.getElementById("option2").addEventListener("click", function (event) {
    disableButtons("option2");
    event.preventDefault();
});

document.getElementById("option3").addEventListener("click", function (event) {
    disableButtons("option3");
    event.preventDefault();
});

document.getElementById("option4").addEventListener("click", function (event) {
    disableButtons("option4");
    event.preventDefault();
});

function disableButtons(option) {
    document.getElementById("option1").disabled = true;
    document.getElementById("option2").disabled = true;
    document.getElementById("option3").disabled = true;
    document.getElementById("option4").disabled = true;
}
