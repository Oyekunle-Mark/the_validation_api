import server from './server'

const PORT = 7201

function onListening() {
  console.log(`Listening on ${PORT}`)
}

server.listen(PORT, onListening)
