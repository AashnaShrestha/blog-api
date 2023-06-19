const express = require('express');
const app = require();
// const dotenv = require('dotenv');
const port = process.env.PORT;
// const verifyToken = require("./middlewares/verifyToken");
// const blogRoute = require('./routes/blogs');
// const userRoute = require('./routes/user');
// const userEntry = require('./controller/userEntry');

app.use(express.json());

// dotenv.config();

// app.use('/api/users', userEntry);
// app.use(verifyToken);
// app.use('/api/users', userRoute);
// app.use('/api/blogs', blogRoute);

app.listen(port, () => {
    console.log(`App is listening at port:${port}`);
})
