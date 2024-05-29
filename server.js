import app from '../src/app.js'

const port = 3000

// Escutando a porta 3000 
app.listen(port, ()=> {
    console.log(`Rodando o servidor http://localhost:${port}`)
})