const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const PhoneBook = require('./models/phonebook')

const app = express()


app.use(cors())
app.use(express.json())
app.use(morgan(':req[header]'))



app.get("/api/persons", (request, response) => {
    PhoneBook.find({}).then((result) => {
        response.json(result)
    }).catch((error) => next(error))
})
app.get('/info', (request, response) => {
    const now = new Date()
    PhoneBook.find({}).then((result) => {
        response.send(
            `<p> Phonebook has info for ${result.length} people</p><p>${now}</p>`)
    }).catch((error) => next(error))

})
app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    PhoneBook.findById(id).then((result) => {
        if (request) {
            response.json(result)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))

})
app.delete("/api/persons/:id", (request, response) => {
    PhoneBook.findByIdAndRemove(request.params.id).then((result) => {
        console.log(result)
        response.status(204).end
    }).catch(error => next(error))
})
app.post("/api/persons", (request, response) => {
    const p = request.body
    if (!(p.name || p.number)) {
        response.json({ error: "name or number is null" })
        return
    }
    const phone = new PhoneBook({
        name: p.name,
        number: p.number
    })
    phone.save().then(savedPhoneBook => {
        response.json(savedPhoneBook)
    }).catch(error => next(error))
})
app.put("/api/persons/:id", (request, response) => {
    PhoneBook.findByIdAndUpdate(request.params.id, request.body, { new: true }).then((result) => {
        if (result) {
            response.json(result)
        } else {
            response.status(404).end
        }
    }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}
// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})