const { response } = require('express')
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://neilbouiche:${password}@cluster0.drxceqf.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose.connect(url)

Note.find({})
  .then((result) => {
    result.forEach((note) => {
      console.log(note)
    })
    mongoose.connection.close()
  })
  .then((result) => {
    console.log('connected')

    // const note1 = new Note({
    //   content: 'HTML is Easy',
    //   date: new Date(),
    //   important: true,
    // })

    // const note2 = new Note({
    //   content: 'Browser can execute only Javascript.',
    //   date: new Date(),
    //   important: true,
    // })

    // const note3 = new Note({
    //   content: 'GET and POST are the most important methods of HTTP protocol',
    //   date: new Date(),
    //   important: true,
    // })

    return Note.insertMany([note1, note2, note3])
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
