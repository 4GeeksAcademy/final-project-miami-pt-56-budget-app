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
                <button type="button" className="" data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Add")}>Add piggy bank</button>
            </div>
            <div className='col 3'>
                <button type="button" className="" data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Sort")}>Sort by:</button>
            </div>
        </div>
        <div className='row2 row mx-5 d-flex justify-content-center'>
            <div className='col mx-5 d-flex justify-content-center'>
                <h3>Total Amount Saved</h3>
            </div>
            <div className='col 2 mx-5 d-flex justify-content-auto'>$2000</div>
        </div>
        <div className='row3 row'>
            <div className='col-3 mx-5 d-flex justify-content-center p-3 w-50 m-auto'>
                <p>Name</p>
            </div>
            <div className='col-3'>
                <a>Amount Saved</a>
            </div>
            <div className='col'>
                <p>Target Amount </p>
            </div>
            <div className='col'>
            <a type="button" className=""data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Edit")}>            
            <i class="fa-regular fa-pen-to-square"></i></a>
            <a type="button" className=""data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={()=>setAction("Delete")}>            
            <i class="fa-regular fa-trash-can"></i></a>
            </div>
            <div className='col-4'>

            </div>

        </div>
        < PiggybankModal action={action}/>
    </div>

  )
}