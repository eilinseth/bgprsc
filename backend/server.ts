import axios from "axios"
import express,{Request,Response} from "express"
import cors from "cors"


const app  = express()
app.use(cors())

app.get("/api/asn/:asn" , async (req:Request,res:Response) => {
    try {
        const {asn} =  req.params
        const response = await axios.get(`https://api.bgpview.io/asn/${asn}/prefixes`)
       
        if (
          !response.data.data ||
          (response.data.data.ipv4_prefixes.length === 0 &&
          response.data.data.ipv6_prefixes.length === 0)
        ) {
          return res.status(404).json({ message: "ASN Number not found" });
        }

        res.json(response.data)
    }catch(err){
       if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
      }
    } 
})

const port = 5000
app.listen(port , () => {
    console.log(`App is running on http://localhost:${port}`)
})