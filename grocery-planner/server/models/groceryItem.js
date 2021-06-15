const mongoose = require('mongoose');
const itemSchema = mongoose.Schema({
   groceryItem:{
      type:String
   },
   isPurchased:{
       type:Boolean,
       default:false

   }
    
}
)
const GroceryItem = mongoose.model("GroceryItem",itemSchema);

module.exports = GroceryItem;