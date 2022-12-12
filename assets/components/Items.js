import React from 'react';
import { Markup } from 'interweave';
import {search, cat,del} from '../APP/APP'


 const Items = ({ id, title, text}) => (
     <div  className="text" data={id} id={id} > 
        <p><Markup content={title} /></p> 
        <Markup className="content" content={text} /> 
     </div> 
 );
 
 export default Items;