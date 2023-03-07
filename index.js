let header = document.querySelector("header"); //here I selected my header element
let home = document.getElementById("start-container"); //here I selected my start container
let questionContainer = document.getElementById("question-container"); // here I selected my question container
let startBtn = document.getElementById("start-button"); //here I selected my start button element
let nextBtn = document.getElementById("next-btn");
let questionEL = document.getElementById("question"); //selected my question div
let answerBtnEL = document.getElementById("answer-buttons"); //selected my answer buttons
// let submitButton = document.getElementById("submit"); //select my submit button
let timer = document.querySelector(".time"); //here I selected my time element
let body = document.querySelector("body");
let title = document.querySelector("h1"); //here I selected my h1
let rules = document.querySelector("p"); //here I selected my p
let container = document.querySelector("container");

let answerButtons = document.querySelectorAll("btn");

let shuffledQuestions, currentQuestionsIndex;
var time = 60;
let playerScore = 0; //start my score with 0

let countdown = function () {
  //here is my countdown function that sets my time
  var timeInterval = setInterval(function () {
    if (time >= 0) {
      timer.textContent = time;
      time--;
    } else if (time === 0) {
      timer.textContent = "Game is Over, Try Again";
      clearInterval(timeInterval);
    }
  }, 1000);
};

function startQuiz() {
  //.here I have my start quiz function
  startBtn.classList.add("hide"); //I add the hide class to my start Btn, to have it not show once the quiz starts
  title.classList.add("hide"); // Do the same for my h1 tag
  rules.classList.add("hide"); //Do the same for my p tag
  questionContainer.classList.remove("hide"); //I remove the hide class for my question container so it can show
  shuffledQuestions = questions.sort(() => Math.random() - 0.5); //here I selected my shuffled Questions Array and sorted them to be random so when prompt they are not in one order
  currentQuestionsIndex = 0; //starting at the first question in our shuffledQuestionsArray
  setNextQuestion(); //calls the function that displays my next question
  countdown(); //call my timer to execute
  clearPage();
}

function setNextQuestion() {
  //here is my function that sets mny next question
  resetState();
  showQuestion(shuffledQuestions[currentQuestionsIndex]); //grabs my showQuestion function and sets the shuffled questions at [0]
}

function showQuestion(question) {
  //takes in a question in
  questionEL.innerText = question.question; //adds the question text to my question div
  question.answers.forEach((answer) => {
    //here I loop through each of my answers
    const button = document.createElement("button"); //create a button for however many answers there is
    button.innerText = answer.text; //here I add the answer text to each button
    button.classList.add("btn"); //here i add the btn class to each button created
    if (answer.correct) {
      //here I check if the answer is correct
      button.dataset.correct = answer.correct; //and if it is, it will change the dataset of the button to correct
    }
    button.addEventListener("click", selectAnswer); //add an Event listener to the correct button which
    answerBtnEL.appendChild(button); //add it to my answer element div
  });
}

