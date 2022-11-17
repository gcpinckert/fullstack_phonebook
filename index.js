require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

const app = express();
app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(morgan('tiny'));


app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people);
  })
});

// note -> this is broken until we figure out how to hook it up to DB
app.get('/info', (request, response) => {
  const template = `<p>Phonebook has info for ${persons.length} people</p><p>${String(new Date())}</p>`;
  response.send(template);
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person);
  })
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'must provide values for name and number',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
