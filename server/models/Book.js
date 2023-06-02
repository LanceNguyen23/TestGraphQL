import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

export const Book = mongoose.model("books", BookSchema);
