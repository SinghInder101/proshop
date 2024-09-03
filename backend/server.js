import express from 'express';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config()
const port = process.env.PORT || 5001;
connectDB();

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({
  extended:true
}))
app.use(cookieParser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow all origins
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow the methods you need
    res.header('Access-control-allow-credentials', true)
    next();
  });

app.get('/',(req,res) => {
    res.send('API is running');
})

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes)

app.get('/api/config/paypal',(req,res) => res.send({
  clientId:process.env.PAYPAL_CLIENT_ID
}))

app.use(notFound);
app.use(errorHandler);

app.listen(port,() => console.log('Server running'))