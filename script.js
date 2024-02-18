const quizData = [
  {
    question: "What does HTML stand for?",
    a: "Home Tool Markup Language",
    b: " Hyperlinks and Text Markup Language",
    c: "Hyper Text Markup Language",
    d: " Hyper Tool Markup Language",
    correct: "c",
  },
  {
    question: "What does CSS stand for?",
    a: "Central StyleSheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question:
      "The correct place to refer to an external style sheet in html file?",
    a: "In <body> tag",
    b: "In <head> tag",
    c: "In the end of document",
    d: "None",
    correct: "b",
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    a: "<script> tag",
    b: "<style> tag",
    c: "<css>",
    d: "None",
    correct: "b",
  },
  {
    question:
      "Which built-in method reverses the sorder of the elements of an array?",
    a: "changeOrder(order)",
    b: "reverse()",
    c: "sort(order)",
    d: "None of the above",
    correct: "b",
  },
];
const questionEl = document.getElementById("question");

const answersEl = document.querySelectorAll(".answer");
const labelEl = document.querySelectorAll(".op_label");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const submitBtn = document.getElementById("submit");
const resultContainer = document.querySelector(".result-container");
const quizContainer = document.querySelector(".quiz-container");
const scoreEle = document.querySelector("#score");
const showAnswers = document.querySelector("#answers");
const reloadBtn = document.querySelector("#reload");

//we can take current question in vriable and we can increment it to get get next set of questions
let currentQ = 0;
let userSelected = {};
let score = 0;

//initally form submission will be false later will submit after selecting the options
//the reason is before selection form answers will be highlighted as green in loadQTn() call
// on line 100 will be false so it willl go directly to else and there on
//line 108 it will set to green
let submitted = false;

console.log("use selected", userSelected);
console.log("curretn q", currentQ);
function loadQtn() {
  questionEl.innerText = quizData[currentQ].question;
  a_text.innerText = quizData[currentQ].a;
  b_text.innerText = quizData[currentQ].b;
  c_text.innerText = quizData[currentQ].c;
  d_text.innerText = quizData[currentQ].d;
  //if user made a slection  thme only the object useselect contains selected id and

  if (submitted) {
    let actualAns = quizData[currentQ].correct;
    let userAns = userSelected[currentQ];

    answersEl.forEach((a) => {
      a.disabled = true;
    });
    if (userSelected[currentQ]) {
      let selected = userSelected[currentQ];
      //grab the id from obj and checked it as true
      document.getElementById(selected).checked = true;
    }
    // if one is correct hsow green  rest no color
    labelEl.forEach((el) => {
      el.classList.remove("correct");
      el.classList.remove("wrong");
    });

    //userseelct === actual answer ==> color green
    //userseelct !== actual answer ==> color red
    if (userAns == actualAns) {
      let selectedAns = `${userAns}_text`;

      document.getElementById(selectedAns).classList.add("correct");
    } else {
      let selectedAns = `${userAns}_text`;
      let systemAns = `${actualAns}_text`;
      document.getElementById(systemAns)?.classList.add("correct");
      document.getElementById(selectedAns)?.classList.add("wrong");
    }
    if (currentQ == quizData.length - 1) {
      submitBtn.style.display = "none";
      reloadBtn.style.display = "block";
      nextBtn.style.display = "none";
    }
  }
}

loadQtn();

nextBtn.onclick = function () {
  let answer = getSelected();
  if (!submitted) {
    if (answer) {
      //if user selected answer matches with actual answer the increase answer score
      if (answer == quizData[currentQ].correct) {
        score++;
      }

      currentQ++;
      //0,1,2,3,4 < 5
      if (currentQ < quizData.length) {
        loadQtn();
        answersEl.forEach((a) => {
          a.checked = false;
        });
      }
    }

    if (currentQ == quizData.length - 1) {
      submitBtn.style.display = "block";
      nextBtn.style.display = "none";
    }
  } else {
    currentQ++;
    loadQtn();
  }
};

// nextBtn.addEventListener('click', () => {
//     const answer = getSelected();
//     if (!submitted) {
//         if (answer) {
//             if (answer === quizData[currentQtn].correct) {
//                 score++;
//             }
//             currentQtn++;
//             if (currentQtn < quizData.length) {
//                 loadQtn();
//                 prevBtn.disabled = false;
//                 prevBtn.classList.remove('disabled')
//             }
//         }
//     }
//     else {
//         currentQtn++;
//         loadQtn()
//     }
// })
prevBtn.onclick = function () {
  if (currentQ > 0) {
    currentQ--;
    loadQtn();
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
    reloadBtn.style.display = "none";
  }
};

function getSelected() {
  let answer;
  //loop through options and get the selected or checked option id
  answersEl.forEach((a) => {
    if (a.checked) {
      answer = a.id;
      userSelected[currentQ] = answer;
    }
  });
  return answer;
}

submitBtn.onclick = function () {
  if (getSelected()) {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    scoreEle.innerText = `${score}/${quizData.length} questions are answered correctly`;
    submitted = true;
  }
};

showAnswers.onclick = function () {
  currentQ = 0;
  console.log("from show answers");
  quizContainer.style.display = "block";
  resultContainer.style.display = "none";
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
  loadQtn();
};
