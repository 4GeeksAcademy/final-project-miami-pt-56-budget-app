import React, { useState } from 'react'
const userInfo= [
    {
        title:"Expenses",
        data: [
            {title:"House", catagory:"Rent", Amount:"$2500"},
            {title:"Disney+", catagory:"Payment", Amount:"$14"},
            {title:"Netflix", catagory:"Payment", Amount:"$16"}
        ]

    },
    {
        title:"Piggy Bank",
        data: [
            {title:"Maui", catagory:"Vacation", Amount:"$6000"},
            {title:"Jordans", catagory:"Shoes", Amount:"$1000"},
            {title:"Tuition", catagory:"UCF", Amount:"25,000"}
        ]

    },
    {
        title:"Groups",
        data: [
            {title:"Bowling Alley", catagory:"Shoes", Amount:"$12"},
            {title:"Puerto Rico", catagory:"AirBNB", Amount:"$500"},
            {title:"Bar Bar", catagory:"Drinks/Apps", Amount:"$40"}
        ]

    },
]
export default function UserHome() {
    return (
        <div className='body'>
        <div className='homeComponentContainer'>
            {userInfo.map((item,i)=>{
                return(
                    <div key={i}>
                        <h1>{item.title}</h1>
            <div className='homeComponentBorder p-3 w-50 m-auto'>
            {item.data.map((dataItem,i)=>{
                return(
                    <div key={i}>
                         <div className='accountInfo d-flex justify-content-start'>
                    <p className='homeusertag mx-5 d-flex justify-content-center col'>{dataItem.title}</p>
                    <p className='homeusertag mx-5 d-flex justify-content-center col'>{dataItem.catagory}</p>
                    <p className='homeusertag mx-5 d-flex justify-content-center col'>{dataItem.Amount}</p>
                </div>
                    </div>
                    );})}
                <div className='d-flex row'> 
                <button className='userhomebtn btn d-flex justify-content-center col-3 'role='button'>Learn more</button>
                <p className='d-flex justify-content-end col'>msg if none</p>
                </div>
            </div>
                    </div>
                );
            })}
            

        </div>
        </div>
    )
}