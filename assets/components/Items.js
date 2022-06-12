import React from 'react';
import { Markup } from 'interweave';
 
 const Items = ({ id, title, text}) => (
     <div className="text" key={id} id={id} > 
        <p><Markup content={title} /></p> 
        <Markup className="content" content={text} /> 
     </div>
 );
 
 export default Items;