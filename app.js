/** @format */

// Selectiong Elements
let searchBtn = document.getElementById('submit');
let errorMsg = document.getElementById('errorMsg');

// Fetching Data From API
function fetchData(username) {
	const clientID = 'fa6b8ae07c8c38600601';
	const clientSecret = '8c0d609637d4b9a9e2a0c8d43ea4f0741ca41962';
	const url = `https://api.githup.com/users/${username}?client_id=${clientID}&client_secret=${clientSecret}`;
	fetch(url)
		.then((response) => {
			console.log(response.json());
		})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => console.log(err));
}
searchBtn.addEventListener('click', (e) => {
	let username = document.getElementById('username').value;
	e.preventDefault();
	if (!username) {
		errorMsg.innerText =
			'Please input a github username to see your desire data';
	} else {
		errorMsg.innerText = '';
		fetchData(username);
	}
});
