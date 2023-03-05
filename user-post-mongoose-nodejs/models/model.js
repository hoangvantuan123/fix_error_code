const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tạo mô hình cho collection "users"
const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});

const User = mongoose.model("User", UserSchema);

/* const userPost = new User({
    username: 'Hoang',
    email: 'tuantuanhoang@gmail.com',
    password: '1234566778',
});
userPost.save();
console.log(userPost); */


// Tạo mô hình cho collection "posts"
const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    image_path: { type: String },
    createdAt: { type: Date, default: Date.now() }
});

const Post = mongoose.model("Post", PostSchema);


/* const newPost = new Post({
    title: "Hoangvantuan",
    content: "Lorem lorem lorem 2",
    author: "64042287b7fa89aa1b011295"

})
newPost.save(); */
/* console.log(newPost) */
module.exports = {
    User,
    Post
};