import decode from 'jwt-decode'

export default class AuthService {
	constructor(domain) {
		this.domain = domain || 'http://localhost:3001'
	}

	login = (email, password) => {
		console.log("Starting Login Request", email, password);
		return this.authFetch(`${this.domain}/users/sign_in`, {
			method: "POST",
			body: JSON.stringify(email, password),
		})
		.then(res => res)
	}

	register = (user) => {
		console.log("Starting Register Request", user);
		return this.authFetch(`${this.domain}/users`, {
			method: "POST",
			body: JSON.stringify(user),
		})
		.then(res => res)
	}

	loggedIn() {
		const token = this.getToken()
		return !!token && !this.isTokenExpired(token)
	}

	isTokenExpired(token) {
		try {
			const decoded = decode(token)
			if (decoded.exp < Date.now() / 1000) {
				return true
			} else {
				return false
			}
		}
		catch (err) {
			return false;
		}
	}

	// The token is stored in the browser
	setToken(token) {
		let parsedToken = token.split(' ')[1]
		localStorage.setItem('id_token', parsedToken)
	}

	// Fetch the token from local storage
	getToken() {
		return localStorage.getItem('id_token')
	}

	// Removes the token
	logout() {
		localStorage.removeItem('id_token');
	}

	getUserId = () => {
		const token = decode(this.getToken());
		return token.sub
	}

	authFetch = (url, options) => {
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		if (this.loggedIn()) {
			headers['Authorization'] = 'Bearer ' + this.getToken()
		}

		return fetch(url, {
			headers,
			...options
		})
		.then(res => this._checkStatus(res))
		.then(res => {
			console.log(res.headers.get('Authorization'))
			let token = res.headers.get('Authorization')
			// set a token, taken out of response from API
			this.setToken(token)
			return res.json()
		})
		.catch(err => {
			console.log("::: FETCH ERROR CAUGHT:::", err)
			return err
		})
	}

	_checkStatus(response) {
		if(response.status >= 200 && response.status < 300) {
			console.log(":::SUCCESS:::");
		} else {
			console.log(":::ERROR:::", response)
		}
		return response
	}
}
