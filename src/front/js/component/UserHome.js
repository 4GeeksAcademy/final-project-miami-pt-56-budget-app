import React, { useState, useContext, useEffect, createContext} from 'react'
import { Context } from '../store/appContext';
import { Table } from 'react-bootstrap'
import context from 'react-bootstrap/esm/AccordionContext';
import { Link } from "react-router-dom";

    const UserHome = () => {
        const { store, actions} = useContext(Context);      
        useEffect(() => {
          actions.handleGetUser();
          actions.fetchUserExpenses();
        }, []);
        const userInfo= [
            {
                title:"Expenses",
                Link:"expenses", 
                data: store.userExpenses
        
            },
            {
                title:"Piggy Bank",
                Link:"piggybankpage", 
                data: store.userPiggybanks
        
            },
            {
                title:"Groups",
                Link:"groups", 
                data: store.userGroups
            },
        ]

    return (
       <div className='container '>
        {userInfo?.map((section)=>{
            return(<Table striped bordered hover>
				<thead>
                    <h1>{section.title}</h1>
					<tr>

					</tr>
				</thead>
				<tbody>
					{section.data?.map((item, index) => (
						<tr key={index}>
							<td>{item.name}</td>
							<td>{item.amount||item.goal||item.members.map(member=>(
                                <div>{member.first_name} {member.last_name}</div>
                            ))}</td>
							<td>{item.date||item.saved||""}</td>
                            <td>
                </td>
						</tr>
					))}
				</tbody>
                <Link to={section["Link"]}>
                <button class="button-56" role="button">View more</button>
                </Link>
			</Table>)
        })}
			
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

     