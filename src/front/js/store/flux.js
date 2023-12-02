
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			requestBodyEmail: {},
			message: null,
			showExpensesModal: false,
			userName: 'User'
		},
		actions: {
			// Use getActions to call a function within a fuction
			handleLogin: async (email, password) => {
				const store = getStore();
				
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin':'*'
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/signin`, opts)
					const data = await resp.json();
					console.log(data);
					if (resp.status === 200) {
						console.log('response token:', data.token);
						sessionStorage.setItem('token', data.token);
						setStore({ token: data.token });
						setStore({userName: data.user_name})
						console.log('token in store:', store.token)
						return true;
					} else if (resp.status === 404) {
						//user not found
						alert('User not found - create account?');
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
			handleSingUp: async (firstName, lastName, email, password) => {
				// const navigate = useNavigate();
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin':'*'
					},
					body: JSON.stringify({
						"first_name": firstName,
						"last_name": lastName,
						"email": email,
						"password": password,
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`, opts)
					const data = await resp.json();
					console.log('handle Sign Up func', data)
					if (resp.status === 200) {
						alert("User Created! Redirecting to signin page");
						// navigate('/signin');
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
			handleLogout: () => {
				sessionStorage.removeItem('token');
				console.log('logout function running');
				setStore({ token: null });
			},
			showExpensesModal: () => {
				setStore({showExpensesModal: true})
			},
			hideExpensesModal: () => {
				setStore({showExpensesModal: false})
			}
		}
	};
};

export default getState;
