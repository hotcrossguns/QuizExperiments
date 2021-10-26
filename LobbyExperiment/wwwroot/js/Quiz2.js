"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/lobby").build();
var group = document.getElementById("groupName").textContent;

//Questions should come from view model
const questions = [
    {
        question: "What is the capital of France?",
        options: [
            { text: "Paris", correct: true },
            { text: "Venice", correct: false },
            { text: "Sydney", correct: false },
            { text: "London", correct: false },
            ] 
    }
]
let currentQuestionIndex = 0;
const questionElement = document.getElementById("question");
const optionButtonsElement = document.getElementById("option-buttons");

const questionTime = 10;
const countdownTimer = document.getElementById("countdown");
let time = questionTime;

var optionPicked = "no option";
var timePicked;

setInterval(updateCountdown, 1000);

function updateCountdown() {
    //const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    countdownTimer.innerHTML = `${seconds}`;
    time--;
    if (time == 0) {
        //disableButtons();
        sendResult();
        countdownTimer.hidden = true;
        resetState();
    }
}

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
    setNextQuestion();
}).catch(function (err) {
    return console.error(err.toString());
});

function getListOfPlayers() {
    connection.invoke("GetListOfPlayers", group).catch(function (err) {
        return console.error(err.toString());
    });
}

function sendResult() {
    /*connection.invoke("SendResultToGroup", group, optionPicked, timePicked).catch(function (err) {
        return console.error(err.toString());
    });*/
    var result;
    if (optionPicked == "no option") {
        result = ` picked ${optionPicked}`;
    }
    else {
        result = ` picked ${optionPicked} in ${timePicked} seconds`;
    }
    console.log(result);
    connection.invoke("SendResultToGroup", group, result).catch(function (err) {
        return console.error(err.toString());
    });
}

connection.on("receiveResult", function (result) {
    var list = document.getElementById("resultList");
    var li = document.createElement("li");
    list.appendChild(li);
    li.textContent = result;
});

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function selectAnswer(e) {
    const selectedButton = e.target;
    optionPicked = selectedButton.dataset.name;
    timePicked = questionTime - time;
    resetState();
    //const correct = selectedButton.dataset.correct;
}

function resetState() {
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.dataset.name = button.innerText;
        if (option.correct) {
            button.dataset.correct = option.correct;
        }
        button.addEventListener("click", selectAnswer);
        optionButtonsElement.appendChild(button);
    })
}