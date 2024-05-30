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

// Retorna o objeto por id
function buscarSelecaoPorId(id) {
    return selecoes.filter( selecao => selecao.id == id)
}

// Pegar posição ou index do elemento no array por id
function buscaIndexSelecao(id){
    return selecoes.findIndex(selecao => selecao.id == id)
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
    res.json(buscarSelecaoPorId(req.params.id))
})

// Primeiro post, esta cadastrando uma nova seleção no ultimo indice do array selecoes.
app.post('/selecoes', (req, res) => {
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso!')
})

app.delete('/selecoes/:id', (req, res) => {
    let index = buscaIndexSelecao(req.params.id)
    selecoes.splice(index, 1)
    res.send(`Seleção com id ${req.params.id} excluida com sucesso!`)
})




export default app