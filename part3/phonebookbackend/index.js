const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(express.json())
app.use(morgan(':req[header]'))


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
app.get("/api/persons", (request, response) => {
    response.json(persons)
})
app.get('/info', (request, response) => {
    const now = new Date()
    response.send(
        `<p> Phonebook has info for ${persons.length} people</p><p>${now}</p>`)
})
app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find((p) => p.id === id)
    response.json(person)
})
app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    if (!persons.find((p) => p.id === id)) {
        response.status(404).end()
    }
    persons = persons.filter((p) => p.id !== id)
    response.status(204).end()
})
app.post("/api/persons", (request, response) => {
    const id = Math.floor(Math.random() * 10000)
    const p = request.body

    if (p.name || p.number) {
        response.json({ error: "name or number is null" })
        return
    }
    if (persons.find((e) => e.name === p.name)) {
        response.json({ error: 'name must unique' })
        return
    }
    p.id = id
    persons = persons.concat(p)
    response.json(p)
})

// const unknownEndpoint = (request, response) =>{
//     response.status(404).send({error:'unknown endpoint'})
// }
// app.use(unknownEndpoint)
const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})