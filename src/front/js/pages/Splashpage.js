import React, {useEffect} from 'react';
import "../../styles/splashpage.css"
import { Link , useNavigate} from "react-router-dom";
import logo from "../../img/BetterBudget-logos_green.jpg";

const Splashpage = () => {

  return (
    <div className="container">
      <div className='splash-banner p-5 my-5 text-center'>
        <h1 className='text-body-emphasis'>Your Journey to Financial Wellness Starts Here</h1>
        <p className='mx-auto fs-5 text-muted'>At BetterBudget, we understand the importance of financial well-being. Managing money should be simple, accessible, and stress-free for everyone. Join us in building a brighter financial future, where managing your money is both convenient and rewarding.</p>
        <div className="d-inline-flex">
          <Link to={'/signup'}>
            <button className='form-button px-3'>Sign up now!</button>
          </Link>
        </div>
      </div>
        {/* At BetterBudget, we understand the importance of financial well-being. 
        Our mission is to empower individuals to take control of their finances effortlessly. 
        We believe that managing money should be simple, accessible, and stress-free for everyone. 
        Our user-friendly budgeting app is designed to help you track expenses, set savings goals, and gain insights into your spending habits. 
        Whether you're a seasoned budgeter or just starting your financial journey, BetterBudget is here to support you every step of the way. 
        Join us in building a brighter financial future, where managing your money is both convenient and rewarding.*/}
      <div className='row g-5'>
        <div className='col-12 col-md-6 mb-5'>
          <div className="card h-100 feature">
          <div className='card-header mt-1'><h5 className='text-center'>Coordinating with Friends</h5></div>
            <img className="img-fluid rounded-start" src="https://images.unsplash.com/photo-1616077167555-51f6bc516dfa?q=80&amp;w=400&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
            <div className="card-body">
              <p className="card-text">Life is unpredictable, and at BetterBudget, we understand the importance of preparing for the unexpected. Our platform not only helps you manage your current expenses but also encourages smart saving for those unforeseen rainy days. With easy-to-use tools, effortlessly allocate funds towards your emergency savings.</p>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-6 mb-5'>
          <div className="card h-100 feature">
          <div className='card-header mt-1'><h5 className='text-center'>Purposeful Planning</h5></div>
            <img className="img-fluid rounded-start" src="https://plus.unsplash.com/premium_photo-1679785709925-43eebd9d15f0?q=80&amp;w=400&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
            <div className="card-body">
              <p className="card-text">Customize expense categories to align with your group's diverse interests, ensuring that everyone feels included. With real-time tracking, easily stay updated on who's paid what, making settling debts a hassle-free affair. Set collective financial goals that inspire everyone to contribute, fostering a sense of teamwork and achievement.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='row g-5'>
        <div className='col-12 col-md-6 mb-5'>
          <div className="card h-100 feature">
            <div className='card-header mt-1'><h5 className='text-center'>Saving for the Future</h5></div>
            <img className="img-fluid rounded-start" src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&amp;w=400&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
            <div className="card-body">
              <p className="card-text">Our platform is designed to unify and simplify your family's financial management. Customize budget categories to match your unique family dynamics and priorities, ensuring a tailored approach to your finances.</p>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-6 mb-5'>
          <div className="card h-100 feature">
            <div className='card-header mt-1'><h5 className='text-center'>Better Budgeting</h5></div>
            <img className="img-fluid rounded-start" src="https://plus.unsplash.com/premium_photo-1678823283266-021b5360062b?q=80&amp;w=400&amp;h=300&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
            <div className="card-body">
              <p className="card-text">At BetterBudget, we've simplified the art of saving. Our platform offers a seamless way to keep track of your savings journey. Set personalized goals that align with your aspirations and let our intuitive visual tools transform the way you monitor progress.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splashpage;