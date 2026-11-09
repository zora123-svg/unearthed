import express from 'express'
import path from 'path' // used to manipulate file paths
import { fileURLToPath } from 'url' // converts a file URL to a file path.
import giftData from '../data/gifts.js'

const __filename = fileURLToPath(import.meta.url) // file path
const __dirname = path.dirname(__filename) // strip the filename from the file path
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json(giftData)
})

router.get('/:giftId', (req, res) =>{
    res.status(200).sendFile(path.resolve(__dirname, '../public/gift.html'))
})

export default router