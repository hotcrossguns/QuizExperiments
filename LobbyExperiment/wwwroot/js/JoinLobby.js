"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/lobby").build();

connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("newLobbyButton").addEventListener("click", function (event) {
    connection.invoke("GenerateNewGroup").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("findLobbyButton").addEventListener("click", function (event) {
    connection.invoke("findGroupName").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

connection.on("ReceiveGroupName", function (groupName) {
    location.href = "https://localhost:44382/Room/RoomView?groupName=" + groupName;
});