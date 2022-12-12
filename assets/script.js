
function changeColor(coll, color){

    for(var i=0, len=coll.length; i<len; i++)
    {
        coll[i].style["background-color"] = color;
    }
}

const btn = document.getElementById('color');

btn.addEventListener('click', function onClick(event) {
   if(document.body.classList.contains('dark')){
        document.body.classList.remove("dark")
        event.target.style.backgroundColor = 'black'
        event.target.style.color = 'white'
        changeColor(document.getElementsByClassName('top'), 'white'); 
        event.target.textContent ='Dark'
    } 
    else{
        document.body.classList.add("dark") 
        event.target.style.backgroundColor ='white'
        changeColor(document.getElementsByClassName('top'), 'black'); 
        event.target.style.color = 'black'
        event.target.textContent ='Light'
    }
    
  

});