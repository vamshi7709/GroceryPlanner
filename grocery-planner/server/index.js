const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
require("./db/connection");
 
const GroceryItem = require("./models/groceryItem");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/",(req,res)=>{
   res.send("Welcome to server")
})

// adding items in database
app.post("/groceryItems/add",async(req,res)=>{
   try {
         const GroceryItems = new GroceryItem({
            groceryItem:req.body.groceryItem,
             isPurchased:req.body.isPurchased
           });
           const item1 = await GroceryItems.save();
            res.status(201).json({"result" : "success" })
         
   } catch (error) {
      console.log(error);
      res.status(500).send();
   }
})

// getting items from database 
app.get("/groceryItems/getAll",async(req,res)=>{
   try {
          const item1 = await GroceryItem.find();
            res.status(201).json(item1);
         
   } catch (error) {
      res.status(500).send();
   }
}
)
// getting single item from database 
app.get("/groceryItems/:id",async(req,res)=>{
   try {
          const item1 = await GroceryItem.findById(req.params.id);
            res.status(201).json(item1);
         
   } catch (error) {
      res.status(500).send();
   }
})
// update  item from database 
app.put("/groceryItems/updatePurchaseStatus",async(req,res)=>{
   try {
          const id = req.body._id;
          const item_1 = await GroceryItem.findById(id);
           item_1.isPurchased=req.body.isPurchased
           const item = await item_1.save();
                        
          res.status(201).json({"result" : "success" });
         console.log(item_1);
   } catch (error) {
      res.status(500).send(error);
      console.log(error);
   }
})
// delete  item from database 
app.delete("/groceryItems/deleteGroceryItem",async(req,res)=>{
   try {
      const id = req.body._id;
      const deleted_item = await GroceryItem.findByIdAndRemove(id).exec();
         res.status(201).json({"result" : "success" });
         console.log(item_1);
   } catch (error) {
      res.status(500).send(error);
      console.log(error);
   }
})

app.listen(port,()=>{
   console.log(`server is running at port no. ${port}`);
   
   })