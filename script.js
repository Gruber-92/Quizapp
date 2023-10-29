let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "In welcher Gegend wuchs Son-Goku auf?",
        "answer_1": "Berg Paozu ",
        "answer_2": "Osaka",
        "answer_3": "Berlin, Kreuzberg",
        "answer_4": "Am Bratpfannenberg",
        "right_answer": 1
    },
    {
        "question": "Wer ist der Vater von Trunks?",
        "answer_1": "Son-Goku",
        "answer_2": "Krillin",
        "answer_3": "Vegeta",
        "answer_4": "Raditz",
        "right_answer": 3
    },
    {
        "question": "Wer konnte Cell am Ende bezwingen?",
        "answer_1": "Son-Goku",
        "answer_2": "Meister Quite",
        "answer_3": "Son-Gohan",
        "answer_4": "Vegeta",
        "right_answer": 3
    },
    {
        "question": "Welcher Satz kommt in jedem der 9 Star Wars-Filme vor?",
        "answer_1": "Das ist der Weg",
        "answer_2": "Ich habe da ein ganz mieses Gefühl",
        "answer_3": "Möge die Macht mit dir sein",
        "answer_4": "Ich bin dein Vater",
        "right_answer": 2
    },
    {
        "question": "Wer spielt Obi-Wan Kenobi in der nach dem Yedi-Meister benannten Serie?",
        "answer_1": "Alec Guinness",
        "answer_2": "Ewan McGregor",
        "answer_3": "Sung Kang",
        "answer_4": "Robert Downey Jr.",
        "right_answer": 2
    },
    {
        "question": "The Mandalorian: Aus welchem Metall besteht die Rüstung von Din Djarin und aller Mandalorianer?",
        "answer_1": "Durastahl",
        "answer_2": "Beskar",
        "answer_3": "Bronzium",
        "answer_4": "Vibranium",
        "right_answer": 2
    },
];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right questions').innerHTML = rightQuestions;
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width:${percent}%;`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (document.getElementById(idOfRightAnswer).parentNode.classList.contains('bg-success')) {
        return;
    }

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display: none;';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}