const router = require("express").Router();
const { User } = require("../models/user");

router.patch("/", async (req, res) => {

  const { 
    firstName, 
    lastName,
    userName,
    profilePicture,
    gender,
    age,
    frenchLevel,
    speakingLanguages,
    country,
    description,
    frenchResources,
  } = req.body;

  const updatedUser = { 
    firstName, 
    lastName,
    userName,
    profilePicture,
    gender,
    age,
    frenchLevel,
    speakingLanguages,
    country,
    description,
    frenchResources,
};
  
  const user = await User.findOneAndUpdate({ email: req.body.email}, updatedUser, { new: true });
  if (!user) return res.status(404).send(`No user exists`);

    console.log(updatedUser)
    res.json(updatedUser);
});

module.exports = router;