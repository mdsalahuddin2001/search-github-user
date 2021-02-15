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
						updateLanguagesAndStarsInChart(data);
						updateStarsAndForksInChart(data);
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
		.join('');
}
// Static data for chart********//

// Show Popular languages in Pie Charts Using Chart.js
let ctxLang = document.getElementById('languages').getContext('2d');
let showLanguages = new Chart(ctxLang, {
	// The type of chart we want to create
	type: 'pie',

	// The data for our dataset
	data: {
		labels: ['HTML', 'CSS', 'JavaScript'],
		datasets: [
			{
				label: 'Languages',
				backgroundColor: [
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
				],
				data: [10, 46, 30],
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
			position: 'top',
			fullWidth: false,
			labels: {
				boxWidth: 15,
				fontSize: 10,
			},
		},
	},
});

// Show Starts Per Language in Dounought Chart

let ctxStars = document.getElementById('stars').getContext('2d');
let showStarsPerLanguage = new Chart(ctxStars, {
	// The type of chart we want to create
	type: 'doughnut',

	// The data for our dataset
	data: {
		labels: ['HTML', 'CSS', 'JS'],
		datasets: [
			{
				label: 'Languages',
				backgroundColor: [
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
				],
				data: [320, 260, 180],
			},
		],
	},

	// Configuration options go here
	options: {
		title: {
			display: true,
			text: 'Starts Per Language',
			fontSize: '16',
			position: 'left',
		},
		legend: {
			position: 'bottom',
		},
	},
});

// Show Repos in Bar chart
let ctxRepos = document.getElementById('repos').getContext('2d');
let reposChart = new Chart(ctxRepos, {
	// What type of chart we want
	type: 'bar',
	// The data for our dataset
	data: {
		labels: [
			'currency-converter',
			'ip-address-tracker',
			'calculator',
			'moto-racing',
			'speed-code',
		],
		datasets: [
			{
				label: 'Popular Repositories',
				backgroundColor: [
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
				],
				data: [320, 221, 115, 90, 50],
			},
		],
	},

	// Configuration options go here
	options: {
		responsive: true,
		maintainAspectRatio: false,
		title: {
			display: true,
			text: 'Most Starred Repositories',
			fontSize: '16',
			position: 'bottom',
		},
		legend: {
			display: false,
		},
	},
});

// Show Most Forked Repos in Chart

let ctxForks = document.getElementById('forks').getContext('2d');
let forksChart = new Chart(ctxForks, {
	// What type of chart we want
	type: 'line',
	// The data for our dataset
	data: {
		labels: [
			'currency-converter',
			'ip-address-tracker',
			'calculator',
			'moto-racing',
			'speed-code',
		],
		datasets: [
			{
				label: 'Popular Repositories',
				backgroundColor: [
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
					'rgba(255, 227, 103, 0.9)',
					'rgba(255, 93, 153, 0.9)',
					'rgba(92, 193, 253, 0.9)',
					'mediumseagreen',
					'crimson',
				],
				backgroundColor: 'rgb(255, 99, 132)',
				data: [600, 410, 320, 224, 110],
			},
		],
	},

	// Configuration options go here
	options: {
		title: {
			display: true,
			text: 'Most Forked Repositories',
			fontSize: '16',
			position: 'bottom',
		},
		legend: {
			display: false,
		},
	},
});

// Update Languages and Stars in Pie chart
function updateLanguagesAndStarsInChart(repos) {
	let languages = repos.reduce((total, repo) => {
		let { language, stargazers_count } = repo;
		if (!language) {
			return total;
		}
		if (!total[language]) {
			total[language] = { label: language, value: 1, stars: stargazers_count };
		} else {
			total[language] = {
				...total[language],
				value: total[language].value + 1,
				stars: total[language].stars + stargazers_count,
			};
		}
		return total;
	}, {});

	// Update showLanguages in Pie Chart from API
	showLanguages.data.labels = Object.keys(languages).map(
		(key) => languages[key].label,
	);
	showLanguages.data.datasets[0].data = Object.keys(languages).map(
		(key) => languages[key].value,
	);
	showLanguages.update();

	// Update showStarsPerLanguage in bar chart from API
	showStarsPerLanguage.data.labels = Object.keys(languages).map(
		(key) => languages[key].label,
	);
	showStarsPerLanguage.data.datasets[0].data = Object.keys(languages).map(
		(key) => languages[key].stars,
	);
	showStarsPerLanguage.update();
}
// Update Most starred and forded repos in Bar Chart
function updateStarsAndForksInChart(repos) {
	let { stars, forks } = repos.reduce(
		(total, repo) => {
			let { stargazers_count, name, forks } = repo;
			total.stars[stargazers_count] = {
				label: name,
				value: stargazers_count,
			};
			total.forks[forks] = { label: name, value: forks };
			return total;
		},
		{
			stars: {},
			forks: {},
		},
	);
	stars = Object.values(stars).slice(-5).reverse();
	forks = Object.values(forks).slice(-5).reverse();
	let starsLabel = stars.map((item) => item.label);
	let starsValue = stars.map((item) => item.value);
	let forksLabel = forks.map((item) => item.label);
	let forksValue = forks.map((item) => item.value);
	console.log(stars.map((item) => item.label));

	// Update most starred repos  in bar chart from API
	reposChart.data.labels = starsLabel;
	reposChart.data.datasets[0].data = starsValue;
	reposChart.update();

	// Update Most Forked Repos From Api
	forksChart.data.labels = forksLabel;
	forksChart.data.datasets[0].data = forksValue;
	forksChart.update();
}

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
