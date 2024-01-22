// backend/models/user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], required: true },
});

// Hash the password before saving it to the database
userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(4, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      console.log(hash);
      user.password = hash;
      next();
    });
  });
});


module.exports = mongoose.model('User', userSchema);