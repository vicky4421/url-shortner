// imports
const shortid = require('shortid')
const URL = require('../models/url')

const handleGenerateNewShortUrl = async (req, res) => {
    const body = req.body
    if (!body.url) return res.status(400).json({ error: 'url is required!' })

    const shortID = shortid()
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
    })

    return res.json({ id: shortID })
}

const handleRedirect = async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: new Date().toString()
            }
        }
    })
    res.redirect(entry.redirectURL)
}

const handleAnalytics = async (req, res) => {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleRedirect,
    handleAnalytics
}