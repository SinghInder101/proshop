import express from 'express';

import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'
dotenv.config()
const port = process.env.PORT || 5001;
connectDB();

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/',(req,res) => {
    res.send('API is running');
})

app.use('/api/products',productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port,() => console.log('Server running'))