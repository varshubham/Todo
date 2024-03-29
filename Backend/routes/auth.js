const express = require('express')
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const nodemailer = require('nodemailer');

const SECRET_KEY = "thisisasecretkey"

router.post('/createUser', [
    body('email', 'Enter correct email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'password should not be less than 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let success = false;
        //check is user already exist
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success=false;
            return res.status(400).json({ error: "sorry user with this email already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // secPass = req.body.password
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, SECRET_KEY);
        success=true;
        res.json({success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})



//new route ie authenticating a user
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be black').exists()
],async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password} = req.body;
    try {
        let success=false;
        let user=await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({error:"please try to login with correct credentials"});
        }

        const passwordcompare = await bcrypt.compare(password,user.password);
        if(!passwordcompare){
            success=false;
            return res.status(400).json({error:"please try to login with correct credentials"})
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,SECRET_KEY)
        success=true;
        res.json({success,authtoken})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// route 3: get loggedin user details
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        const userId = req.user.id;
        const user=await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        res.status(500).send("Internal server  huhuerror")
    }
})

// route 4 : edit user details

router.put('/edit', fetchuser, async (req, res) => {
    try {

        const { name, email } = req.body;
        const newuser = {};
        if (name) { newuser.name = name }
        if (email) { newuser.email = email }

        let user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).send("Not found")
        }
        else {
            users = await User.findByIdAndUpdate(req.user.id, { $set: newuser }, { new: true })
            res.json({ users })
        }


    } catch (error) {
        res.status(500).send("Internal Server error")
    }
})

// route 5 : change password
router.put('/changepass', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).send("not found")
        }
        else {
            const {password} = req.body;
            const userpp = await User.findById(req.user.id).select("password");
            const comparrr = await bcrypt.compare(password, userpp.password);
            if (comparrr) {
                return res.status(400).json({ error: "please set new password" })
            }
           
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(req.body.password, salt)

                const user = await User.findByIdAndUpdate(req.user.id, { password: secPass}, { new: true })
                res.json(user)

           
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server error")
    }
})

module.exports = router