function selectAnswer(e) {
  //this function helps me select my answer
  const selectedButton = e.target; //targets whatever we click on
  const correct = selectedButton.dataset.correct; //variable called correct that contains our button with a data set of correct
  setStatusClass(document.body, correct);
  Array.from(answerBtnEL.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionsIndex + 1) {
    //checks if we have more questions than the one we are on
    nextBtn.classList.remove("hide"); //if so show the next Btn
  } else {
    //if not than change the startBtn to restart and remove the hide class which makes it appear
    startBtn.innerText = "Submit";
    startBtn.classList.remove("hide");
    time = 0;
  }

  if (!correct) {
    //if the answer clicked that is not correct than it decreases the time by ten seconds on the countdown
    time -= 10;
    timer.textContent = time;
  } else {
    playerScore += 10;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function resetState() {
  nextBtn.classList.add("hide"); //adds the hide class to my next button
  while (answerBtnEL.firstChild) {
    //a while loop that checks if there is a child inside the answer elements than remove the first child for it (clears the previous amount of buttons)
    answerBtnEL.removeChild(answerBtnEL.firstChild);
  }
}

function handleAnswerClick(event) {
  // Get the correct answer string
  let correctAnswer = getCorrectAnswer(currentQ);
  // Compare to user click
  if (event.target.textContent === correctAnswer) {
    currentScore += 10;
    // color indicates correct choice
    event.target.classList.add("correct");
  } else {
    secondsLeft -= 10;
    // color indicates wrong choice
    event.target.classList.add("wrong");
  }
  // Wait 0.5 sec, reset btn color, go to next question
  setTimeout(() => {
    event.target.className = "btn";
    nextQuestion();
  }, 500);
}

const questions = [
  //my questions array with objects for each index, did this to be able to seperate my questions and answer choices, I add a boolean value to each answer choice to know which one is right or wrong
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<javascript>", correct: false },
      { text: "<js>", correct: false },
      { text: "<scripting>", correct: false },
    ],
  },

  {
    question: "Where is the correct place to insert a JavaScript file?",
    answers: [
      { text: "The <body> section", correct: true },
      { text: "the <head> section", correct: false },
    ],
  },
  {
    question: "The external JavaScript file must contain the <script> tag",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "How does a WHILE loop start?",
    answers: [
      { text: "while i= 1 to 10", correct: false },
      { text: "while (i<=10)", correct: true },
      { text: "while(i<+10; i++)", correct: false },
    ],
  },
  {
    question: "How can you add a comment in a JavaScript?",
    answers: [
      { text: "<!--This is a comment -->", correct: false },
      { text: "//This is a comment", correct: true },
      { text: "This is a comment", correct: false },
    ],
  },
];
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQuestionsIndex++; //increments to next question
  setNextQuestion(); //also sets the next question
});

let clearPage = function (e) {
  nextBtn.addEventListener("click", function () {
    //how can I call my last button?
    if (shuffledQuestions.length === currentQuestionsIndex + 1) {
      //only shows 4 of my questions, how do I get it to show my last one question??
      questionContainer.remove();
      setForm();
      time=0;
    }
  });


var br = document.createElement("br");
let setForm=function(){

  let newDiv=document.createElement("div")

  newDiv.setAttribute("class", "formDiv");

  body.appendChild(newDiv);

  let highScore=document.createElement("h1");
  highScore.setAttribute("id", "score-text")
  let score=document.createElement("span") //this is where I will get my score to show up when I find a way to keep score

 newDiv.appendChild(highScore);
 newDiv.appendChild(br.cloneNode());
 newDiv.appendChild(score);
 newDiv.appendChild(br.cloneNode());
  highScore.textContent="Your score was:"
score.setAttribute("id", "score-span")
score.textContent= playerScore;

  let form=document.createElement("FORM");

  newDiv.appendChild(form);

  let nameInput=document.createElement("label")
  let type=document.createElement("input");
  let submitButton=document.createElement("input");

  
  form.appendChild(nameInput);
  form.appendChild(type);
  newDiv.appendChild(br.cloneNode());
  form.appendChild(submitButton);

  nameInput.setAttribute("for", "initials");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Submit");
  type.setAttribute("for", "text");

  nameInput.textContent="Enter Your Initials "
}

};

//QUESTIONS TO ASK TUTOR

//1. How can I get all my questions to show?, currently only 4 show before clearing
//2. How can I set up local storage to keep my score count and players initial after they submit
//3. How to make HighScores be clickabel to show stored scores 


//FIRST ATTEMPT CODE

// let quiz = function () {
//   let questions = {
//     quizQuestions: [
//       "Inside which HTML element do we put the JavaScript?",
//       "Where is the correct place to insert a JavaScript file?",
//       "The external JavaScript file must contain the <script> tag",
//       "How does a WHILE loop start?",
//       "How can you add a comment in a JavaScript?",
//     ],
//     choices1: ["<script>", "<javascript>", "<js>", "<scripting>"], //<script>

//     choices2: ["The <body> section", "the <head> section"], // <The <body> section

//     choices3: ["True", "False"], // True

//     choices4: ["while i= 1 to 10", "while (i<=10)", "while(i<+10; i++)"], // while (i<=10),
//     choices5: [
//       "<!--This is a comment -->",
//       "//This is a comment",
//       "'This is a comment",
//     ], //This is a comment
//   };

//   //Calling my first question from my array in my questions property array that is in my object, and creating a h1 element and appending it to the body
//   const quizQuestions = ["quizQuestions"];
//   let questionContainer = document.getElementById("question");

