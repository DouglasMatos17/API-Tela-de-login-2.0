import express from 'express'

const app = express()

// Mock 
const selecoes = [
    {id: 1, selecao: 'Brasil', grupo: 'G' },
    {id: 2, selecao: 'Suíça', grupo: 'G' },
    {id: 3, selecao: 'Sérvia', grupo: 'G' },
    {id: 4, selecao: 'Camarões', grupo: 'G' },
]

// Criando rota padrão
app.get('/', (req, res) => {
    res.send('ola mundo')
})

// Primeiro end-point
app.get('/selecoes', (req, res) => {
    res.status(200).send(selecoes)
})

// Primeiro post, esta cadastrando uma nova seleção no ultimo indice do array selecoes.
app.post('/selecoes', (req, res) => {
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso!')
})




export default app