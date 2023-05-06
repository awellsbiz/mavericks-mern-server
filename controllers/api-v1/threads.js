const express = require('express')
const router = express.Router();
const db = require('../../models')

// GET threads related to a particular movie
router.get("/movie/:id", async (req, res) => {
    try {
        const findThreads = await db.Threads.find({ tmdbId: req.params.id })
        res.json({ findThreads })
    } catch (error) {
        console.log(error)
    }
})

// POST a new thread
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

// PUT (update) an existing thread
router.put("/:id", async (req, res) => {
    try {
        const newThread = await db.Threads.findByIdAndUpdate(
            { _id: req.params.id },
            {
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

// DELETE a thread
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

// POST a comment on a thread
router.post("/comments", async (req, res) => {
    try {
        const newComment = await db.Comments.create({
            threadId: req.body.threadId,
            userId: req.body.userId,
            userName: req.body.userName,
            commentBody: req.body.commentBody
        })
        console.log(req.body)
        await db.Threads.findByIdAndUpdate(
            { _id: req.body.threadId },
            { $push: { comments: newComment } }
        )
        res.json({ "msg": "Comment Posted" })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router