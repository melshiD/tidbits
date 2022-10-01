let animateButton = document.getElementById('animate');
animateButton.addEventListener('click', () => {
	console.log('log');
	animate();
});

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => {
	console.log('log');
	save();
});

let discardButton = document.getElementById('discard');
discardButton.addEventListener('click', () => {
	console.log('log');
	discard();
});