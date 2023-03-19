import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

const User = mongoose.model('User', UserSchema);

export default User;
