const express = require("express");
const app = express();
const pool = require("./db");

// in terminal use " node index " or " npx nodemon index "

app.use(express.json()); // => require body

//routes
//shows all entries in table
app.get("/champion", async(req,res) =>{
    try {
        const allChamp = await pool.query(
            "SELECT * FROM champion" 
        );
        res.json(allChamp.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//retrieves a entry by id

app.get("/champion/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const champ = await pool.query("SELECT * FROM champion WHERE id = $1", 
        [id]);

        res.json(champ.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});
//creates an entry
app.post("/champion", async(req,res) =>{
    try{
        const { name, damage } = req.body;
        //console.log(name);
        const newChamp = await pool.query(
            "INSERT INTO champion (name, damage) VALUES ($1, $2)  RETURNING *", [ name, damage]
        );
        res.json(newChamp.rows[0]);
    }catch (err){
        console.error(err.message);
    }
});

//updates/changes an entry
app.put("/champion/:id", async(req,res) => {
    try {
        const {id} = req.params; //WHERE
        const {name, damage} = req.body; //SET

        const updateChamp = await pool.query(
            "UPDATE champion SET name = $1, damage = $2 WHERE id = $3", [name,damage, id]
        );

        res.json("champion was updated");
    } catch (err) {
        console.log(err.message);
    }
});

//deletes an entry by id
app.delete("/champion/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM champion WHERE id = $1", [id]
        );

        res.json("champion entry was deleted");
    } catch (err) {
        console.log(err.message);
    }
});

//listens on the console
app.listen(5000, () => {
    console.log("server is listening on port 5000");
});


/* example table command 

CREATE TABLE CHAMPION(
   ID SERIAL PRIMARY KEY,
   NAME           TEXT    NOT NULL,
   DAMAGE         INT     NOT NULL,
   description    VARCHAR(255)
);

*/