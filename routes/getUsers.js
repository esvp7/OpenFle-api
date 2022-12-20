const router = require("express").Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
    
    try {
        const users = await User.find();
        res.json({ data: users });

    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;