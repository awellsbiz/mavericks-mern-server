const express = require('express')
const router = express.Router();
const db = require('../../models')

router.get("/movie/:id", async (req, res) => {
    try {
        const findThreads = await db.Threads.find({ tmdbId: req.params.id })
        res.json({ findThreads })
    } catch (error) {
        console.log(error)
    }
})

router.post("/", async (req, res) => {
    try {
        const newThread = await db.Threads.create({
            tmdbId: req.body.tmdbId,
            userId: req.body.userId,
            userName: req.body.userName,
            threadTitle: req.body.threadTitle,
            threadBody: req.body.threadBody,
            comments: req.body.comments,
        })
        res.json({ "msg": "New thread created" })
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const findThread = await db.Threads.findByIdAndRemove({
            _id: req.params.id
        })
        findThread.save
        res.json({ "msg": "Thread deleted" })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router