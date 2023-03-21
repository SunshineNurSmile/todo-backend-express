import User from '../models/User.js';
import * as argon2 from 'argon2';
import generateToken from '../utils/generateToken.js';

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const hash = await argon2.hash(password);

  try {
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate) {
      return res.status(409).json({ message: 'User already exists!' });
    }

    const newUser = await User.create({
      username,
      password: hash,
    });

    const jwt = generateToken(newUser._id, username);

    res.cookie('jwt', jwt, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(201).json({ username });
  } catch (err) {
    console.err(err);
    res.status(500).json({ message: 'Error creating user!' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username })
      .select('password _id')
      .lean()
      .exec();
    if (!user) {
      return res.status(404).json({ message: 'No user found!' });
    }

    const hash = user.password;
    const passwordMatch = await argon2.verify(hash, password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Wrong password provided!' });
    }

    const jwt = generateToken(user._id, username);

    res.cookie('jwt', jwt, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({ username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in user!' });
  }
};

const logoutUser = (_req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logout successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging out user!' });
  }
};

const verifyLogin = (req, res) => {
  const { username } = req.body;
  res.status(200).json({ valid: true, username });
};

export { createUser, loginUser, logoutUser, verifyLogin };
