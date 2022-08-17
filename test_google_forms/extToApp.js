const url = 'https://script.google.com/macros/s/AKfycbyXjDsf9R3fznkbLSZNfIpr5TVYgwY6skAQGmfVDiHvfb28FhPYFYJUnrYY5eRzkFfpNA/exec';

function testGS(){
    fetch(url)
        .then( d => d.json())
        .then(d => { 
            document.getElementById('app_return_text').textContent = d[0].status;
            document.getElementById('reply').textContent = d[0].thoughtfulReply;
        });
}

function testDoPost(){
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        // headers: {
        //   'Content-Type': 'application/json'
        //   // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({name: "Patrick"}) // body data type must match "Content-Type" header
      });
}



document.getElementById('btn').addEventListener('click', testGS);
document.getElementById('btn2').addEventListener('click', testDoPost);