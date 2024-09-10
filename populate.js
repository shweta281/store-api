require("dotenv").config()
require("express-async-errors")
const Product=require("./models/product")
const data=require("./products.json")
const connectDB=require("./db/connect")

const start = async ()=>{
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(data);
    console.log("connected");
    process.exit(0); // 
}
start()
