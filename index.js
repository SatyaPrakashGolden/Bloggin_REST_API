require('dotenv').config();
const express = require('express');
const app = express();
const connectDB=require('./database/db.js')
const userRoutes = require('./routes/userRoute.js');
const Blogrouter=require('./routes/blogRouter.js');
const port = process.env.PORT || 4000;
connectDB();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/users',userRoutes);
app.use('/api/blog',Blogrouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});