const mongoose = require('mongoose');

// creating database
mongoose.connect("mongodb://localhost:27017/grocery_items",
{
   useCreateIndex:true, 
   useNewUrlParser:true,
   useUnifiedTopology:true,
   useFindAndModify:false
}).then(() => {
       console.log('Database connected');
}).catch((err) => {
   console.log("unable to connect")
});
module.exports = mongoose;
