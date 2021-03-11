const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {Pool} = require('pg'); 
const pool = new Pool({
    user:'jeffrydelapena',
    password:'',
    host: 'localhost',
    port: 5432,
    database: "coffee"
});
const app =express();
const PORT = process.env.PORT || 8000; 

//middleware 
app.use(morgan('combined'));
app.use(express.json());
app.use(cors()); 
app.use(express.static('public'))
//routes
//create
app.post('/api/purchase', async(req, res)=>{
    try{
        let newPur = req.body;
        console.log(newPur)
        let result = await pool.query(`INSERT INTO purchase (price, ownerId) VALUES ('${newPur.price}', '${newPur.ownerId}')`);
        res.status(200).send('worked');
    }catch(err){ 
        console.error(err);
        res.status(500).send(`Error Encountered: ${err}`)
    }
})
//readall
app.get("/api/purchase", async(req, res)=>{
    try{
        let result = await pool.query(`SELECT * FROM purchase`)
        console.log(result)
       res.status(200).json(result.rows)
    }catch(err){ 
        console.error(err);
        res.status(500).send(`Error Encountered: ${err}`);
    }
})
//read specific
app.get("/api/purchase/:id", async(req, res)=>{
    try{
        const {id}= req.params;
        console.log(`${id}`)
        let result = await pool.query(`SELECT * FROM purchase WHERE purchaseId = ${id}`)
        console.log(result)
       res.status(200).send('worked for read spec purch')
    }catch(err){ 
        console.error(err);
        res.status(500).send(`Error Encountered: ${err}`);
    }
})
//update 
app.put("/api/purchase/:id", async(req,res)=>{
    try{
        console.log(req.params)
        const id = req.params.id;
        const purchUpdate = req.body;
        console.log(id)
        //console.log(purchUpdate)
        let result = await pool.query(`UPDATE purchase SET price = '${purchUpdate.price}' WHERE purchaseId = ${id}`);
        console.log(result)
       res.status(200).send('worked for update spec purch')
    }catch(err){ 
        console.error(err);
        res.status(500).send(`Error Encountered: ${err}`);
    }
})

//delete

app.delete("/api/purchase/:id", async(req, res)=>{
    try{
        const {id}= req.params;
        let result = await pool.query(`DELETE FROM purchase WHERE purchaseId = ${id}`)
        console.log(result)
       res.status(200).send('worked for DELETE')
    }catch(err){ 
        console.error(err);
        res.status(500).send(`Error Encountered: ${err}`);
    }
})



//error
app.use((req, res)=>{
    res.status(404).send('Page not found jeff')
})
//listen 
app.listen(PORT, ()=>{console.log('working')})


// app.post("/api/purchase" async(req, res)=>{
//     try{

//     }catch(err){ 
//         console.error(err);
//         res.status(500).send(`Error Encountered: ${err}`);
//     }
// })

// pic coffee shop 
// two input boxes (price ownerId)
// button send 
// Headersfour tabs (crude)