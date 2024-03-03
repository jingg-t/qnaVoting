const form = document.getElementById("submitForm");
form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData); // generate the data from the form
    
    let writeInfo = {'id': randomCode(),'question':data['question'], 'votes': 0 } 
    dbWrite(writeInfo);
})


function randomCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_+|?-=';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 15; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function dbWrite(data) {
  await fetch('https://oebcalendar-c34e0-default-rtdb.firebaseio.com/qna/posts/.json?AIzaSyBKQ7SbuDkeqsN8d22tAC_a52kpwaKSJVA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // actual content being written to db from form submission
      })
    .then( res => {
      window.location.href = './fs/subpages/voting.html';
    })
}

