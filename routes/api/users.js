const express = require('express');
const router = express.Router();
const { check , validationResult}=require('express-validator');
const User = require('../../models/User');

const bcrypt = require('bcryptjs');

// @route  POST api/users
// @desc   Test
// @access Public


router.post('/',
    check('name','Name cant be empty').notEmpty(),
    check('email','Enter a valid email').isEmail(),
    check('password','Please enter a password with 8 to 10 characters').isLength({ min: 8 , max:10}),
    check('phoneNumber','Please enter a valid phone number').isMobilePhone(),

    
 async (req,res) => {
    
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }

    const {name,email,password,phoneNumber}=req.body;
    try{
        let user= await User.findOne({email});
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
          }
        
        user= new User({
            name,
            email,
            password,
            phoneNumber
        });

        const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
    res.send('user route');
    
});
module.exports= router;