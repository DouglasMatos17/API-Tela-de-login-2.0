import express from 'express'

const app = express()

// Criando rota padrão
app.get('/', (req, res) => {
    res.send('ola mundo')
})

export default app