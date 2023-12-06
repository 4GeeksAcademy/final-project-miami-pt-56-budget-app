
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			requestBodyEmail: {},
			message: null,
			showExpensesModal: false,
			expenseToUpdate: {},
			showDeleteFriendsModal: false,
			showGroupModal: false,
			showAddMemberModal: false,
			showDeleteGroup: false,
			showAddPiggyBankModal: false,
			showEditPiggyBankModal: false,
			showDeletePiggyBankModal: false,
			userName: 'User',
			userFullName: '',
			userExpenses: [],
			userFriends: [],
			userGroups: [],
			userPiggybanks: [],
			userID: null,
			userEmail:[]
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
						setStore({userName: data.name})
						console.log(store.userName)
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
			showExpensesModal: (expenseToEdit) => {
				setStore({showExpensesModal: true});
				setStore({expenseToUpdate: expenseToEdit});
			},
			hideExpensesModal: () => {
				setStore({showExpensesModal: false});
      		},
			handleGetUser: async() => {
				const opts = {
					method: 'GET',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						'Content-Type': 'application/json',
					}
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/home`, opts)
					const data = await resp.json();
					const userData = data.user;
					if (resp.status === 200) {
						const savedInfo = userData[0]
						setStore({userID: savedInfo.id})
						setStore({userInfo: userData[0]})
						setStore({userExpenses: savedInfo.expenses})
						setStore({userFriends: savedInfo.friends})
						setStore({userGroups: savedInfo.groups})
						setStore({userPiggybanks: savedInfo.piggybanks})
						setStore({userName: savedInfo.first_name})
						setStore({userEmail: savedInfo.email})
						setStore({userFullName: savedInfo.first_name +' '+ savedInfo.last_name})
						return true;
					} else if (resp.status === 401) {
						alert(`You must be logged in`);
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			},
			handleAddGroups: async(groupName) => {
				const opts = {
					method: 'POST',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"name": groupName
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/groups`, opts)
					const data = await resp.json();
					console.log('handle Get Groups func', data)
					if (resp.status === 200) {
						setStore({userGroups: data.groups})
						return true;
					} else if (resp.status === 401) {
						alert(`You must be logged in`);
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			},
			showDeleteFriendsModal: () =>{
				setStore({showDeleteFriendsModal: true});
			},
			hideDeleteFriendsModal: () => {
				setStore({showDeleteFriendsModal: false})
      		},
			handleAddMembers: async(memberID, groupID) => {
				const opts = {
					method: 'PUT',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"newMember": memberID
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/groups/${groupID}`, opts)
					const data = await resp.json();
					console.log('handle Get Groups func', data)
					if (resp.status === 200) {
						return true;
					} else if (resp.status === 401) {
						alert(`You must be logged in`);
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			},
			handleDeleteMembers: async(memberID, groupID) => {
				const opts = {
					method: 'PUT',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"oldMember": memberID
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/groups/${groupID}`, opts)
					const data = await resp.json();
					console.log('handle Get Groups func', data)
					if (resp.status === 200) {
						return true;
					} else if (resp.status === 401) {
						alert(`You must be logged in`);
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			},
			handleDeleteGroups: async(groupID) => {
				const opts = {
					method: 'DELETE',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						'Content-Type': 'application/json',
					}
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/groups/${groupID}`, opts)
					const data = await resp.json();
					console.log('handle Get Groups func', data)
					if (resp.status === 200) {
						return true;
					} else if (resp.status === 401) {
						alert(`You must be logged in`);
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			},
			handleChangePassword: async(newPassword) => {
				const opts = {
					method: 'POST',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"newPassword": newPassword
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${getStore().userID}`, opts)
					const data = await resp.json();
					console.log('handle get new password func', data)
					if (resp.status === 200) {
						return true;
					} else if (resp.status === 401) {
						alert(`You must be logged in`);
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			},
			showGroupModal: () => {
				setStore({showGroupModal: true})
			},
			hideGroupModal: () => {
				setStore({showGroupModal: false})
			},
			showEditMemberModal: () => {
				setStore({showAddMemberModal: true})
			},
			hideEditMemberModal: () => {
				setStore({showAddMemberModal: false})
			},
			showDeleteGroupModal: () => {
				setStore({showDeleteGroup: true})
			},
			hideDeleteGroupModal: () => {
				setStore({showDeleteGroup: false})
			},
			showAddPiggyBank: () => {
				setStore({showAddPiggyBankModal: true})
			},
			showEditPiggyBank: () => {
				setStore({showEditPiggyBankModal: true})
			},
			showDeletePiggyBank: () => {
				setStore({showDeletePiggyBankModal: true})
			},
			hideAddPiggyBank: () => {
				setStore({showAddPiggyBankModal: false})
			},
			hideEditPiggyBank: () => {
				setStore({showEditPiggyBankModal: false})
			},
			hideDeletePiggyBank: () => {
				setStore({showDeletePiggyBankModal: false})
			},
			handleAddPiggyBanks: async(name, goal, saved, date, notes) => {
				const opts = {
					method: 'POST',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"name": name,
						"goal": goal,
    					"saved": saved,
    					"date": date,
    					"notes": notes
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/piggybank`, opts)
					const data = await resp.json();
					console.log('handle Get Groups func', data)
					if (resp.status === 200) {
						alert("PiggyBank information");
						return true;
					} else if (resp.status === 401) {
						alert(`You must be logged in`);
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			},
			handleDeletePiggyBanks: async(bankID) => {
				const opts = {
					method: 'DELETE',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						'Content-Type': 'application/json',
					}
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/piggybank/${bankID}`, opts)
					const data = await resp.json();
					console.log('handle Get Groups func', data)
					if (resp.status === 200) {
						alert("Bank Deleted");
						return true;
					} else if (resp.status === 401) {
						alert(`You must be logged in`);
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			},
			handleEditPiggyBanks: async(name, goal, saved, date, notes, bankID) => {
				const opts = {
					method: 'PUT',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"name": name,
						"goal": goal,
    					"saved": saved,
    					"date": date,
    					"notes": notes
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/piggybank/${bankID}`, opts)
					const data = await resp.json();
					console.log('handle Get Groups func', data)
					if (resp.status === 200) {
						alert("PiggyBank information");
						return true;
					} else if (resp.status === 401) {
						alert(`You must be logged in`);
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`)
				}
			}
		}
	}
}
			

export default getState;
