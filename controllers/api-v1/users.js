const express = require("express");
const router = express.Router();
const db = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authLockedRoute = require("./authLockedRoute")

// GET /users - test endpoint
router.get("/", (req, res) => {
  res.json({ msg: "welcome to the users endpoint" });
});

// POST /users/register - CREATE new user
router.post("/register", async (req, res) => {
  try {
    // check if user exists already
    const findUser = await db.User.findOne({
      email: req.body.email,
    });

    // don't allow emails to register twice
    if (findUser) {
      return res.status(400).json({ msg: "email exists already" });
    }

    // hash password
    const password = req.body.password;
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create new user
    const newUser = new db.User({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    // create jwt payload
    const payload = {
      name: newUser.name,
      email: newUser.email,
      _id: newUser.id,
    };

    // sign jwt and send back
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

// POST /users/login -- validate login credentials
router.post("/login", async (req, res) => {
  try {
    // try to find user in the db
    const foundUser = await db.User.findOne({
      email: req.body.email,
    });

    const noLoginMessage = "Incorrect username or password";

    // if the user is not found in the db, return and sent a status of 400 with a message
    if (!foundUser) {
      return res.status(400).json({ msg: noLoginMessage });
    }

    // check the password from the req body against the password in the database
    const matchPasswords = bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    // if provided password does not match, return an send a status of 400 with a message
    if (!matchPasswords) {
      return res.status(400).json({ msg: noLoginMessage });
    }

    // create jwt payload
    const payload = {
      name: foundUser.name,
      email: foundUser.email,
      _id: foundUser.id,
    };

    // sign jwt and send back
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

// GET /auth-locked - will redirect if bad jwt token is found
router.get("/auth-locked", authLockedRoute, (req, res) => {
  // use res.locals.user here to do authorization stuff
  console.log("logged in user:", res.locals.user);
  res.json({ msg: "welcome to the private route!" });
});


//PUT /user-- edit user
router.put("/", authLockedRoute, async (req, res) => {
  try {
    const userId = res.locals.user._id;
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const update = await db.User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          userName: req.body.userName,
          password: hashedPassword,
          img: req.body.img,
        }
      },
      { new: true }
    );
    await update.save();
    res.json(update);
  } catch (err) {
    console.log(err);
  }
});

//DELETE /user -- Delete user
router.delete("/", authLockedRoute, async (req, res) => {
  try {
    const user = await db.User.findByIdAndDelete(res.locals.user._id)
    res.json({ message: 'user was deleted' })
    console.log('it may deleted')

  } catch (err) {
    console.log(err)
  }
})

//------RESTFUL CRUD---------
//GET /favorites --Read a list of all favorites 
router.get('/favorites', authLockedRoute, async (req, res) => {
  try {
    const user = await db.User.findById(res.locals.user._id)
    const movies = await db.FavoriteMovie.find({ _id: { $in: user.favorites } })
    res.json({ result: movies })
  } catch (err) {
    console.log(err)
  }
})
//GET /watchlist -- Read all movies that are in the wishList array
router.get("/watchlist", authLockedRoute, async (req, res) => {
  try {
    const user = await db.User.findById(res.locals.user._id);
    const watchList = await db.WatchList.find({})
    res.json({ result: watchList });
  } catch (err) {
    console.log(err);
  }
});

//POST /favorites -- add a movie to the favorites array
router.post("/favorites", authLockedRoute, async (req, res) => {
  try {
    const user = await db.User.findById(res.locals.user._id);
    const newFavorite = await db.FavoriteMovie.create(req.body);
    user.favorites.push(newFavorite);
    await user.save();
    res.json({ result: user });
  } catch (error) {
    console.log(error);
  }
});

//POST /watchlist -- add a movie to the favorites array
router.post("/watchlist", authLockedRoute, async (req, res) => {
  try {
    const user = await db.User.findById(res.locals.user._id);
    const newWatch = await db.WatchList.create(req.body);
    user.watchList.push(newWatch);
    await user.save()
    res.json({ result: user });
  } catch (err) {
    console.log(err);
  }
});

// // DELETE /favorites/:id -- delete a movie from the favorites array
router.delete("/favorites/:id", authLockedRoute, async (req, res) => {
  try {
    console.log(res.locals.user._id)
    console.log(req.params.id)
    const removeFavorite = await db.FavoriteMovie.findByIdAndRemove(({ _id: req.params.id }))
    const findUser = await db.User.findByIdAndUpdate(
      { _id: res.locals.user._id },
      { $pull: { favorites: removeFavorite._id } }
    )
    res.json({ result: "You are the best and solved Player One's last mission" })
  } catch (error) {

  }
})



//DELETE /watchlist/:id --delete a specific movie from the array
router.delete("/watchlist/:id", authLockedRoute, async (req, res) => {
  try {
    const user = await db.User.findById(res.locals.user._id);
    user.watchList.remove(req.params.id)
    user.save()
    res.json({ result: "Watch List Removed" });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
