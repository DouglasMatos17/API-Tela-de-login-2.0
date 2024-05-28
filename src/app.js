const express = require('express')
const app = express()
const port = 3000

// Criando rota padrão
app.get('/', (req, res) => {
    res.send('ola mundo')
})

// Escutando a porta 3000 
app.listen(port, ()=> {
    console.log(`Rodando o servidor http://localhost:${port}`)
})