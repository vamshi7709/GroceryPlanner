import React,{Component} from 'react'
import axios from 'axios'
import './App.css';



class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      groceryItem:'',
      items: []
    } 
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
    groceryItem:event.target.value
           })  
          }
  onSubmit(event){
    event.preventDefault()
     if(this.state.groceryItem ==="")
     {
       alert('enter items')
     }else{
     const GroceryItem = {
      groceryItem:this.state.groceryItem
      }
    axios.post("http://localhost:8080/groceryItems/add",GroceryItem)
    .then(response=>console.log(response.data))
    this.setState(
      {
        groceryItem:''
      }
    )
    window.location.reload(false); 
  }
  }    
  componentDidMount(){
    fetch("http://localhost:8080/groceryItems/getAll")
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        items: json
      })
    })
  }

  purchased(id){
      axios.put("/groceryItems/updatePurchaseStatus",{ _id: id , isPurchased: true })
      window.location.reload(false);
    }
  delete(id){
      axios.delete('http://localhost:8080/groceryItems/deleteGroceryItem',{ data: { _id: id } });
      window.location.reload(false);
    };
    
render(){
    let {items} = this.state;
       const today = new Date()
    let month = today.toLocaleString('default', { month: 'long' })
    
   return (
    <div className="App">
      <header className="App-header">
        Monthly  Grocery Planning App      
      </header>
    <h2>Plan for the month of {month} </h2>
       <form onSubmit = {this.onSubmit}>
         <input type="text"
         
         value={this.state.groceryItem} 
         onChange={this.handleChange} 
         placeholder='Add Shopping items' 
         name="groceryItem" />
     </form>
     <ul>
         {items.map(item=>(
           <li key={item._id} >
           { item.isPurchased === true ? <strike>{item.groceryItem}</strike> : item.groceryItem} 

           <button onClick={()=> this.purchased(item._id)} id="purchased">Purchased</button>
           <button onClick={()=> this.delete(item._id)} id="close">X</button>
          </li>
         ))}
       </ul>
     </div>
      );       
}
}
   
export default Home;
