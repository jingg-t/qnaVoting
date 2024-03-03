function render() {
  let displayFrame = document.querySelector(".displayFrame");
  fetch('https://oebcalendar-c34e0-default-rtdb.firebaseio.com/qna/posts/.json?AIzaSyBKQ7SbuDkeqsN8d22tAC_a52kpwaKSJVA')
  .then(res => res.json())
  .then(data => {
      displayFrame.innerHTML = `<h1 id="title"> Vote on a Question Questions </h1>`;
      for (elem in data) {
        if (!displayFrame.innerHTML.includes(data[elem]['id'])){
          displayFrame.innerHTML += `<div class="question" id="${data[elem]['id']}"> <p> ${data[elem]['question']} </p></div> <button class="button-48" id="${data[elem]["id"]}" role="button" onclick="vote(this.id)"> <span class="text">Vote</span>
      </button>`
        }
      }
    });
}

render(); 

// Start the interval
let intervalId = setInterval(render, 250);


async function vote(clickedId) {
  await fetch('https://oebcalendar-c34e0-default-rtdb.firebaseio.com/qna/posts/.json?AIzaSyBKQ7SbuDkeqsN8d22tAC_a52kpwaKSJVA')
  .then(res => res.json())
  .then(data => {
    for (elem in data) {
      let question = data[elem];
      let votes = "";
      let id = "";
      if (clickedId == data[elem]["id"]) {
        
        let payload = {
          votes: data[elem]["votes"] + 1,
          question: question["question"],
          id: data[elem]["id"]
        }
        fetch('https://oebcalendar-c34e0-default-rtdb.firebaseio.com/qna/posts/' + elem + '.json?AIzaSyBKQ7SbuDkeqsN8d22tAC_a52kpwaKSJVA', { 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Specify the content type
          },
          body: JSON.stringify(payload)
        })
      }
      
    }
  });
  window.location.href = "./viewAll.html"
}

async function dbWrite(data) {
  await fetch('https://oebcalendar-c34e0-default-rtdb.firebaseio.com/qna/posts/.json?AIzaSyBKQ7SbuDkeqsN8d22tAC_a52kpwaKSJVA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // actual content being written to db from form submission
      })
}

