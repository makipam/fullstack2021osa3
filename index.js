require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token("note", (req, res) => {
  if (req.method !== 'POST') {
    return '-'
  } else {
  return JSON.stringify(req.body)
  }
});

app.use(express.json())
app.use(morgan(' :method :url :status :res[content-length] - :response-time ms :note'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (req, res) => {
    const amount = persons.length
    const date = new Date()
    res.send
    (`<p>Phonebook has info for ${persons.length} people </p> <p> ${date} </p>`)
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({ 
        error: 'name or number missing' })
    }
    
    const person = new Person({
      name: body.name,
      number: body.number
    })

    /*if (persons.find(person => person.name === body.name)) {
      return response.status(409).json({
          error: 'name already exists in the phonebook'
      })
      } */
    
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})
  
const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})