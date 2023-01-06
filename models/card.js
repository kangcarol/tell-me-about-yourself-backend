import mongoose from 'mongoose'

const Schema = mongoose.Schema

// const tipSchema = new Schema(
//   {
//     text: {
//       type: String,
//       required: true
//     },
//     author: { type: Schema.Types.ObjectId, ref: 'Profile' }
//   },
//   { timestamps: true }
// )

const cardSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: false,
    },
    hint: {
      type: String,
      required: false,
    },
    source: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Behavioral', 'Computer Science', 'Javascript', 'Frontend', 'React', 'Styling', 'Python', 'Databases', 'Backend', 'Other'],
    },
    // tips: [tipSchema],
    author: { type: Schema.Types.ObjectId, ref: 'Profile' 
    },
  },
  { timestamps: true }
)

const Card = mongoose.model('Card', cardSchema)

export { Card }