//   quizQuestions.forEach((key) => {
//     const question = document.createElement("h1");
//     question.textContent = `${questions.quizQuestions[0]}`;
//     questionContainer.appendChild(question);
//   });

//   //Calling my first question choices from my firstChoices property array that is in my object, and creating a button for each index of the array and appending them to the body
//   const firstQuestionChoices = ["choices1"];
//   let answerContainer = document.getElementById("answer");

//   firstQuestionChoices.forEach((key) => {
//     for (let i = 0; i < 4; i++) {
//       //created a for loop to loop through each choice in the array and to create a button for each
//       const button = document.createElement("button");
//       button.textContent = `${i + 1}: ${questions.choices1[i]}`;
//       button.id = `button-${i}`; //adds an ID to each Button
//       answerContainer.appendChild(button);
//       button.style.margin = "2rem";
//       button.style.fontSize = "40px";
//       // button.style.width = "fit-content";
//     }
//     questionContainer.style.visibility = "visible"; //here I set the style attribute to visible to display my question
//     answerContainer.style.visibility = "visible"; //same here to display my button

//     const button1 = document.querySelector("#button-0"); //I called my button that contains the answer
//     const otherButtons = document.querySelectorAll(
//       //I selected my other buttons with different IDS that are the wrong answer
//       "#button-1 , #button-2, #button-3"
//     );

//     let correctMessage = function () {
//       let message = document.querySelector("#message");
//       message.textContent = "Correct!";
//       message.setAttribute("style", "font-size: 4rem; text-align: center");
//     };

//     button1.addEventListener("click", (e) => {
//       //I added an event listener to my answer button that logs correct answer once clicked, and removes my question and answer container
//       e.preventDefault();
//       console.log("Correct Answer");
//       correctMessage();
//       questionContainer.remove();
//       answerContainer.remove();
//       // question2Container.style.visibility = "visible";
//     });

//     let wrongMessage = function () {
//       let message = document.querySelector("#message");
//       message.textContent = "Wrong!";
//       message.setAttribute("style", "font-size: 4rem; text-align: center");
//     };

//     otherButtons.forEach((button) => {
//       //here I loop through each element to add an event listener to each so that I can log "wrong answer", and remove my question and answer container
//       button.addEventListener("click", (e) => {
//         e.preventDefault();
//         console.log("Wrong Answer");
//         wrongMessage();
//         questionContainer.remove();
//         answerContainer.remove();
//         // question2Container.style.visibility = "visible";
//         // answer2Container.style.visibility = "visible";
//       });
//     });
//   });

//   const question2Container = document.createElement("section"); //Create a new container for my second question in the quiz
//   question2Container.setAttribute("style", "visibility: hidden"); //I set it to hidden
//   body.appendChild(question2Container);

//   quizQuestions.forEach((key) => {
//     const question2 = document.createElement("h1");
//     question2.textContent = `${questions.quizQuestions[0]}`;
//     question2Container.appendChild(question2);
//   });

//   const answer2Container = document.createElement("section");
//   answer2Container.setAttribute("style", "visibility: hidden");
//   body.appendChild(answer2Container);

//   const secondQuestionChoices = ["choices2"];

//   secondQuestionChoices.forEach((key) => {
//     for (let i = 0; i < 2; i++) {
//       //created a for loop to loop through each choice in the array and to create a button for each
//       const button = document.createElement("button");
//       button.textContent = `${i + 1}: ${questions.choices2[i]}`;
//       button.id = `button-${i}`; //adds an ID to each Button
//       answer2Container.appendChild(button);
//       button.style.margin = "2rem";
//       button.style.fontSize = "40px";
//       // button.style.width = "fit-content";
//     }
//     const button1 = document.querySelector("#button-0"); //I called my button that contains the answer
//     const wrongButton = document.querySelectorAll(
//       //I selected my other button with a different ID that is the wrong answer
//       "#button-1"
//     );
//     button1.addEventListener("click", (e) => {
//       //I added an event listener to my answer button that logs correct answer once clicked, and removes my question and answer container
//       console.log("Correct Answer");
//       correctMessage();
//       question2Container.remove();
//       answer2Container.remove();
//     });

//     // wrongButton.addEventListener("click", (e) => {
//     //   e.preventDefault();
//     //   wrongMessage();
//     //   question2Container.remove();
//     //   answer2Container.remove();
//     // });
//   });
// };
