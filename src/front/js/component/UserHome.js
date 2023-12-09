import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom";
const userInfo= [
    {
        title:"Expenses",
        Link:"expenses", 
        data: [
            {title:"House", catagory:"Rent", Amount:"$2500"},
            {title:"Disney+", catagory:"Payment", Amount:"$14"},
            {title:"Netflix", catagory:"Payment", Amount:"$16"}
        ]

    },
    {
        title:"Piggy Bank",
        Link:"piggybankpage", 
        data: [
            {title:"Maui", catagory:"Vacation", Amount:"$6000"},
            {title:"Jordans", catagory:"Shoes", Amount:"$1000"},
            {title:"Tuition", catagory:"UCF", Amount:"25,000"}
        ]

    },
    {
        title:"Groups",
        Link:"groups", 
        data: [
            {title:"Bowling", catagory:"Shoes", Amount:"$12"},
            {title:"Hawaii", catagory:"AirBNB", Amount:"$500"},
            {title:"Bar Lou", catagory:"Drinks", Amount:"$40"}
        ]

    },
]
export default function UserHome() {
    return (
       <div className='container '>
        {userInfo.map((section)=>{
            return(<Table striped bordered hover>
				<thead>
                    <h1>{section.title}</h1>
					<tr>
						<th>Title</th>
						<th>Catagoty</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					{section.data.map((item, index) => (
						<tr key={index}>
							<td>{item.title}</td>
							<td>{item.catagory}</td>
							<td>{item.Amount}</td>
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

     