import mongoose from 'mongoose'

const Schema = mongoose.Schema

const tipSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: { type: Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const cardSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Behavioral', 'Computer Science', 'Javascript', 'Front End', 'React', 'Styling', 'Python', 'Databases', 'SQL', 'Other'],
    },
    tips: [tipSchema],
    author: { type: Schema.Types.ObjectId, ref: 'Profile' 
    },
  },
  { timestamps: true }
)

const Card = mongoose.model('Card', cardSchema)

export { Card }