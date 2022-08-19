const appUrl = 'https://script.google.com/macros/s/AKfycbzYoXk-dBlaBz5--hzEN09GkO4-zNktbePEzJtcle6nmMnWWw6ojN_fDZPeskpIc3zh/exec';
const DUMMY_DATA = [
    {name: 'Taxonamir', location: 'Padre Island Pills', amount: '1', password: '23ifsadD##4_3'},
    {name: 'Ramdonafin', location: 'Skitley Monks', amount: '10', password: 'g4wg4ga4##4_3'},
    {name: 'Lalgalatron', location: 'Bloomington', amount: '6', password: '23ifsadD##4_3'},
    {name: 'Loves Cure', location: 'Bloomington', amount: '6', password: '23ifsadD##4_3'},
    {name: 'Flantirol', location: 'Padre Island Pills', amount: '1', password: '23ifsadD##4_3'},
    {name: 'Zarcophagus', location: 'Skitley Monks', amount: '10', password: 'g4wg4ga4##4_3'},
    {name: 'Lactilasmar', location: 'Bloomington', amount: '6', password: '23ifsadD##4_3'},
    {name: 'Partonafir', location: 'Pugit Sound', amount: '3', password: '23ifsadD##4_3'},
    {name: 'Broprotriaz', location: 'Suffiton Heights', amount: '1', password: '23ifsadD##4_3'},
];

function renderDummyCodes(){
    DUMMY_DATA.forEach( data => createQrCode(data));
}

function testGS(){
    fetch(appUrl)
        .then( d => d.json())
        .then(d => { 
            document.getElementById('app_return_text').textContent = d[0].status;
            document.getElementById('reply').textContent = d[0].thoughtfulReply;
        });
}

function testDoPost(data){
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
        body: JSON.stringify({
            name: data.name, 
            location: data.location, 
            amount: data.amount, 
            password: data.password,
            timestamp: data.date}) // body data type must match "Content-Type" header
      });
}
function scanCode(actionUrl){
    console.log(actionUrl);
    let sendData = dataFromUrl(actionUrl);
    let element = document.getElementById(sendData.name);
    element.remove();
    testDoPost(sendData);
}
function dataFromUrl(actionUrl){
    // let urlComponents = actionUrl.split('?');
    // let url = `${urlComponents[0]?}.urlEncode(urlComponents[1])}?${urlComponents[1].urlEncode}`

    const urlParams = new URLSearchParams(actionUrl);
    const name = urlParams.get('name');
    const location = urlParams.get('location');
    const amount = urlParams.get('amount');
    const password = urlParams.get('passwordHash');
    const date = new Date();
    console.log(name, location, amount, password, date);
    return {name, location, amount, password, date};
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

function buildCanvasCard(qr, data){
    console.log(qr.value);
    let qrCodeImage = qr.image;
    console.log(data);
    let size = '200px';
    let div = document.getElementById('card_template');
    let newCard = div.cloneNode(true);
    newCard.setAttribute('id', data.name);
    newCard.classList.remove('hidden');
    let image = newCard.querySelector('img');
    image.parentElement.removeChild(image);
    // image.removeAttribute('class');
    swapListOfStyles(image, qrCodeImage);
    // swapComputedStyles(image, qrCodeImage);
    qrCodeImage.setAttribute('width', size);
    qrCodeImage.setAttribute('height', size);

    newCard.querySelector('h5').textContent = `Perscription: ${data.name}`;
    let list = newCard.querySelector('ul');
    list.children[0].textContent = `Location: ${data.location}`;
    list.children[1].textContent = `Amount: ${data.amount}`;
    list.children[2].textContent = `Password: ${data.password}`;
    //add button click handler
    let button = newCard.querySelector('button');
    button.setAttribute('onClick', `scanCode('${qr.value}')`);

    // qrCodeImage.removeAttribute('height');
    // qrCodeImage.removeAttribute('width');
    newCard.insertBefore(qrCodeImage, newCard.firstChild);
    return newCard;
}
// WHEN YOU SIT BACK DOWN, JUST GET THE DATA INTO THE DIV THE STYLE THE THING 

function createQrCode(data){

    let baseUrl = appUrl;
    let {name, location, password, amount} = data;

    let canvas = document.getElementById('canvas_div');
    let value = `${baseUrl}?x=&name=${name}&passwordHash=${encodeURIComponent(password)}&location=${location}&amount=${amount}`.replace(/\ /g, '%20');
    //added sacrifical character ?x= so 'name' wouldn't be first param... first param is returning 
    //null in the dataFromUrl function, and idk why
    let qr = new QRious({
        background: 'white',
        backgroundAlpha: 0.8,
        foreground: '#990000',
        // foregroundAlpha: 1,
        level: 'H',
        padding: 25,
        size: 500,
        value: value,
        element: canvas
    });
    // qr.canvas.parentNode.appendChild(qr.image);
    let canvasCard = buildCanvasCard(qr, data);
    canvas.appendChild(canvasCard);
}

function swapComputedStyles(sourceNode, targetNode) {
    const computedStyle = window.getComputedStyle(sourceNode);
    Array.from(computedStyle).forEach(key => targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key)))
}

function swapListOfStyles(sourceNode, targetNode){
    console.log(sourceNode.classList.value);
    // targetNode.removeAttribute('class');
    targetNode.setAttribute('class', sourceNode.classList.value);
}

document.getElementById('btn').addEventListener('click', testGS);
document.getElementById('btn2').addEventListener('click', testDoPost);