const appUrl = 'https://script.google.com/macros/s/AKfycbyXjDsf9R3fznkbLSZNfIpr5TVYgwY6skAQGmfVDiHvfb28FhPYFYJUnrYY5eRzkFfpNA/exec';

function testGS(){
    fetch(appUrl)
        .then( d => d.json())
        .then(d => { 
            document.getElementById('app_return_text').textContent = d[0].status;
            document.getElementById('reply').textContent = d[0].thoughtfulReply;
        });
}

function testDoPost(){
    fetch(appUrl, {
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
        body: JSON.stringify({name: "Frank"}) // body data type must match "Content-Type" header
      });
}

function collectFormData(){
    return{
        name: document.getElementById('data[perscription_name]').value,
        location: document.getElementById('data[location]').value,
        password: document.getElementById('password').value,
        amount: document.getElementById('amount').value
    }
}

function testQrFuncs(){
    let data = collectFormData();
    createQrCode(data);
}

function buildCanvasCard(qrCodeImage){
    let div = document.getElementById('card_template');
    let newCard = div.cloneNode(true);
    newCard.classList.remove('hidden');
    let image = newCard.querySelector('img');
    image.setAttribute('src', qrCodeImage);
    return newCard;
}

function createQrCode(data){

    let baseUrl = appUrl;
    let {name, location, password, amount} = data;

    let canvas = document.getElementById('canvas_div');
    let qr = new QRious({
        background: 'white',
        backgroundAlpha: 0.8,
        foreground: '#990000',
        // foregroundAlpha: 1,
        level: 'H',
        padding: 25,
        size: 500,
        value: `${baseUrl}?name=${name}?passwordHash=${password}?location=${location}$amount=${amount}`,
        element: canvas
    });
    // qr.canvas.parentNode.appendChild(qr.image);
    let canvasCard = buildCanvasCard();
    //when you sit BACK DOWN, TRY DOING THE APPENDING HERE?  OR IN THE FUNC?
    canvas.appendChild(canvasCard);
}


document.getElementById('btn').addEventListener('click', testGS);
document.getElementById('btn2').addEventListener('click', testDoPost);