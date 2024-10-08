// Questions, Options, and Clues
const questions = [
    {
        question: "What does Jesus say is the first and greatest commandment?(మొదటి మరియు గొప్ప ఆజ్ఞ ఏమిటి అని యేసు చెప్పాడు?)",
        options: ["Honor your father and mother మీ తల్లిదండ్రులను గౌరవించండి", "You shall not kill మీరు చంపకూడదు", "Love God with all your heart, minds, soul, and strength మీ పూర్ణ హృదయంతో, మనస్సుతో, ఆత్మతో మరియు శక్తితో దేవుణ్ణి ప్రేమించండి", "All"],
        answer: "All",
        clue: "Clue: The game ends where you begin మీరు మొదలైన చోట ఆట ముగుస్తుంది"
    },
    {
        question: "What is the 7th commandment?(7వ ఆజ్ఞ అంటే ఏమిటి?)",
        options: ["You shall not steal మీరు దొంగతనం చేయకూడదు", "You shall not bear false witness మీరు తప్పుడు సాక్ష్యాన్ని ఇవ్వకూడదు", "You shall not kill మీరు చంపకూడదు", "You shall not commit adultery మీరు వ్యభిచారం చేయకూడదు"],
        answer: "You shall not commit adultery మీరు వ్యభిచారం చేయకూడదు",
        clue: "Clue: The game ends where you begin మీరు మొదలైన చోట ఆట ముగుస్తుంది"
    },
    {
        question: "What is the 5th commandment?(5వ ఆజ్ఞ అంటే ఏమిటి?)",
        options: ["You shall not kill మీరు చంపకూడదు", "Honor your father and mother మీ తండ్రి మరియు తల్లిని గౌరవించండి", "You shall not steal మీరు దొంగతనం చేయకూడదు", "You shall not bear false witness మీరు తప్పుడు సాక్ష్యాన్ని ఇవ్వకూడదు"],
        answer: "Honor your father and mother మీ తండ్రి మరియు తల్లిని గౌరవించండి",
        clue: "Clue: The game ends where you begin మీరు మొదలైన చోట ఆట ముగుస్తుంది"
    },
    

];

let currentQuestionIndex = 0;
let wrongAttempts = 0;

// Load a question and display options
function loadQuestion() {
    document.getElementById("question").innerText = questions[currentQuestionIndex].question;
    let optionsHtml = "";
    questions[currentQuestionIndex].options.forEach((option, index) => {
        optionsHtml += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="option" id="option${index}" value="${option}">
                <label class="form-check-label" for="option${index}">
                    ${option}
                </label>
            </div>
        `;
    });
    document.getElementById("options").innerHTML = optionsHtml;
    document.getElementById("clue").innerText = ""; // Clear previous clue
    document.getElementById("submitBtn").classList.remove("d-none"); // Show submit button
}

// Check if the selected answer is correct
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer === correctAnswer) {
            // Show the clue and end the quiz
            document.getElementById("clue").innerText = questions[currentQuestionIndex].clue; // Show clue
            document.getElementById("submitBtn").classList.add("d-none"); // Hide submit button after correct answer
        } else {
            // Keep asking until the answer is correct (without clue)
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(); // Load next question if there are more
            } else {
                disqualifyUser(); // Disqualify after 5 wrong attempts
            }
        }
    } else {
        alert("Please select an answer!");
    }
}

// Show the disqualified message
function disqualifyUser() {
    document.getElementById("quiz-box").classList.add("d-none");
    document.getElementById("disqualified").classList.remove("d-none");
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    wrongAttempts = 0;
    document.getElementById("disqualified").classList.add("d-none");
    document.getElementById("quiz-box").classList.remove("d-none");
    loadQuestion();
}

// Load the first question on page load
window.onload = loadQuestion;
