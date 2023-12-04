import React from 'react';
import "../../styles/splashpage.css"

const Splashpage = () => {
  return (
    <div>
      <div className='splash-banner p-3 w-100 m-auto'>
        <h1 className='bannerwords d-flex px-5 w-75'>About Us</h1>
        <p className='bannerpara d-flex px-5 w-75'>At BetterBudget, we understand the importance of financial well-being. Our mission is to empower individuals to take control of their finances effortlessly. We believe that managing money should be simple, accessible, and stress-free for everyone. Our user-friendly budgeting app is designed to help you track expenses, set savings goals, and gain insights into your spending habits. Whether you're a seasoned budgeter or just starting your financial journey, [App Name] is here to support you every step of the way. Join us in building a brighter financial future, where managing your money is both convenient and rewarding..</p>

      </div>
      <div className='splash-panels'>
        <div className='panels-top '>
          <div className='panel p-3 w-25 m-auto'>
            <h3 className='splashcard splashcardheader'>Rainy day!</h3>
            <div id="imageContainerbank" className='splashcard'>
              <img alt="display: block;-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://media.istockphoto.com/id/682961712/vector/pink-piggy-bank-with-falling-coins-saving-money-investments-in-future.jpg?s=2048x2048&amp;w=is&amp;k=20&amp;c=ZcrhLG_8cmIxPNVfma_QNPtvrErl3aRF_RQuI0FhS-s="width="400" height="300"></img>
            </div>
            <p className='splashcard'>"Life is unpredictable, and at BetterBudget, we understand the importance of preparing for the unexpected. Our platform not only helps you manage your current expenses but also encourages smart saving for those unforeseen rainy days. With easy-to-use tools, effortlessly allocate funds towards your emergency savings.</p>
          </div>
          <div className='pane2 p-3 w-25 m-auto'>
            <h3 className='splashcard splashcardheader'>Coordinating with friends!</h3>
            <div id="imageContainerfriend" className='splashcard'>
              <img alt="display: block;-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://media.istockphoto.com/id/1218490893/vector/happy-young-employees-giving-support-and-help-each-other.jpg?s=2048x2048&amp;w=is&amp;k=20&amp;c=bmTTa5iWM98QFuVXRWCohkzZQ-ia2vy1ieypfRBjTH4="width="400" height="300"></img>
            </div>
            <p className='splashcard'>Customize expense categories to align with your group's diverse interests, ensuring that everyone feels included. With real-time tracking, easily stay updated on who's paid what, making settling debts a hassle-free affair. Set collective financial goals that inspire everyone to contribute, fostering a sense of teamwork and achievement.</p>
          </div>
        </div>
        <div className='panels-bottom'>
          <div className='pane3 p-3 w-25 m-auto'>
            <h3 className='splashcard splashcardheader'>Family Budget</h3>
            <div id="imageContainerfamily" className='splashcard'>
              <img alt="display: block;-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://media.istockphoto.com/id/1281135683/vector/3d-isometric-flat-vector-conceptual-illustration-of-family-budget-management.jpg?s=2048x2048&amp;w=is&amp;k=20&amp;c=YMr9K6jHEUUI8jfluYDzgRsFiKy_Jzh-aAOQssJJ8xk="width="400" height="300"></img>
            </div>
            <p className='splashcard'>Our platform is designed to unify and simplify your family's financial management. Customize budget categories to match your unique family dynamics and priorities, ensuring a tailored approach to your finances.</p>
          </div>
          <div className='pane4 p-3 w-25 m-auto'>
            <h3 className='splashcard splashcardheader'>Saving for the Future</h3>
            <div id="imageContainersaving" className='splashcard'>
              <img alt="display: block;-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://media.istockphoto.com/id/1294349709/vector/savings-account-financial-success-concept-man-collecting-and-saving-money-tiny-character.jpg?s=2048x2048&amp;w=is&amp;k=20&amp;c=i4qaUUmTxKug8Fig-TMFL7C4ZWfpgV6JDOukPjXEGAQ=" width="400" height="300"></img>
            </div>
            <p className='splashcard'>At BetterBudget, we've simplified the art of saving. Our platform offers a seamless way to keep track of your savings journey. Set personalized goals that align with your aspirations and let our intuitive visual tools transform the way you monitor progress.</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Splashpage;