const admin = require('../firebase');
const User = require('../models/User');
exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    console.log('Firebase user in authcheck', firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (error) {
    console.log('Err...', error);
    res.status(401).json({ err: 'Invalid or expired token' });
    return;
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== 'admin') {
    res.status(403).json({
      err: 'Not authorized to access this resource',
    });
  } else {
    next();
  }
};
