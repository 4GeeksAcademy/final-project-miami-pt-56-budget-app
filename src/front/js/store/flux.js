import { AlertLink } from "react-bootstrap";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: '',
			requestBodyEmail: {},
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			handleSingIn: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/login`)
					const data = await resp.json();

					if (resp.status === 200) {
						sessionStorage.setItem('token', data.access_token);
						setStore({ token: data.access_token });
						return true;
					} else if (resp.status === 404) {
						//user not found
					} else if (resp.status === 401) {
						alert('Incorrect email or password');
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			},
			handleSingUp: async (firstName, lastName, email, password, verifyPassword) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"firstname": firstName,
						"lastname": lastName,
						"email": email,
						"password": password,
						"verifypassword": verifyPassword
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`)
					const data = await resp.json();

					if (resp.status === 200) {
						alert("User Created! Redirecting to signin page");
						window.location.pathname !== '/signin'
						return true;
					} else if (resp.status === 406) {
						alert(`Passwords don't match`);
						return false;
					} else if (resp.status === 412) {
						alert('Incorrect email or password');
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
