require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signToken(user) {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing');
  return jwt.sign({ uid: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '1d'
  });
}

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email & password required' });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ error: 'email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });

    const token = signToken(user);
    return res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (e) {
    console.error('REGISTER_ERROR:', e.message);
    const msg = e.message?.includes('JWT_SECRET') ? 'server misconfigured (JWT secret missing)' : 'register failed';
    return res.status(500).json({ error: msg });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const token = signToken(user);
    return res.json({ token, user: { id: user.id, email: user.email } });
  } catch (e) {
    console.error('LOGIN_ERROR:', e.message);
    const msg = e.message?.includes('JWT_SECRET') ? 'server misconfigured (JWT secret missing)' : 'login failed';
    return res.status(500).json({ error: msg });
  }
};
