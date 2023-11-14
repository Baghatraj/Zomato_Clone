const User = require('../Models/LoginSignup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

exports.register = async (req, res) => {
    try {
        const { Name, email, phoneNo, address, password } = req.body;

        const userEmail = await User.find({ email: email })
        const userNumber = await User.find({ phoneNo: phoneNo })

        if (userEmail.length != 0 || userNumber.length != 0) {
            res.status(422).json({ message: "user already exists" })
        } else {
            const user = new User({ Name, email, phoneNo, address, password });
            const savedUser = await user.save();
            res.status(201).json({ message: "User has been registered successfully" , user : savedUser });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error" });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).send({ message: "no user found" }); // return - Return the response and exit the handler
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETKEY);
        res.json({ message: "logged in successfully", token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error" });
    }
}
exports.auth = async (req, res) => {
    try {
      // Access user information from req.user, which was set by the authMiddleware
      const userId = req.user.userId;
  
      // You can use the userId to fetch user-specific data or perform actions
      // For example, fetching user's profile data from the database
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.password = ''
      // Return user-specific data or perform actions
      res.status(200).json({ message: 'Protected route accessed', user, Name : user.Name});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };