// Function to flip a flashcard
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Display quiz and flashcards on page load
document.addEventListener('DOMContentLoaded', () => {
    // Fetch stored data from localStorage
    const quizData = JSON.parse(localStorage.getItem('quiz'));
    const flashcards = JSON.parse(localStorage.getItem('flashcards'));

    // Display Quiz
    const quizContainer = document.getElementById('quiz-container');
    if (quizData) {
        const quizHTML = `
            <div class="question">
                <b>Question:</b> ${quizData.question}
                <form id="quiz-form">
                    ${quizData.choices.map((choice, index) => `
                        <div>
                            <input type="radio" id="choice${index}" name="choice" value="${choice[0]}">
                            <label for="choice${index}">${choice}</label>
                        </div>
                    `).join('')}
                    <button type="submit">Submit</button>
                </form>
                <div id="feedback" class="feedback"></div>
            </div>
        `;
        quizContainer.innerHTML = quizHTML;
    } else {
        quizContainer.innerHTML = '<p>No quiz generated.</p>';
    }

    // Display Flashcards
    const flashcardsContainer = document.getElementById('flashcards-container');
    if (flashcards && flashcards.length > 0) {
        flashcardsContainer.innerHTML = flashcards.map(card => `
            <div class="flashcard" onclick="flipCard(this)">
                <div class="inner">
                    <div class="front">${card.question}</div>
                    <div class="back">${card.answer}</div>
                </div>
            </div>
        `).join('');
    } else {
        flashcardsContainer.innerHTML = '<p>No flashcards generated.</p>';
    }

    // Handle quiz form submission
    document.getElementById('quiz-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedOption = document.querySelector('input[name="choice"]:checked');
        const feedbackElement = document.getElementById('feedback');

        if (!selectedOption) {
            feedbackElement.textContent = 'Please select an answer!';
            feedbackElement.style.color = 'orange';
            return;
        }

        const userAnswer = selectedOption.value;
        if (userAnswer === quizData.correct_answer) {
            feedbackElement.textContent = 'Correct!';
            feedbackElement.style.color = 'green';
        } else {
            feedbackElement.textContent = `Wrong! The correct answer is ${quizData.correct_answer}.`;
            feedbackElement.style.color = 'red';
        }
    });
});
