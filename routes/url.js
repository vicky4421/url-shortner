const express = require('express')
const { handleGenerateNewShortUrl, handleRedirect, handleAnalytics } = require('../controllers/url')

const router = express.Router()

router.post('/', handleGenerateNewShortUrl)
router.get('/analytics/:shortId', handleAnalytics)
router.route('/:shortId')
    .get(handleRedirect)

module.exports = router