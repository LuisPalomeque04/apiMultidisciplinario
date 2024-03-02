const express= require ('express');
const app=express();
const authRoutes = require('./src/routes/routes.auth');
const usuarioRoutes = require('./src/routes/routes.usuarios');


app.use(express.json());
app.use('/auth',authRoutes);
app.use('/usuarios', usuarioRoutes);


module.exports=app;