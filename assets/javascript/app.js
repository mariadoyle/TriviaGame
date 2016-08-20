
// Timeouts
//setTimeout(fiveSeconds, 1000 * 5);
setTimeout(tenSeconds, 1000 * 10);
setTimeout(timeUp, 1000 * 20);


function tenSeconds() {
    // Once ten seconds pass, send an alert and state the time remaining in the "time-left" div.
    $('#time-left').html('<h2>About 10 Seconds Left!</h2>');
    alert('10 seconds left');
}

function timeUp(){
    // Once twenty seconds pass, time is up! 
    // Send an alert and have the "time-left" div let the user know.
    console.log('done');
    $('#time-left').html('<h2>Time is up!</h2>');
    alert('Time is up!');

}

var questions = [{
    trivia_question: "What is the only second film in a franchise to win Best Picture?",
    choices: ["The Empire Strikes Back", "Elizabeth: The Golden Age", "The Godfather Part II", "The Lord of the Rings: The Two Towers"],
    correctAnswer: 2
    
}, {
    trivia_question: "Who was the first female Best Director winner?",
    choices: ["Barbra Streisand", "Jane Campion", "Sofia Coppola", "Kathryn Bigelow"],
    correctAnswer: 3
}, {
    trivia_question: "Who’s the only person to have won an Oscar for acting and writing?",
    choices: ["Matt Damon", "Emma Thompson", "Woody Allen", "Laurence Olivier"],
    correctAnswer: 1
}, {
    trivia_question: "Who was the first African-American star to win an acting prize?",
    choices: ["Sidney Poitier", "Hattie McDaniel", "Denzel Washington", "Dorothy Dandridge"],
    correctAnswer: 0
}, {
    trivia_question: "Who was the first person to win an acting award for a non-English language movie?",
    choices: ["Roberto Benigni", "Marcello Mastroianni", "Sophia Loren", "Marion Cotillard"],
    correctAnswer: 2
}];


var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Shows 1st question
    displayCurrentQuestion();
    $(this).find(".trivia_prompt").hide();

    
    //This function "moves" the questions after 15 seconds
  //function timerExpired(){
  //questionCounter++;
  //newQuestion();
  //setTimeout(timerExpired, 15000);}



// When user clicks next, show next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".trivia_prompt").text("Please choose one answer");
                $(document).find(".trivia_prompt").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".trivia_prompt").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                                        
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button and it now show Play Again?
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});


function displayCurrentQuestion() {

    console.log("In display current Question");

    var trivia_question = questions[currentQuestion].trivia_question;
    var questionClass = $(document).find(".Trivia > .trivia_question");
    var trivia_options = $(document).find(".Trivia > .trivia_options");
    var numChoices = questions[currentQuestion].choices.length;

    
    $(questionClass).text(trivia_question);

    // Remove all current <li> elements (if any)
    $(trivia_options).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(trivia_options);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".Trivia > .final_score").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".Trivia > .final_score").show();
}

function hideScore() {
    $(document).find(".final_score").hide();
}