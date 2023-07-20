module.exports = (io) => {
  let connectedUsers = []

  // Evento de conexión de Socket.IO
  io.on('connection', (socket) => {
    console.log('Usuario conectado')

    // Evento para unirse al chat
    socket.on('join', (userId) => {
      console.log('🚀 ~ file: index.js:10 ~ socket.on ~ userId:', userId)
      connectedUsers.push({
        id: socket.id,
        userId: userId ? userId : '123456',
      })
      io.emit('userList', getUserList(userId))
      console.log('🚀 ~ file: index.js:3 ~ connectedUsers:', connectedUsers)
    })

    // Evento para enviar un mensaje
    socket.on('message', (data) => {
      const { from, to, message } = data
      const recipientSocket = getSocketId(to)
      if (recipientSocket) {
        io.to(recipientSocket).emit('message', { from, message })
      }
    })

    // Evento de desconexión
    socket.on('disconnect', () => {
      connectedUsers = connectedUsers.filter((user) => user.id !== socket.id)
      console.log('Usuario desconectado')
    })

    // Obtener la lista de amigos de un usuario
    function getUserList(userId) {
      return connectedUsers
        .filter((user) => user.userId === userId)
        .map((user) => user.userId)
    }

    // Obtener el socket ID de un usuario amigo
    function getSocketId(userId) {
      const user = connectedUsers.find((user) => user.userId === userId)
      return user ? user.id : null
    }
  })
}
