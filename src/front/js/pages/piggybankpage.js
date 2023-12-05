import React, {useState} from 'react'
import '../../styles/piggybankpage.css'
import { PiggybankModal } from '../component/Piggybankmodal'
export default function Piggybank() {
    const[action, setAction] = useState(null)
  return (
    <div>
        <div className='row1 mx-5 d-flex justify-content-center'>
            <div className='col-1 mx-5 d-flex justify-content-center'>
                <h1>Piggy Bank</h1>
            </div>
            <div className='col 2 mx-5 d-flex justify-content-center'>
            <button type="button" className="button-56"  data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Add")}>Add piggy bank</button>
            </div>
            <div className='col 3'>
            <button type="button" className="button-56"  data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Sort")}>Sort by:</button>
            </div>
        </div>
        <div className='container d'>
        <div className='row2 row mx-5 d-flex justify-content-center'>
            <div className='col mx-5 d-flex justify-content-center'>
            <div className='container'>
                <h3>Total Amount Saved</h3>
            </div> </div>
            <div className='col 2 mx-5 d-flex justify-content-center'>
              <h3>$2000</h3></div>
        </div></div>
        <div className='containerThirdRow justify-content-center p-3 w-50 m-auto '>
        <table class="table"><table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Amount Saved</th>
      <th scope="col">Target Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"></th>
      <td>Vacation</td>
      <td>$400</td>
      <td>$4000</td>
      <div className='col'>
         <span type="button" className="" data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Edit")}>            
            <i class="fa-regular fa-pen-to-square"></i></span>
         <span type="button" className="" data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Delete")}>            
            <i class="fa-regular fa-trash-can"></i></span>
            </div> 
    </tr>
    <tr>
      <th scope="row"></th>
      <td>New car</td>
      <td>$5,000</td>
      <td>$35,000</td>
      <div className='col'>
         <span type="button" className="" data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Edit")}>            
            <i class="fa-regular fa-pen-to-square"></i></span>
         <span type="button" className="" data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Delete")}>            
            <i class="fa-regular fa-trash-can"></i></span>
            </div> 
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Chanel</td>
      <td>$$250</td>
      <td>$6000</td>
      <div className='col'>
         <span type="button" className="" data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Edit")}>            
            <i class="fa-regular fa-pen-to-square"></i></span>
         <span type="button" className="" data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Delete")}>            
            <i class="fa-regular fa-trash-can"></i></span>
            </div> 
    </tr>
  </tbody>
</table></table>

        </div>
        < PiggybankModal action={action}/>
    </div>

  )
}