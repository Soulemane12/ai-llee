document.addEventListener('DOMContentLoaded', () => {
    const selectedType = localStorage.getItem('selectedType');
    const notesText = localStorage.getItem('notesText');

    const outputContainer = document.getElementById('output-container');

    if (selectedType === 'Quiz') {
        // Fetch and display the quiz output
        fetch('/generate-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ article: notesText }),
        })
        .then(response => response.json())
        .then(data => {
            outputContainer.innerHTML = `
                <h2>Quiz</h2>
                <p><strong>Question:</strong> ${data.question}</p>
                <p><strong>Answer:</strong> ${data.answer}</p>
            `;
        })
        .catch(error => {
            console.error('Error generating quiz:', error);
            outputContainer.textContent = 'Failed to load quiz.';
        });
    } else if (selectedType === 'Flashcards') {
        // Fetch and display the flashcard output
        fetch('/generate-flashcards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ article: notesText }),
        })
        .then(response => response.json())
        .then(data => {
            outputContainer.innerHTML = `
                <h2>Flashcard</h2>
                <div class="flashcard" onclick="this.classList.toggle('flipped')">
                    <div class="front">${data.question}</div>
                    <div class="back">${data.answer}</div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error generating flashcards:', error);
            outputContainer.textContent = 'Failed to load flashcards.';
        });
    } else {
        outputContainer.textContent = 'No output type selected.';
    }
});
