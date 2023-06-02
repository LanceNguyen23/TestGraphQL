import mongoose from "mongoose";

const { Schema } = mongoose;

const AuthorSchema = new Schema({
  name: String,
  age: Number,
});

export const Author = mongoose.model("authors", AuthorSchema);
