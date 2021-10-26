"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/lobby").build();
var group = document.getElementById("groupName").textContent;
var numberOfPlayers;

connection.on("UpdatePlayerList", function (players, numberNeeded) {
    numberOfPlayers = players.length;
    document.getElementById("noOfPlayersNeeded").innerHTML = numberNeeded;
    var list = document.getElementById("playerList");
    list.innerHTML = ``;
    for (var i = 0; i < players.length; i++) {
        var li = document.createElement("li");
        list.appendChild(li);
        li.textContent = `${players[i]}`;
    }
    if (numberNeeded <= 0) {
        Begin();
    }
});

connection.start().then(function () {
    connection.invoke("AddToGroup", group).catch(function (err) {
        return console.error(err.toString());
    });
    getListOfPlayers();
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("StartGame", function () {
    location.href = "https://localhost:44382/Game/QuizView?groupName=" + group;
});

function Begin() {
    console.log("begin");
    connection.invoke("StartGroupGame", group).catch(function (err) {
        return console.error(err.toString());
    });
}

function getListOfPlayers() {
    connection.invoke("GetListOfPlayers", group).catch(function (err) {
        return console.error(err.toString());
    });
}