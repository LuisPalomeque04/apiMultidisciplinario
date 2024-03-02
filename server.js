const app = require("./app");
require("dotenv").config();
const port = process.env.PORT;
const connectDB = require('./src/config/db')

connectDB();

app.listen (port,()=>{

console.log("Bienvenido a mi API "+port)

})