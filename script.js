const questionBank={

html:[
{
question:"HTML stands for?",
answers:[
"Hyper Text Markup Language",
"High Text Machine Language",
"Home Tool Markup Language",
"Hyper Tool Multi Language"
],
correct:0
},

{
question:"Which tag creates heading?",
answers:[
"<head>",
"<h1>",
"<body>",
"<div>"
],
correct:1
}
],

css:[
{
question:"Which language styles web pages?",
answers:[
"HTML",
"CSS",
"Python",
"SQL"
],
correct:1
},

{
question:"CSS stands for?",
answers:[
"Color Style Sheet",
"Cascading Style Sheets",
"Creative Style System",
"Computer Style Sheet"
],
correct:1
}
],

js:[
{
question:"JavaScript is used for?",
answers:[
"Database",
"Interactivity",
"Networking",
"Operating System"
],
correct:1
},

{
question:"Which keyword declares variable?",
answers:[
"var",
"int",
"string",
"float"
],
correct:0
}
]

};



let questions=[];

let current=0;

let score=0;

let selected=null;

let timer;

let timeLeft=10;



const question=
document.getElementById(
"question"
);

const answers=
document.getElementById(
"answers"
);

const nextBtn=
document.getElementById(
"next-btn"
);



function startQuiz(category){

questions=
questionBank[category];

current=0;

score=0;

selected=null;

document
.getElementById(
"category-screen"
)
.classList.add(
"hidden"
);

document
.getElementById(
"result"
)
.classList.add(
"hidden"
);

document
.getElementById(
"quiz"
)
.classList.remove(
"hidden"
);

loadQuestion();

}



function loadQuestion(){

selected=null;



document
.getElementById(
"progress"
)
.innerText=

`Question ${
current+1
}/${questions.length}`;



let progress=

(
(current+1)

/

questions.length

)

*100;



document
.getElementById(
"progress-bar"
)

.style.width=

progress+"%";



question.textContent=

questions[current]
.question;



answers.innerHTML="";



questions[current]
.answers
.forEach(
(ans,index)=>{

const div=
document.createElement(
"div"
);

div.classList.add(
"answer"
);

div.innerText=
ans;


div.onclick=()=>{

document
.querySelectorAll(
".answer"
)

.forEach(
a=>

a.classList.remove(
"selected"
)

);

div.classList.add(
"selected"
);

selected=index;

};

answers.appendChild(
div
);

}

);



startTimer();

}



function startTimer(){

clearInterval(
timer
);

timeLeft=10;


document
.getElementById(
"timer"
)

.innerText=

`⏳ Time Left: ${timeLeft}s`;



timer=

setInterval(()=>{

timeLeft--;



document
.getElementById(
"timer"
)

.innerText=

`⏳ Time Left: ${timeLeft}s`;



if(
timeLeft===0
){

clearInterval(
timer
);

current++;

if(
current<
questions.length
){

loadQuestion();

}

else{

showResult();

}

}

},1000);

}



nextBtn
.addEventListener(
"click",
()=>{

if(
selected===null
){

alert(
"Choose answer!"
);

return;

}



clearInterval(
timer
);



const options=

document
.querySelectorAll(
".answer"
);



if(

selected===

questions[current]
.correct

){

score++;

options[
selected
]

.classList.add(
"correct"
);

}

else{

options[
selected
]

.classList.add(
"wrong"
);

options[
questions[
current
]
.correct
]

.classList.add(
"correct"
);

}



setTimeout(()=>{

current++;

if(
current<
questions.length
){

loadQuestion();

}

else{

showResult();

}

},1000);

}

);



function showResult(){

clearInterval(
timer
);



document
.getElementById(
"quiz"
)

.classList.add(
"hidden"
);



document
.getElementById(
"result"
)

.classList.remove(
"hidden"
);



let percentage=

(
score

/

questions.length

)

*100;



let msg=

percentage>=80

?

"🏆 Excellent 🎉"

:

percentage>=50

?

"⭐ Good Job 😄"

:

"📚 Keep Practicing 💪";



document
.getElementById(
"score"
)

.innerText=

`${score}/${questions.length}

${msg}`;



let highScore=

localStorage.getItem(
"highScore"
)

||0;



if(
score>

highScore
){

localStorage.setItem(
"highScore",
score
);

highScore=
score;

}



document
.getElementById(
"high-score"
)

.innerText=

`🏆 High Score: ${highScore}`;



if(

percentage>=80

){

confetti({

particleCount:150,

spread:120,

origin:{

y:.6

}

});

}

}



function restartQuiz(){

clearInterval(
timer
);



document
.getElementById(
"quiz"
)

.classList.add(
"hidden"
);

document
.getElementById(
"result"
)

.classList.add(
"hidden"
);

document
.getElementById(
"category-screen"
)

.classList.remove(
"hidden"
);

}
