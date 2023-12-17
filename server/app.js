
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const User = require("./model/userSchema")
const DB = 'mongodb+srv://tannu:1234@cluster0.k7ybicw.mongodb.net/tul?retryWrites=true&w=majority'
mongoose.connect(DB).then(() => {
    console.log(`connection successful`)
}).catch((err) => console.log(`no connection`));
app.use(express.json());

app.post('/register', async (req, res) =>{
    const {  name , phone , age ,batch} = req.body;
    if( !name || !phone || !age || !batch){
        // return res.json({error : "Please fill all fields"});
        return res.status(422).json({error : "Please fill all fields"});
    }

    try{
                                                       //!st email is of database email and 2nd is of registration time email
    {
            const user = new User({ name , phone , age ,batch});

        await user.save();
            res.status(201).json({message: "user registered successfully"});
        }
    }catch(err){
        console.log(err);
    }
});



app.get('/', (req, res) => {
    res.send('Hello world form the server');
});



app.listen(5000, () => {
    console.log(`Server is running at port no 5000`);
})