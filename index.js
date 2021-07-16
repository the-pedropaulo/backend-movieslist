const express = require("express");
require('dotenv').config()
const app = express();
const mysql = require('mysql')
const cors = require('cors')
//app.use(express.static('estilos'))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

app.get("/api/get", (req, res) => {
    const sqlSelect = "Select * FROM movie_reviews;"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

app.post('/api/insert', (req,res) => {
    
    const name = req.body.movieName;
    const review = req.body.movieReview
    
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?);"
    db.query(sqlInsert, [name, review], (err, result) => {
        console.log(result)
    })
})

app.delete('/api/delete/:movieId', (req,res) => {
    
    const id = req.params.movieId;
    
    const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?;"
    db.query(sqlDelete, id, (err, result) => {
        console.log(result)
    })
})

app.put('/api/update/:movieId', (req,res) => {
    
    const review = req.body.movieReview
    const id = req.params.movieId;
    
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id = ?;"
    db.query(sqlUpdate, [review, id], (err, result) => {
        console.log(result)
    })
})


app.listen(3001, () => {
    console.log("Servidor Rodando");
});