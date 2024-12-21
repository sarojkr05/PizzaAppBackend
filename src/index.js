const express = require('express');

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const authRoute = require('./routes/authRoutes');
// const User = require('./schema/userSchema');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//Routing middleware
//If your req route starts with /users then handle it using userRoter
app.use('/users', userRouter); //This line connects the ueserRouter to the server
app.use('/carts', cartRouter);
app.use('/auth', authRoute);

app.post('/ping', (req, res) => {
    console.log(req.body);
    return res.json({message: "pong"});
})

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);

    // const newUser = await User.create({
    //     email: 'saroj123@gmail.com',
    //     password: '123456',
    //     firstName: 'Saroj',
    //     lastName: 'Kumar',
    //     mobileNumber: '9999999999'
    // })
    // console.log("Created new user")
    // console.log(newUser)
});