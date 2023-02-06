const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const createTable = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`
const createPerson = `INSERT INTO people(id, name) values(1, 'Lopes')`
connection.query(createTable, function(error, _) {
    if (error) throw error
    console.log("Table created")
  })
  connection.query(createPerson, function(error, _) {
    if (error) console.log("User already exists")
    else console.log("User inserted")
  })
connection.end()


app.get('/', (_, res) => {
    const connection = mysql.createConnection(config)
    const sql = `SELECT * FROM people`
    connection.query(sql, (error, people) => {
        if (error) {
          res.send('<h1>Full Cycle Rocks!</h1><h3>No people to show</h3>')
        }else{
            res.send(`<h1>Full Cycle Rocks!</h1><ul>${people.map(person => `<li>${person.id} - ${person.name}</li>`)}</ul>`)
        }
      })
    
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})