document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements
    const notesTextarea = document.getElementById('notes-textarea');
    const quizButton = document.getElementById('quiz-button');
    const flashcardButton = document.getElementById('flashcard-button');
    const outputContainer = document.getElementById('output-container');

    // Function to handle quiz generation
    const generateQuiz = () => {
        const notes = notesTextarea.value.trim();
        if (!notes) {
            alert('Please enter notes before generating a quiz.');
            return;
        }

        fetch('/generate-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ article: notes }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.question && data.answer) {
                outputContainer.innerHTML = `
                    <h2>Quiz</h2>
                    <p><strong>Question:</strong> ${data.question}</p>
                    <p><strong>Answer:</strong> ${data.answer}</p>
                `;
            } else {
                outputContainer.innerHTML = 'Failed to generate quiz.';
            }
        })
        .catch(error => {
            console.error('Error generating quiz:', error);
            outputContainer.innerHTML = 'Error generating quiz.';
        });
    };

    // Function to handle flashcard generation
    const generateFlashcards = () => {
        const notes = notesTextarea.value.trim();
        if (!notes) {
            alert('Please enter notes before generating flashcards.');
            return;
        }

        fetch('/generate-flashcards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ article: notes }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.question && data.answer) {
                outputContainer.innerHTML = `
                    <h2>Flashcard</h2>
                    <div class="flashcard" onclick="this.classList.toggle('flipped')">
                        <div class="front">${data.question}</div>
                        <div class="back">${data.answer}</div>
                    </div>
                `;
            } else {
                outputContainer.innerHTML = 'Failed to generate flashcards.';
            }
        })
        .catch(error => {
            console.error('Error generating flashcards:', error);
            outputContainer.innerHTML = 'Error generating flashcards.';
        });
    };

    // Attach event listeners to buttons
    quizButton.addEventListener('click', generateQuiz);
    flashcardButton.addEventListener('click', generateFlashcards);
});
