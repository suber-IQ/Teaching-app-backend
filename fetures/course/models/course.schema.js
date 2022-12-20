import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Title"],
    minLength: [4, "Title must be at least 4 characters"],
    maxLength: [80, "Title can not exceed 80 characters"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Course description"],
    minLength: [20, "Description must be at least 20 characters"],
  },
  lectures: [
    {
      title: {
        type: String,
        minLength: [4, "Title must be at least 4 characters"],
        maxLength: [80, "Title can not exceed 80 characters"],
      },
      description: {
        type: String,
        minLength: [20, "Description must be at least 20 characters"],
      },
      video: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
  ],
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  subscription: {
    id: String,
    status: String,
  },
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  numOfVideos: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: [true, "Enter Course Creator Name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", courseSchema);
