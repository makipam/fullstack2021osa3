const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

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



let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-1234567"
  },
  {
    id: 2,
    name: "Artsi Hellasss",
    number: "040-123123123"
  },
  {
    id: 3,
    name: "Artoris Hellas",
    number: "040-123321987"
  }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (req, res) => {
    const amount = persons.length
    const date = new Date()
    res.send
    (`<p>Phonebook has info for ${persons.length} people </p> <p> ${date} </p>`)
  })

  const generateId = () => {
    const max = 1000
    return Math.floor(Math.random() * max)
  }

  app.post('/api/persons', (request, response) => {
    const body = {...request.body}
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(409).json({
            error: 'name already exists in the phonebook'
        })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})