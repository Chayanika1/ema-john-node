const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT||5000
const { MongoClient, ServerApiVersion } = require('mongodb');
//middle ware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tzmrg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    async function run(){
        try{
            await client.connect();
            const serviceCollection = client.db('emajohn').collection('services');
            app.get('/service',async(req,res)=>{
                const query ={};
                const cursor = serviceCollection.find(query);
                const service = await cursor.toArray();
                res.send(service);
            })
        }
        finally {
            //await client.close();
          }

    }
    
    run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running ema-john server');

    
    


    
})
app.listen(port, () => {
    console.log('listening to port');
})