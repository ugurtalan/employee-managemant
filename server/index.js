require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;  // Portu çevresel değişkenden al ya da 3000 kullan
const userRouter = require('./api/routes/userRoutes.js');
const adminRouter = require('./api/routes/adminRoutes.js');
// Middleware'leri ekle
app.use(express.json());
app.use(cors());  // cors middleware'ini doğru şekilde kullan

// Route'ları tanımla
app.use('/user', userRouter);    // User route'ları
app.use('/admin',adminRouter);


app.listen(port, () => {
    console.log(`SERVER IS RUNNING AT PORT : ${port} ...`);

    
});
