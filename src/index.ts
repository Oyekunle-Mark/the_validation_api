import server from './server'

const { PORT } = process.env

function onListening() {
  console.log(`Listening on ${PORT}`)
}

server.listen(PORT, onListening)
