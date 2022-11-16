const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://gcpinckert:${password}@cluster0.n17jooj.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

mongoose
  .connect(url)
  .then((result) => {
    if (name && number) {
      const person = new Person({
        name,
        number,
      });

      return person.save();
    } else {
      return Person.find({});
    }
  })
  .then((results) => {
    if (Array.isArray(results)) {
      console.log('phonebook:');
      results.forEach(result => {
        console.log(`${result.name} ${result.number}`);
      });
    } else {
      console.log(`added ${results.name} number ${results.number} to phonebook`);
    }
    return mongoose.connection.close();
  })
  .catch(error => console.log(error));