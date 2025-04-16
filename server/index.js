require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;  
const userRouter = require('./api/routes/userRoutes.js');
const adminRouter = require('./api/routes/adminRoutes.js');
app.use(express.json());
app.use(cors()); 


app.use('/user', userRouter);    
app.use('/admin',adminRouter);


app.listen(port, () => {
    console.log(`SERVER IS RUNNING AT PORT : ${port}`);

    
});
