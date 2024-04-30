const http = require('https');

const options = {
	method: 'GET',
	hostname: 'map-places.p.rapidapi.com',
	port: null,
	path: '/nearbysearch/json?location=27.717245%2C85.323959&radius=1500&keyword=PoliceStation&type=PoliceStation',
	headers: {
		'X-RapidAPI-Key': 'f94610bd79msh579b9bfbd97e821p101b85jsnb9a65d4997c6',
		'X-RapidAPI-Host': 'map-places.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();