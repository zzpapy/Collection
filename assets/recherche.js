
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import React , { useEffect, useState }from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {search, cat, find, del} from './APP/APP'
import Items from './components/Items'
import Select from 'react-select'
import FlashMessage from 'react-flash-message'



class App extends React.Component {
   
    constructor(props) {
        super(props);   
        this.handleActorKeyUp = this.keyUpHandlerActor.bind(this, 'message');     
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.click.bind(this);
        this.state = {
            category : {},
            selectCat : "",
            all : {},
            listText : {},
            x : 0,
            y : "100vh",
            flash : false,
            radio:null
            };
           
    }
    
    
    componentDidMount() {
        cat().then(res => {
            return res
            
        }).then(
            res => {
                let result = []
                res.cat.map((key, el) =>{
                    result = [...result,{value : key.name, label : key.name }]
                })
                if(Object.keys(this.state.category).length ==0){
                    this.setState({
                        category : result
                    })
                }
            }
            ) 
            
            find().then(res => {
                return res
                
            }).then(
                res => {
                    let result = []
                    res.text.map((key, el) =>{
                        result = [...result,{text : key.text, title : key.title, id: key.id }]
                    })
                    if(Object.keys(this.state.all).length ==0){
                        this.setState({
                            all : result
                        })
                    }
                }
                ) 
        }
   
    keyUpHandlerActor = (refName, e) => {
        this.setState({                              
            listText : {},
            radio : refName.target.value
            // selectCat: ""
          });
        search(refName.target.value,this.state.selectCat)
        .then(res => {
           return res
        })
        .then((res) => {
            this.setState({                              
            listText : res
          });
        })
    }

    handleChange(e) {
        this.setState({ selectCat: e.target.value });
        search(this.state.radio,this.state.selectCat)
        .then(res => {
            return res
         })
         .then((res) => {
             this.setState({                              
             listText : res
           });
         })
    }

    click = (e) => {
        e.preventDefault();
        let x = e.clientX 
        let y = e.clientY * 2.5
        if(e.target.querySelector(".content") != null){
            let htmlContent = e.target.querySelector(".content").textContent
            this.setState({ 
                flash: true,
                x:x,
                y:y
            },function (){
                window.getSelection()
                .selectAllChildren(
                    e.target.querySelector(".content")
                    );
                    document.execCommand('Copy');
                setTimeout(() => this.setState({ flash: false }),1000)
               
                
            });
        }
        else{
            
            if(e.target.parentNode.closest("p") != null){
                this.setState({ 
                    flash: true,
                    x:x,
                    y:y
                },function (){
                    window.getSelection()
                    .selectAllChildren(
                        e.target.parentNode.closest("p").nextElementSibling
                        );
                        document.execCommand('Copy');
                    setTimeout(() => this.setState({ flash: false }),1000)
                   
                    
                });
            }
            else{
                this.setState({ 
                    flash: true,
                    x:x,
                    y:y
                },function (){
                    window.getSelection()
                    .selectAllChildren(
                        e.target
                        );
                        document.execCommand('Copy');
                    setTimeout(() => this.setState({ flash: false }),1000)
                   
                    
                });
            }
        }
    }
     deleteItem = (e) => {
        e.preventDefault();
           if(e.target.parentNode.className == "del"){
               del(e.target.parentNode.id)
               .then(res => {
                   return res
                })
                .then(
                   e.target.parentNode.style.display= "none"
                )

           }
        }
     
   

   
    dispFlash = <div  className="flash" duration={1000}>
                    <strong className="">Copié !</strong>
                </div>

    render() {
    return (
            <div>
                <div><a href="https://50anni-emanuela.fr" target="_blank">Une question à chatGPT</a></div>
               <form className="recherche" onSubmit={this.click}> 
                    <div className="radio">
                        {this.state.category.length > 0 ?  this.state.category.map(({value}) => {
                            return(
                                <span key={value}> 
                                <input type="radio" value={value} name="gender" id={value}  onChange={this.handleChange}/> 
                                <label htmlFor={value}>
                                    {value}
                                </label>
                                </span>
                            )
                        }):null}
                    </div>            
                    Recherche : <input type="text" onKeyUp={this.keyUpHandlerActor} placeholder="" ref={this.message}  />
                </form>
                <div className="listText">
                {Object.keys(this.state.listText).length != 0 ? this.state.listText.text.map(
                ({ text, title,id }) =>  {
                    return (
                        <div key={id} className="del" id={id} onClick={this.deleteItem}><i className="fa-regular fa-trash-can"></i>
                        <div  onClick={this.click}>
                            <Items
                                key={id}
                                text={text}
                                title={title}
                                id={id}
                                onClick={this.click}
                            >
                            </Items>
                            <div className="falshContent" style={{width:"100%",position:"fixed",top:"25vh",left:"0"}}>
                                {this.state.flash ? this.dispFlash : null}
                            </div>
                        </div>
                        </div>
                    );
                }
                ):Object.keys(this.state.all).length != 0 ? this.state.all.map(
                    ({ text, title,id }) =>  {
                        return (
                            <div key={id} className="del" id={id} onClick={this.deleteItem}><i className="fa-regular fa-trash-can"></i>
                            <div  onClick={this.click}>
                                <Items
                                    key={id}
                                    text={text}
                                    title={title}
                                    id={id}
                                    onClick={this.click}
                                >
                                </Items>
                                <div className="falshContent" style={{width:"100%",position:"fixed",top:"25vh",left:"0"}}>
                                    {this.state.flash ? this.dispFlash : null}
                                </div>
                            </div>
                            </div>
                        );
                    }
                    ):null} 
                </div>
            </div>     
        )
    }
    
}
if(document.getElementById('recherche') != null){
    const container = document.getElementById('recherche')
    const root = createRoot(container);
    root.render(<App />);

}