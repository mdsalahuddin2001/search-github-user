/** @format */

// Selectiong Elements
let searchBtn = document.getElementById('submit');
let errorMsg = document.getElementById('errorMsg');

// Fetching Data From API
function fetchData(username) {
	const clientID = 'fa6b8ae07c8c38600601';
	const clientSecret = '8c0d609637d4b9a9e2a0c8d43ea4f0741ca41962';
	// const url = `https://api.githup.com/users/${username}?client_id=${clientID}&client_secret=${clientSecret}`;
	const url = `https://api.github.com/users/${username}?client_id=${clientID}&client_secret=${clientSecret}`;
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			if (data.message === 'Not Found') {
				errorMsg.innerText = 'No user found';
			} else {
				// Fetching All Followers From data.follower_ulr
				fetch(`${data.followers_url}?per_page=100`)
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						// Show followers data
						showFollowers(data);
					})
					.catch((err) => console.log(err));
				// Fetching Repos To Show Languages
				fetch(`${data.repos_url}?per_page=100`)
					.then((response) => response.json())
					.then((data) => {
						showLanguagesInChart(data);
					})
					.catch((err) => console.log(err));
				// Show Main Data
				showData(data);
			}
		})
		.catch((err) => console.log(err));
}
// Showing Data to DOM
function showData(data) {
	//Cards Section
	const totalRepo = document.getElementById('total-repo');
	const followers = document.getElementById('followers');
	const following = document.getElementById('following');
	const totalGists = document.getElementById('total-gists');

	totalRepo.innerText = data.public_repos;
	followers.innerText = data.followers;
	following.innerText = data.following;
	totalGists.innerText = data.public_gists;

	// User Info
	const avatar = document.getElementById('avatar');
	const name = document.getElementById('name');
	const twitterUsername = document.getElementById('twitter-username');
	const followBtn = document.getElementById('html-url');
	const bio = document.getElementById('bio');
	const company = document.getElementById('company');
	const location = document.getElementById('location');
	const blog = document.getElementById('blog');

	avatar.setAttribute('src', data.avatar_url);
	name.innerText = data.name;
	twitterUsername.innerText = data.twitter_username;
	followBtn.setAttribute('href', data.html_url);
	bio.innerText = data.bio;
	company.innerText = data.company;
	location.innerText = data.location;
	blog.innerText = data.blog;
}
function showFollowers(data) {
	const followersContainer = document.getElementById('followers-container');

	followersContainer.innerHTML = data
		.map((item) => {
			return `<article>
				 <img src=${item.avatar_url} alt="follower" />
				<div>
				<h4>${item.login}</h4>
				<a href=${item.html_url}>${item.html_url}</a>
				</div>
				</article>`;
		})
		.join();
}

// Show Languages in Pie chart
function showLanguagesInChart(repos) {
	let languages = repos.reduce((total, repo) => {
		let { language } = repo;
		if (!language) {
			return total;
		}
		if (!total[language]) {
			total[language] = { label: language, value: 1 };
		} else {
			total[language] = {
				...total[language],
				value: total[language].value + 1,
			};
		}
		return total;
	}, {});
	console.log(typeof languages);
	console.log();
	// Show Charts Using Chart.js
	let ctxLang = document.getElementById('languages').getContext('2d');
	let showLanguages = new Chart(ctxLang, {
		// The type of chart we want to create
		type: 'pie',

		// The data for our dataset
		data: {
			labels: Object.keys(languages).map((key) => {
				return languages[key].label;
			}),
			datasets: [
				{
					label: 'Languages',
					backgroundColor: [
						'rgba(255, 227, 103, 0.9)',
						'rgba(255, 93, 153, 0.9)',
						'rgba(92, 193, 253, 0.9)',
					],
					data: Object.keys(languages).map((key) => {
						return languages[key].value;
					}),
				},
			],
		},

		// Configuration options go here
		options: {
			title: {
				display: true,
				text: 'Languages',
				fontSize: '16',
				position: 'left',
			},
			legend: {
				position: 'right',
			},
		},
	});
}

// Show Repos in Bar chart
let ctxRepos = document.getElementById('repos').getContext('2d');
let repos = new Chart(ctxRepos, {
	// What type of chart we want
	type: 'bar',
	// The data for our dataset
	data: {
		labels: ['HTML', 'CSS', 'JavaScript', 'Python', 'C#'],
		datasets: [
			{
				label: 'Languages',
				backgroundColor: [
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
				],
				data: [25, 62, 13, 30, 100],
			},
		],
	},

	// Configuration options go here
	options: {
		title: {
			display: true,
			text: 'Languages',
			fontSize: '16',
			position: 'left',
		},
		legend: {
			display: false,
		},
	},
});

// Search Button Click Event
searchBtn.addEventListener('click', (e) => {
	let username = document.getElementById('username').value;
	e.preventDefault();
	if (!username) {
		errorMsg.innerText = 'Please input a github username';
	} else {
		errorMsg.innerText = '';
		fetchData(username);
	}
});
