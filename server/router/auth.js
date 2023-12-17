const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate")
// const cookieParser = require("cookie-parser")
// Router.use(cookieParser)

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send('Hello world form the server router js');
});

// router.post('/register', (req, res) =>{
//     const { name, email, phone, work, password, confirmPassword} = req.body;
//     if(!name || !email || !phone || !work || !password || !confirmPassword){
//         // return res.json({error : "Please fill all fields"});
//         return res.status(422).json({error : "Please fill all fields"});
//     }
//     // console.log(req.body);

//     // console.log(req.body.name);
//     // console.log(req.body.email);

//     // res.json({message: req.body});
//                                                //!st email is of database email and 2nd is of registration time email
//     User.findOne({email: email})
//     .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({error: "email already registered"});
//         }

//         const user = new User({name, email, phone, work, password, confirmPassword});

//         user.save().then(() => {
//             res.status(201).json({message: "user registered successfully"});
//         }).catch((err) => res.status(500).json({error: "Failed to register"}));
//     }).catch((err) => {console.log(err); });
// });

router.post('/register', async (req, res) =>{
    const { name, email, phone, work, password, confirmPassword} = req.body;
    if(!name || !email || !phone || !work || !password || !confirmPassword){
        // return res.json({error : "Please fill all fields"});
        return res.status(422).json({error : "Please fill all fields"});
    }

    try{
                                                       //!st email is of database email and 2nd is of registration time email
        const userExist = await User.findOne({email: email})

        if(userExist){
            return res.status(422).json({error: "email already registered"});
        }else if(password != confirmPassword){
            return res.status(422).json({error: "Password are not matching"});

        }else{
            const user = new User({name, email, phone, work, password, confirmPassword});

        // const userRegister = await user.sace();
        
        // if(userRegister){
        //     res.status(201).json({message: "user registered successfully"});
        // }
        // else{
        //     res.status(500).json({error: "Failed to register"})
        // }

        await user.save();
            res.status(201).json({message: "user registered successfully"});
        }
    }catch(err){
        console.log(err);
    }
});

           //login route
router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({message: "awesome"});

    try{
        let token;
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: "Invalid details"});
        }

        const userLogin = await User.findOne({email: email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            // res.cookie("jwtoken", 'token', {
            res.cookie("jwt", 'token', {
                expires: new Date(Date.now() + 2589000000),
                httpOnly: true
            });

        if(!isMatch){
            res.status(400).json({error: "Invalid Credientials pass"});
        }
        else{
            res.json({message: "User signIn successfully"});
        }
        }
        else{
            res.status(400).json({error: "Invalid Credientials"});
        }

        console.log(userLogin);        
    }
    catch(err){
        console.log(err);
    }
})
               //About us page
    router.get('/About', authenticate,  (req, res) => {
        console.log('Hello, my world');
    res.send(req.rootUser);
    });

module.exports = router;