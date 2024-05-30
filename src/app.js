import express from 'express'

const app = express()

// Indicar para o express ler body como Json
app.use(express.json())

// Mock 
const selecoes = [
    {id: 1, selecao: 'Brasil', grupo: 'G' },
    {id: 2, selecao: 'Suíça', grupo: 'G' },
    {id: 3, selecao: 'Camarões', grupo: 'G' },
    {id: 4, selecao: 'Sérvia', grupo: 'G' }
]

function buscarSelecaoPorID(id) {
    return selecoes.filter( selecao => selecao.id == id)
}

// Criando rota padrão
app.get('/', (req, res) => {
    res.send('ola mundo')
})

// Primeiro end-point
app.get('/selecoes', (req, res) => {
    res.status(200).send(selecoes)
})

// Retorna objeto por ID
app.get('/selecoes/:id', (req, res) => {
    res.json(buscarSelecaoPorID(req.params.id))
})

// Primeiro post, esta cadastrando uma nova seleção no ultimo indice do array selecoes.
app.post('/selecoes', (req, res) => {
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso!')
})




export default app