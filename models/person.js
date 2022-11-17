const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);

// mongoose
//   .connect(url)
//   .then((result) => {
//     if (name && number) {
//       const person = new Person({
//         name,
//         number,
//       });

//       return person.save();
//     } else {
//       return Person.find({});
//     }
//   })
//   .then((results) => {
//     if (Array.isArray(results)) {
//       console.log('phonebook:');
//       results.forEach(result => {
//         console.log(`${result.name} ${result.number}`);
//       });
//     } else {
//       console.log(`added ${results.name} number ${results.number} to phonebook`);
//     }
//     return mongoose.connection.close();
//   })
//   .catch(error => console.log(error));