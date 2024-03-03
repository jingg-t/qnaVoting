function render() {
    let displayFrame = document.querySelector(".displayFrame");
    fetch('https://oebcalendar-c34e0-default-rtdb.firebaseio.com/qna/posts/.json?AIzaSyBKQ7SbuDkeqsN8d22tAC_a52kpwaKSJVA')
    .then(res => res.json())
    .then(data => {
        let questionsArr = []
        displayFrame.innerHTML = `<h1 id="title"> All Questions </h1>`;
        for (elem in data) {
            if (!displayFrame.innerHTML.includes(data[elem]['id'])){
                questionsArr.push([data[elem]['votes'], `<div class="question" id="${data[elem]['id']}"> <p>  ${data[elem]['question']} </p> </div> <div class="voteNumber">${data[elem]['votes']}</div>`])
            }
        }

        let numbers = [4, 2, 5, 1, 3];

        // Numerical sorting
        numbers.sort(function(a, b) {
            return a - b;
        });

        questionsArr.sort(function(a, b) {
            return b[0] - a[0]
        })

        for (elem in questionsArr) {
            displayFrame.innerHTML += questionsArr[elem][1]
        }
    });
}

render(); 
  
// Start the interval
let intervalId = setInterval(render, 250);

const clearButton = document.getElementById("clearQ")
clearButton.addEventListener('click', function() {
    let payload = {}
    fetch('https://oebcalendar-c34e0-default-rtdb.firebaseio.com/qna/posts/.json?AIzaSyBKQ7SbuDkeqsN8d22tAC_a52kpwaKSJVA', { 
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json', // Specify the content type
    },
        body: JSON.stringify({payload})
})
})

  
  
  
  