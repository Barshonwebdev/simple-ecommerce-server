const express = require('express');
const cors = require('cors');
const app=express();
require('dotenv').config();
const port=process.env.PORT||5000;

//middlewares
app.use(cors());
app.use(express.json());


//mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7di2jdk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const productCollection=client.db('ecommerceDB').collection('products');

    app.get('/products',async(req,res)=>{
        const result=await productCollection.find().toArray();
        res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


//server
app.get('/',(req,res)=>{
    res.send('Running');
})

app.listen(port, ()=>{
    console.log(`running on ${port}`)
})


