// const { Button } = require("bootstrap");

// window.onload = () => {
//     let region = document.querySelector("#text_auto_type_form_category")

//     region.addEventListener("change", function(){
//         let form = this.closest("form");
//         let data = this.name + "=" + this.value
//         fetch(form.action,{
//             method : form.getAttribute("method"),
//             body : data,
//             headers : {
//                 "Content-Type" : "application/x-www-form-urlencoded; charset : utf-8"
//             }
//         })
//         .then(response => response.text())
//         .then(html => {
//             let content = document.createElement("html")
//             content.innerHTML = html
//             let newSelect = content.querySelector("#text_auto_type_form_category")
//             document.querySelector("#text_auto_type_form_category").replaceWith(newSelect)
//             console.log(newSelect)
//         })
//         .catch(error => {
//             console.log(error)
//         })

//     })

//     let collection, boutonAjout, span;
//     collection = document.querySelector("#categories")
//     span = collection.querySelector("span")
//     boutonAjout = document.createElement("button")
//     boutonAjout.className ="ajout-cat btn secondary"
//     boutonAjout.innerText = "Ajouter"

//     let nouveauBouton = span.append(boutonAjout)

//     collection.dataset.index = collection.querySelectorAll("input").length

//     boutonAjout.addEventListener("click", function(){
//         addButton(collection, nouveauBouton)
//     })

//     function addButton(collection, nouveauBouton){
//         let prototype = collection.dataset.prototype

//         let index =collection.dataset.index

//         prototype = prototype.replace(/__name__/g, index)

//         let content = document.createElement("html")
//         content.innerHTML = prototype
//         let newForm = content.querySelector("div")

//         let boutonSuppr = document.createElement("button")

//         boutonSuppr.type = "button"
//         boutonSuppr.className = "btn red"
//         boutonSuppr.id  = "del-cat" + index
//         boutonSuppr.innerText ="supprimer"
//         console.log(newForm)
//         newForm.append(boutonSuppr)

//         collection.dataset.index++

//         let boutonAjout = collection.querySelector("ajout-cat")
//         span.insertBefore(newForm, boutonAjout)

//         boutonSuppr.addEventListener("click", function(){
//             console.log(boutonSuppr.previousElementSibling.parentNode)
//             this.previousElementSibling.parentNode.remove()
//         })

//     }
// }
