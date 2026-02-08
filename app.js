fetch('data/questions.json')
    .then(response => response.json())
    .then(data => {
        let question = data[0]; // for simplicity, load the first question
        document.getElementById('question').textContent = question.question;
        let options = '';
        question.options.forEach(option => {
            options += `<div>${option}</div>`;
        });
        document.getElementById('options').innerHTML = options;
    });
