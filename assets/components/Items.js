import React from 'react';
import { Markup } from 'interweave';
import {search, cat,del} from '../APP/APP'

const click = (e) => {
    e.preventDefault();
   
       console.log(e)
        // delete(id)
        // .then(res => {
        //     return res
        //  })
        //  .then(console.log("ok"))
    }
 
 const Items = ({ id, title, text}) => (
     <div  className="text" data={id} id={id} > 
        <p><Markup content={title} /></p> 
        <span key={id} onClick={click}>x</span>
        <Markup className="content" content={text} /> 
     </div> 
 );
 
 export default Items;