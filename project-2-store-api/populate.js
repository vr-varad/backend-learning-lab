const connectDB = require("./db/connect");

require("dotenv").config();

const Product = require("./models/products.model");
const jsonProducts = require("./product.json");


const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('Succcess!!!!')
        process.exit(0)
    } catch (error) {
      console.log(error)  
    }
}

start()