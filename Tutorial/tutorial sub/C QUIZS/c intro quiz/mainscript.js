'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // console.log("test");
    const questionsArray = [
        {
            question: "C is a general-purpose programming language created by Dennis Ritchie at the Bell Laboratories in ____.",
            answers : [
                {text:"1936", correct: false},  
                {text:"1997", correct: false},  
                {text:"1972", correct: true},  
                {text:"1978", correct: false},  
            ]
        },
        {
            question: "c++ is a extension of __.",
            answers : [
                {text:"c#", correct: false},  
                {text:"c", correct: true},  
                {text:"python", correct: false},  
                {text:"none", correct: false},  
            ]
        },
    ]

    // variables
    const questionElement = document.getElementById('question');
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');

    let currentQuestionIndex = null;
    let score = null;

    // start functions
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        // function show questions
        showQuestion();
    }

    function showQuestion() {
        // function to reset the previous answers display by html 
        resetState();
                    // let array question reading under array currentQuestionIndex 0-1...
        let currentQuestion = questionsArray[currentQuestionIndex];
                    //  let questionNo increment after question index 0 next 1 next 2
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
        // here loop to display ansers
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            // classlist function creating class element to css effects
            button.classList.add("btn");
            answerButtons.appendChild(button);
            // logical check if have value true or false
            if(answer.correct) {
                button.dataset.correct = answer.correct;
                // here if button click activates function selectAnswer
            }

            button.addEventListener('click', selectAnswer);
        });
}


    function resetState() {
        // loop removing built my html elements
        //   <button class="btn">Answer1</button>
        // <button class="btn">Answer2</button>
        // <button class="btn">Answer3</button>
        // <button class="btn">Answer4</button>
        nextButton.style.display = "none";
        while(answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        } 
    }


    // function select Answer
    function selectAnswer(e) {
        // selecting the target button and value 
        const selectBtn = e.target;
        //console.log(selectBtn);
        // conditional adding style if the button is clicked depend on the dataset which is true or false
        if(selectBtn.dataset.correct === "true") {
               // console.log('Correct Answer');
                 selectBtn.classList.add("correct");
                 score++;
        }else {
           // console.log('Wrong Answer');
             selectBtn.classList.add("incorrect");
        }

        // array set to disable element of false
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true") {
                button.classList.add("correct");
            }else {
                    // array set to disable element of false
                button.disabled = true;
            }

        });
        // display next button for next questions
        nextButton.style.display = "block";

    }




    function showScore() {
        // reset to change page in the display score 
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questionsArray.length}!`;
        // next button asign new name Play Again if questions is finish
        nextButton.innerHTML = "Play Again";
        // display show the play-again button
        nextButton.style.display = "block";
    }

    function hanldeNextButton() {
        //increase number of question after click event
        currentQuestionIndex++;
        // condition if there is next question continue
        if(currentQuestionIndex < questionsArray.length) {
            showQuestion();
        }
        // else if no any questions display score final
        else {
            showScore();
        }
    }


    nextButton.addEventListener('click', () =>  {
        // console.log(question.length);
        // conditional
        if(currentQuestionIndex < questionsArray.length) {
            hanldeNextButton();
            console.log("dont play again");
        }else {
            startQuiz();
            console.log("play again");
        }
    });


    // function start quiz
    startQuiz();







}, true)

