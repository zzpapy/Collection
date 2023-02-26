
function changeColor(coll, color){

    for(var i=0, len=coll.length; i<len; i++)
    {
        coll[i].style["background-color"] = color;
    }
}

const btn = document.getElementById('color');
if(btn){
    
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
}

const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#inputPassword');

  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});