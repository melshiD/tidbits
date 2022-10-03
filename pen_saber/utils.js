function getMarkedLocations(ctx, color=[10, 100, 210]){
	const locs = [];
	const imgData = ctx.getImageData(0, 0,
		ctx.canvas.width, ctx.canvas.height);
	const data = imgData.data;
	console.log(data[0], data[1], data[2], data[3]);
}