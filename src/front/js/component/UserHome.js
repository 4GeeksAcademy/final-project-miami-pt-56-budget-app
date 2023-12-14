import React, { useState, useContext, useEffect, createContext} from 'react'
import { Context } from '../store/appContext';
import { Table, Button } from 'react-bootstrap'
import context from 'react-bootstrap/esm/AccordionContext';
import { Link } from "react-router-dom";
import PlaidLink from 'react-plaid-link';
import "../../styles/styles.css"
import "../../styles/home.css"

const UserHome = () => {
        const { store, actions} = useContext(Context);   
        const [user,setUser] =useState(store.user) 
        useEffect(() => {
            actions.handleGetUser();
            actions.fetchUserExpenses();
        }, [])
        // useEffect(() => {
        //     const getUser = async ()=>{
        //         let response = await store.fetchUser
        //         if (response){
        //             setUser(store.user)
        //         }
        //         else{
        //             alert("an error occured")
        //         }
        //     }
        // }, []);
       

    return (
        <div className='container '>
            <h1>Expenses</h1>
            {store.userExpenses.length == 0 &&(
                <>
                    <h4 className="d-flex justify-content-center">{store.userName}, you have no expenses.</h4>
                    <h6 className="d-flex justify-content-center mb-3">What expenses would you like to track?</h6>                
                </>
            )}
            {store.userExpenses.length > 0 &&(
            <Table striped bordered hover >
				<thead>
					<tr>
                        <th>Name</th>
						<th>Amount</th>
						<th>Date</th>
					</tr>
				</thead>
                <tbody>
                    {store.userExpenses && store.userExpenses.map((item,index)=>(
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.amount}</td>
                          <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
			</Table>
            )}
            <Link to={"/expenses"} className='d-flex justify-content-center'>
                <Button className="expense-btn">View more</Button>
            </Link>
            <h1 className='mt-4'>Piggy Bank</h1>
            {store.userPiggybanks.length == 0 &&(
                <>
                    <h4 className="d-flex justify-content-center">{store.userName}, you have no piggy banks.</h4>
                    <h6 className="d-flex justify-content-center mb-3">What would you like to start saving for?</h6>
                </>
            )}
            {store. userPiggybanks.length > 0 &&(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Saving Goal</th>
                        <th>Amount Saved</th>
                    </tr>
                </thead>
                <tbody>
                    {store.userPiggybanks && store.userPiggybanks.map((item,index)=>(
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.goal}</td>
                          <td>{item.saved}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )}
            
            <Link to="/piggybankpage" className='d-flex justify-content-center'>
                <Button className="expense-btn">View more</Button>
            </Link>
            <h1 className='mt-4'>Groups</h1>
            {store.userGroup.length == 0 &&(
                <>
                    <h4 className="d-flex justify-content-center">{store.userName}, you have no groups.</h4>
                    <h6 className="d-flex justify-content-center mb-3">Would you like to start one?</h6>
                </>
            )}
            {store.userGroup.length > 0 && (
            <Table striped bordered hover>
				<thead>
					<tr>
                        <th>Name</th>
					</tr>
				</thead>
                <tbody>
                    {store.userGroup && store.userGroup.map((item,index)=>(
                        <tr key={index}>
                          <td>{item.name}</td>

                        </tr>
                    ))}
                </tbody>
			</Table>
            )}
            <Link to="/groups" className='d-flex justify-content-center'>
                <Button className="expense-btn">View more</Button>
            </Link>	
        </div>
    )}
export default UserHome;


//   return (
//     <div className='container '>
//       {/* Display user information from store */}
//       <Table striped bordered hover>
//         {/* Display user expenses */}
//         {/* ...table structure for userExpenses from store */}
//       </Table>

//       <Table striped bordered hover>
//         {/* Display user groups */}
//         {/* ...table structure for userGroups from store */}
//       </Table>

//       <Table striped bordered hover>
//         {/* Display user piggy bank page */}
//         {/* ...table structure for userPiggybankpage from store */}
//       </Table>
//     </div>
//   );
// };

// export default UserHome;

     