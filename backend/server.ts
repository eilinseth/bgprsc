import axios from "axios"
import express from "express"
import cors from "cors"

const app  = express()
app.use(cors())

app.get("/api/asn/:asn" , async (req,res) => {
    try {
        const asn =  req.params
        const data = await axios.get(`https://api.bgpview.io/asn/${asn}/prefixes`)

        res.json(data)
    }catch(err){
        res.status(500).json({error : err.message})
    }
})

const port = 5000
app.listen(port , () => {
    console.log(`App is running on http://localhost:${port}`)
})