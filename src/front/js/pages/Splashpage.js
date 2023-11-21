import React from 'react';
import "../../styles/splashpage.css"

const Splashpage = () => {
  return (
    <div>  
      <div className='splash-banner'>
        <h2>Banner</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus vehicula risus, sed vulputate nibh vehicula in. Quisque a ligula sapien. Pellentesque ullamcorper, risus consectetur mollis blandit, dui nunc tincidunt justo, id bibendum sapien risus venenatis nibh. In varius placerat est a blandit. Donec ac mi vel justo consequat bibendum. In ut dignissim augue. Donec quis metus finibus, tincidunt mauris hendrerit, viverra sapien. Aliquam porttitor, tellus nec ultrices semper, urna quam iaculis ante, ac fermentum est nisi eget neque. Nulla porta diam turpis, consequat feugiat augue bibendum eget. Phasellus viverra, ipsum sit amet consectetur tristique, quam odio molestie lacus, eget egestas augue lorem congue orci. Phasellus leo tellus, tempor et aliquam tincidunt, aliquam sit amet diam. Ut aliquam aliquet nibh, vel fermentum mi pellentesque at. Integer eu libero ac ex malesuada semper eget at odio. Sed vel massa eu leo pretium mattis. Proin mollis ipsum leo, nec tristique odio porta id.</p>

      </div>
      <div className='splash-panels'>
        <div className='panels-top'>
          <div className='panel'>
            <h3>Panel 1</h3>
            <p>Maecenas pretium sem at tellus cursus ornare.</p>
          </div>
          <div className='panel'>
            <h3>Panel 2</h3>
            <p>Maecenas pretium sem at tellus cursus ornare.</p>
          </div>
        </div>
        <div className='panels-bottom'>
        <div className='panel'>
            <h3>Panel 3</h3>
            <p>Maecenas pretium sem at tellus cursus ornare.</p>
          </div>
          <div className='panel'>
            <h3>Panel 4</h3>
            <p>Maecenas pretium sem at tellus cursus ornare.</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Splashpage;