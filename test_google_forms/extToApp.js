function testGS(){const url = 'https://script.google.com/macros/s/AKfycbwkRmTyKbztC9Trgb9GEIwR1QtIhjQiWadjH8Tjpt9DeDvhT4_nCmNknpNIUJEU4Sx-mQ/exec';
    fetch(url)
        .then( d => d.json())
        .then(d => { 
            document.getElementById('app_return_text').textContent = d[0].status;
        });
}

document.getElementById('btn').addEventListener('click', testGS);
