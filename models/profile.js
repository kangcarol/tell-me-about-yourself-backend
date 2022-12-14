import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  about: String,
  linkedin: String,
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card'}],
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Card'}]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
