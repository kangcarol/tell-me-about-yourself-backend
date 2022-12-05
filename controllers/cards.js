import { Profile } from "../models/profile.js"
import { Card } from "../models/card.js"


const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const card = await Card.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { cards: card } },
      { new: true }
    )
    card.author = profile
    res.status(201).json(card)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const cards = await Card.find({})
      .populate('author')
      .sort({ createdAt: 'desc' })
    res.status(200).json(cards)
  } catch (err) {
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate('author')
      .populate('tips.author')
    res.status(200).json(card)
  } catch (err) {
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(card)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.cards.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(card)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createTip = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const card = await Card.findById(req.params.id)
    card.tips.push(req.body)
    await card.save()

    // Find the newly created tip:
    const newTip = card.tips[card.tips.length - 1]

    // Temporarily append profile object to newTip.author:
    const profile = await Profile.findById(req.user.profile)
    newTip.author = profile

		// Respond with the newTip:
    res.status(201).json(newTip)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
	create,
	index,
	show,
	update,
	deleteCard as delete,
  createTip,
}
