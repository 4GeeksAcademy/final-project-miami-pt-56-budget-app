
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			requestBodyEmail: {},
			message: null,
			showExpensesModal: false,
			expenseToUpdate: {},
			sortOrder: 'asc',
			showDeleteExpenseModal: false,
			expenseToDelete: {},
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
			userGroup: [],
			userRelationships: {},
			userPiggybanks: [],
			userID: null,
			userEmail: [],
			linkToken: '',
			user: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			handleLogin: async (email, password) => {
				const store = getStore();

				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
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
						setStore({ userName: data.name })
						setStore({ user: data.user })
						console.log(store.userName)
						console.log('token in store:', store.token)
						return true;
					} else if (resp.status === 404) {
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
						'Access-Control-Allow-Origin': '*'
					},
					body: JSON.stringify({
						"first_name": firstName,
						"last_name": lastName,
						"email": email,
						"password": password
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`, opts);
					const data = await resp.json();
					console.log('handle Sign Up func', data)
					if (resp.status === 200) {
						// alert("User Created! Redirecting to signin page");
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
				//console.log('logout function running');
				setStore({ token: null });
			},
			fetchUserExpenses: async () => {
				const opts = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${sessionStorage.token}`
					}
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/expenses`, opts)
					const data = await resp.json();
					console.log('fetch expenses ', data)
					if (resp.status === 200) {
						setStore({ userExpenses: data })
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`);
				}
			},
			formatDate: (date, useModalFormat) => {
				const dateObject = new Date(date);

				if (useModalFormat) {
					const year = dateObject.getFullYear();
					const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
					const day = dateObject.getDate().toString().padStart(2, '0');
					return `${year}-${month}-${day}`;
				} else {
					const formattedDate = dateObject.toLocaleString('en-us', { month: 'short', day: '2-digit', year: 'numeric' });
					return formattedDate;
				}

			},
			handleSortByAmount: () => {
				const store = getStore();

				// console.log("Before Sorting:", store.userExpenses);

				const sortedExpenses = [...store.userExpenses].sort((a, b) => {
					const amountA = a.amount;
					const amountB = b.amount;
					// console.log('sort by func amount A', amountA, 'sort by func amount B', amountB);
					return store.sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
				});

				// console.log("After Sorting:", sortedExpenses);

				setStore({ userExpenses: sortedExpenses });
				setStore({ sortOrder: store.sortOrder === 'asc' ? 'desc' : 'asc' });

			},
			fetchUser: async () => {
				const opts = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${sessionStorage.token}`
					}
				};
			
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/get-user`, opts);
					const data = await response.json();
					if (data){
						setStore({ user: data.user });
					return true;
					}
					else{
					
						return false
					}
					
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			fetchUserRelationships: async () => {
				const store = getStore();
				const opts = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${sessionStorage.token}`
					}
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user-rel`, opts);
					const data = await resp.json();
					console.log('fetch user rel ' + JSON.stringify(data));
					if (resp.status === 200) {
						setStore({ userGroups: data.groups });
						setStore({ userFriends: data.friends });
						setStore({ userRelationships: data.relationships })
						console.log(store.userGroups, store.userFriends);
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`);
				}
			},
			handleAddExpense: async (expenseName, expenseAmount, expenseDate, expenseType, splitWith) => {
				const store = getStore();
				if (expenseName.length > 0 && expenseAmount.length > 0 && expenseDate.length > 0) {
					let bodyData = {
						"name": expenseName,
						"amount": expenseAmount,
						"date": expenseDate,
						"type": expenseType
					};
					// console.log('handle add', splitWith);
					if (expenseType === 'Split') {
						const hasEmailSymbol = /@/.test(splitWith);

						if (hasEmailSymbol) {
							const isFriend = store.userFriends.includes(splitWith);

							if (isFriend) {
								bodyData["group"] = null;
								bodyData["friend"] = splitWith;
							} else {
								alert('Friend not found');
							}
						} else {
							// If splitWith doesn't contain '@', assume it's a group
							bodyData["group"] = splitWith;
							bodyData["friend"] = null;
						}
					}

					// console.log('bodydata', bodyData);

					const opts = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
							'Authorization': `Bearer ${sessionStorage.token}`
						},
						body: JSON.stringify(bodyData)
					}
					try {
						const resp = await fetch(`${process.env.BACKEND_URL}/api/expense`, opts);
						const data = await resp.json();
						console.log('add expense ', data);
						if (resp.status === 200) {
							setStore({ userExpenses: data.expenses });
							console.log('Expense added successfully')
						} else if (resp.status === 401) {
							alert('You must be logged in');
						} else {
							console.error(`Unexpected error: ${data.message}`);
						}
					} catch (error) {
						console.error(`There was a problem with the fetch operation ${error}`);
					}
				} else {
					alert('Missing Description, Amount or Date');
				}
			},
			handleUpdateExpenses: async (expenseID, expenseName, expenseAmount, expenseDate, expenseType, splitWith) => {
				let bodyData = {
					"name": expenseName,
					"amount": expenseAmount,
					"date": expenseDate,
					"type": expenseType
				};

				if (expenseType === 'Split') {
					const hasEmailSymbol = /@/.test(splitWith);

					if (hasEmailSymbol) {
						const isFriend = store.userFriends.includes(splitWith);

						if (isFriend) {
							bodyData["group"] = null;
							bodyData["friend"] = splitWith;
						} else {
							alert('Friend not found');
						}
					} else {
						// If splitWith doesn't contain '@', assume it's a group
						bodyData["group"] = splitWith;
						bodyData["friend"] = null;
					}
				}

				const opts = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${sessionStorage.token}`
					},
					body: JSON.stringify(bodyData)
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/expenses/${expenseID}`, opts);
					const data = await resp.json();
					console.log('Update expense ', data);
					if (resp.status === 200) {
						setStore({ userExpenses: data.expenses })
						console.log('Expense Updated successfully')
					} else if (resp.status === 401) {
						alert('You must be logged in');
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`);
				}
			},
			handleDeleteExpense: async (expenseID) => {
				const opts = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${sessionStorage.token}`
					},
					body: JSON.stringify({
						"id": expenseID
					})
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/expenses/${expenseID}`, opts);
					const data = await resp.json();
					console.log('add expense ', data);
					if (resp.status === 200) {
						setStore({ userExpenses: data.expenses })
						console.log('Expense Updated successfully')
					} else if (resp.status === 401) {
						alert('You must be logged in');
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`);
				}
			},
			showExpensesModal: (expenseToEdit) => {
				setStore({ showExpensesModal: true });
				setStore({ expenseToUpdate: expenseToEdit });
			},
			showDeleteExpenseModal: (expenseToDelete) => {
				console.log('show delete expense modal func', expenseToDelete);
				setStore({ showDeleteExpenseModal: true });
				setStore({ expenseToDelete: expenseToDelete })
			},
			hideExpensesModal: () => {
				setStore({ showExpensesModal: false });
				setStore({ showDeleteExpenseModal: false });
			},
			handleGetUser: async () => {
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
						setStore({ userID: savedInfo.id })
						setStore({ userInfo: userData[0] })
						// setStore({ userExpenses: savedInfo.expenses })
						setStore({ userFriends: savedInfo.friends })
						setStore({ userGroup: savedInfo.groups })
						setStore({ userPiggybanks: savedInfo.piggybanks })
						setStore({ userName: savedInfo.first_name })
						setStore({ userEmail: savedInfo.email })
						setStore({ userFullName: savedInfo.first_name + ' ' + savedInfo.last_name })
						console.log(getStore().userGroup)
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
			handleAddGroups: async (groupName) => {
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
						setStore({ userGroup: data.groups })
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
			showDeleteFriendsModal: () => {
				setStore({ showDeleteFriendsModal: true });
			},
			hideDeleteFriendsModal: () => {
				setStore({ showDeleteFriendsModal: false })
			},
			handleAddMembers: async (memberID, groupID) => {
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
			handleDeleteMembers: async (memberID, groupID) => {
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
			handleDeleteGroups: async (groupID) => {
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
			handleChangePassword: async (newPassword) => {
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
				setStore({ showGroupModal: true })
			},
			hideGroupModal: () => {
				setStore({ showGroupModal: false })
			},
			showEditMemberModal: () => {
				setStore({ showAddMemberModal: true })
			},
			hideEditMemberModal: () => {
				setStore({ showAddMemberModal: false })
			},
			showDeleteGroupModal: () => {
				setStore({ showDeleteGroup: true })
			},
			hideDeleteGroupModal: () => {
				setStore({ showDeleteGroup: false })
			},
			showAddPiggyBank: () => {
				setStore({ showAddPiggyBankModal: true })
			},
			showEditPiggyBank: () => {
				setStore({ showEditPiggyBankModal: true })
			},
			showDeletePiggyBank: () => {
				setStore({ showDeletePiggyBankModal: true })
			},
			hideAddPiggyBank: () => {
				setStore({ showAddPiggyBankModal: false })
			},
			hideEditPiggyBank: () => {
				setStore({ showEditPiggyBankModal: false })
			},
			hideDeletePiggyBank: () => {
				setStore({ showDeletePiggyBankModal: false })
			},
			handleAddPiggyBanks: async (name, goal, saved, date, notes) => {
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
			handleDeletePiggyBanks: async (bankID) => {
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
			handleEditPiggyBanks: async (name, goal, saved, date, notes, bankID) => {
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
			addFriends: async (friendEmail) => {
				console.log(friendEmail)
				let opt = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("token"),
					},
					body: JSON.stringify({ friendEmail: friendEmail }),
				};
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/friends`, opt)
					let data = await response.json()
					if (data) {

						setStore({ userFriends: data.user.friends })
						return true
					}
				}
				catch (error) { console.log(error) }
			},
			deleteFriends: (friendEmail) => {
				let opt = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("token"),
					},
					body: JSON.stringify({ friendEmail: friendEmail }),
				};
				fetch(`${process.env.BACKEND_URL}/api/friends`, opt)
					.then((resp) => resp.json())
					.then((data) => setStore({ userFriends: data.user.friends }));
			},
			fetchFriends: async () => {
				const opts = {
					method: "GET",
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						"Content-Type": "application/json",
					},
				};
				try {
					const resp = await fetch(
						`${process.env.BACKEND_URL}/api/friends`,
						opts
					);
					const data = await resp.json();

					if (resp.status == 200) {
						setStore({ userFriends: data });
						return true;
					} else if (resp.status === 401) {
						alert(`You must be logged in`);
						return false;
					} else {
						console.error(`Unexpected error: ${data.message}`);
					}
				} catch (error) {
					console.error("There has been an error fetching friends:", error);

				}
			},
			fetchLinkToken: async () => {
				const opts = {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${sessionStorage.token}`
					}
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/create_link_token`, opts);
					const data = await resp.json();
					console.log('add expense ', data);
					if (resp.status === 200) {
						setStore({ linkToken: data.link_token })
						console.log('Link Token created!')
					} else if (resp.status === 401) {
						alert('You must be logged in');
					} else {
						console.error(`Unexpected error: ${data.message}`)
					}
				} catch (error) {
					console.error(`There was a problem with the fetch operation ${error}`);
				}
			},
			fetchTransactions: async () => {
                const opts = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.token}`
                    }
                };
            
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/transactions`, opts);
                    const data = await resp.json();
            
                    console.log("transactions", data);
            
                    if (resp.ok) {
                        console.log('Transactions added!');
                    } else if (resp.status === 401) {
                        alert('You must be logged in');
                    } else {
                        console.error(`Unexpected error: ${data.message}`);
                    }
                } catch (error) {
                    console.error(`There was a problem with the fetch operation: ${error}`);
                }
            }	
		}
	}
}



export default getState;
