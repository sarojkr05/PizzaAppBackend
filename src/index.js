const express = require('express');
const cookieParser = require('cookie-parser');

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const authRoute = require('./routes/authRoutes');
const { isLoggedIn } = require('./validation/authValidator');
const uploader = require('./middlewares/multerMiddleware');
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');
const Product = require('./schema/productSchema');
const productRouter = require('./routes/productRoute');
// const User = require('./schema/userSchema');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//Routing middleware
//If your req route starts with /users then handle it using userRoter
app.use('/users', userRouter); //This line connects the ueserRouter to the server
app.use('/carts', cartRouter);
app.use('/auth', authRoute);
app.use('/products', productRouter);

app.get('/ping', isLoggedIn, (req, res) => {
    //Controller
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message: "pong"});
});

app.post('/photo', uploader.single("incommingFile"), async (req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Result from cloudinary", result);
    await fs.unlink(req.file.path);
    return res.json({message: 'Okay'});
});


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