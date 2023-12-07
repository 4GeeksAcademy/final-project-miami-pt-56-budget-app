import React, {useEffect} from 'react';
import "../../styles/splashpage.css"

const Splashpage = () => {

/*  This was used to show the NavBar conditionally, 
    however it was decided to always show. Props were used as arguments.

    useEffect(() => {
		props.setCurrentURL('');
	}, []) */

  return (
    <div>
      <div className='splash-banner p-3 w-100 m-auto'>
        <h1 className='bannerwords d-flex px-5 w-75'>About Us</h1>
        <p className='bannerpara d-flex px-5 w-75'>At BetterBudget, we understand the importance of financial well-being. Our mission is to empower individuals to take control of their finances effortlessly. We believe that managing money should be simple, accessible, and stress-free for everyone. Our user-friendly budgeting app is designed to help you track expenses, set savings goals, and gain insights into your spending habits. Whether you're a seasoned budgeter or just starting your financial journey, BetterBudget is here to support you every step of the way. Join us in building a brighter financial future, where managing your money is both convenient and rewarding..</p>

      </div>
      <div className='splash-panels'>
        <div className='panels-top '>
          <div className='panel w-40'>
            <h3 className='splashcard splashcardheader'>Coordinating with friends</h3>
            <div id="imageContainerbank" className='splashcard'>
            <img src="https://images.unsplash.com/photo-1616077167555-51f6bc516dfa?q=80&amp;w=400&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="400" height="300"></img>
            </div>
            <p className='splashcard'>"Life is unpredictable, and at BetterBudget, we understand the importance of preparing for the unexpected. Our platform not only helps you manage your current expenses but also encourages smart saving for those unforeseen rainy days. With easy-to-use tools, effortlessly allocate funds towards your emergency savings.</p>
          </div>
          <div className='pane2'>
            <h3 className='splashcard splashcardheader'>Purposeful Planning</h3>
            <div id="imageContainerfriend" className='splashcard'>
            <img src="https://plus.unsplash.com/premium_photo-1679785709925-43eebd9d15f0?q=80&amp;w=400&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="400" height="300"></img>

            </div>
            <p className='splashcard'>Customize expense categories to align with your group's diverse interests, ensuring that everyone feels included. With real-time tracking, easily stay updated on who's paid what, making settling debts a hassle-free affair. Set collective financial goals that inspire everyone to contribute, fostering a sense of teamwork and achievement.</p>
          </div>
        </div>
        <div className='panels-bottom'>
          <div className='pane3'>
            <h3 className='splashcard splashcardheader'>Saving for the Future</h3>
            <div id="imageContainerfamily" className='splashcard'>
            <img src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&amp;w=400&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="400" height="300"></img>

            </div>
            <p className='splashcard'>Our platform is designed to unify and simplify your family's financial management. Customize budget categories to match your unique family dynamics and priorities, ensuring a tailored approach to your finances.</p>
          </div>
          <div className='pane4'>
            <h3 className='splashcard splashcardheader'>Budgeting</h3>
            <div id="imageContainersaving" className='splashcard'>
            <img src="https://plus.unsplash.com/premium_photo-1678823283266-021b5360062b?q=80&amp;w=400&amp;h=300&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="400" height="300"></img>


            </div>
            <p className='splashcard'>At BetterBudget, we've simplified the art of saving. Our platform offers a seamless way to keep track of your savings journey. Set personalized goals that align with your aspirations and let our intuitive visual tools transform the way you monitor progress.</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Splashpage;