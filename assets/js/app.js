const questions = [{
    question: 'Shinjırdağı tok kúshi 2 A bolsa, 15 minutta ótkizgishtiń kese-kesiminen qansha mugdarda zaryad agıp ótedi?',
    answers: [{
        text: '300 С',
        correct: false,
    },
    {
        text: '1800 С',
        correct: true,
    },
    {
        text: '900 С',
        correct: false,
    },
    {
        text: '600 С',
        correct: false,
    }]
}, {
    question: 'Eger ótkizgishtiń kese-kesiminen 2 minut dawamında 480 C zaryad ótken bolsa, 1 s dawamında ótkizgishtiń kese-kesiminen qansha elektron ótken?',
    answers: [{
        text: '3·10<sup>18</sup>',
        correct: false,
    },
    {
        text: '2,5·10<sup>19</sup>',
        correct: true,
    },
    {
        text: '2,5·10<sup>18</sup>',
        correct: false,
    },
    {
        text: '4·10<sup>19</sup>',
        correct: false,
    }]
}, {
    question: 'Otkizgishtiń ushlarına 24 V kernew jalganganda onnan 400 mA tok ótken. Ótkizgishtin elektr qarsılığı qanday bolgan?',
    answers: [{
        text: '30',
        correct: false,
    },
    {
        text: '180',
        correct: false,
    },
    {
        text: '60',
        correct: true,
    },
    {
        text: '120',
        correct: false,
    }]
}, {
    question: 'Uzınlığı 4 m, kese-kesiminiń maydanı 0,8 mm2 bolgan nikelin sım elektr shinjirga jalgangan. Eger simnin ushlarındağı kernewge 6 V berilse, sim arqalı qanday tok ótedi (A)? Nixrom ushın salıstırma qarsılıq p = 0,4·10<sup>-6</sup> Q·m ge teń.',
    answers: [{
        text: '1,5',
        correct: false,
    },
    {
        text: '2',
        correct: false,
    },
    {
        text: '3',
        correct: true,
    },
    {
        text: '4,5',
        correct: false,
    }]
}, {
    question: 'Elektr qarsılığı 4 N; 5 Q hám 20 N bolgan ótkizgishler bir-birine parallel jalgansa, uliwma qarsılıq qanday boladı (2)?',
    answers: [{
        text: '2',
        correct: true,
    },
    {
        text: '4',
        correct: false,
    },
    {
        text: '3',
        correct: false,
    },
    {
        text: '5',
        correct: false,
    }]
}, {
    question: 'Parallel jalgangan 6 birdey rezistor izbe-iz jalgansa, uliwma qarsılıq qáytip ozgeredi?',
    answers: [{
        text: '36 ese artadı',
        correct: true,
    }, {
        text: '3 ese artadı',
        correct: false,
    }, {
        text: '12 ese kemeydi',
        correct: false,
    }, {
        text: '9 ese kemeyedi',
        correct: false,
    },
    ]
}, {
    question: 'Uliwma qarsılığı 40 Q boliwi ushin 122 qarsılıqqa qanday qarsılıqtı parallel jalgaw kerek (2)?',
    answers: [{
        text: '60',
        correct: true,
    }, {
        text: '80',
        correct: false,
    }, {
        text: '30',
        correct: false,
    }, {
        text: '90',
        correct: false,
    },
    ]
}, {
    question: 'Tegis kondensatordıń bir plastinkası +5 μC, ekinshi -5 μC zaryad algan. Kondensator qanday zaryad algan (μC)?',
    answers: [{
        text: '2,5',
        correct: false,
    }, {
        text: '10',
        correct: false,
    }, {
        text: '5',
        correct: true,
    }, {
        text: 'zaryad almagan',
        correct: false,
    },
    ]
}, {
    question: 'Tegis kondensator qaplamalarına 1,2 kV kernew berilgende, 48 μC zaryad aldı. Kondensator sıyımlılığı qansha bolgan (nF)?',
    answers: [{
        text: '57,6',
        correct: false,
    }, {
        text: '40',
        correct: true,
    }, {
        text: '25',
        correct: false,
    }, {
        text: '36',
        correct: false,
    },
    ]
}, {
    question: 'Tegis kondensatordın qaplamalarınıń arası dielektrik sindiriwshiligi &=3 bolgan zat penen toltırılsa, onin elektr sıyımlılığı qáytip ózgeredi?',
    answers: [{
        text: '9 ese artadı',
        correct: true,
    }, {
        text: '3 ese artadı',
        correct: false,
    }, {
        text: '1,5 ese kemeyedi',
        correct: false,
    }, {
        text: '3 ese kemeyedi',
        correct: false,
    },
    ]
}, {
    question: 'Parallel jalgangan 4 birdey kondensator izbe-iz jalgansa, uliwma sıyımlılıq qáytip ózgeredi?',
    answers: [{
        text: '4 ese artadi',
        correct: false,
    }, {
        text: '16 ese artadı',
        correct: false,
    }, {
        text: '2 ese kemeyedi',
        correct: false,
    }, {
        text: '16 ese kemeyedi',
        correct: true,
    },
    ]
}];

const questionElement = document.getElementById("quiz");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");
let correctAudio = new Audio('assets/sound/correct.mp3');
let errorAudio = new Audio('assets/sound/error.mp3');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Keyingi";
    questionElement.style = 'block';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    shuffleArray(currentQuestion.answers).forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button")
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    // console.log(isCorrect);

    if (isCorrect) {
        selectBtn.classList.add('correct');
        correctAudio.play();
        score++;
    } else {
        selectBtn.classList.add('incorrect');
        errorAudio.play();
        window.navigator.vibrate(200);
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
            // console.log(button.dataset.correct);
            // score++;
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
    // answerButton.style.display = 'none';

}

function showScore() {

    var data = {
        service_id: 'service_rmqse08',
        template_id: 'template_l1vudja',
        user_id: 'DXhmtKNhKZ4z4YJDU',
        template_params: {
            first_name: person.first_name,
            last_name: person.last_name,
            klass: person.klass,
            sending_date: Date(),
            count_of_questions: questions.length,
            count_of_true_answers: score,
        }
    };
    
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function() {
        alert('Your mail is sent!');
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    });

    resetState();
    let persentage = (100 / questions.length) * score;
    questionElement.innerHTML = `Nátiyje: ${Math.round(persentage)}%<br>Sorawlar: ${questions.length} Ball: ${score}!`;
    nextButton.style.display = 'block';
    nextButton.innerHTML = 'Qayta tapsırıw';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();