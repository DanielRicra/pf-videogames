module.exports = (io) => {
  let connectedUsers = []
  let userStatus = []

  // Evento de conexión de Socket.IO
  io.on('connection', (socket) => {
    console.log('Usuario conectado')

    // Evento para unirse al chat
    socket.on('join', (userId) => {
      if (userId !== null) {
        const user = connectedUsers.find((e) => e.userId === userId)
        if (!user) {
          connectedUsers.push({
            id: socket.id,
            userId: userId,
          })

          io.emit('userList', getUserList(userId))
        }
      }
    })

    // Evento para enviar un mensaje
    socket.on('message', (data) => {
      const { from, to, message } = data
      const recipientSocket = getSocketId(to)

      if (recipientSocket) {
        io.to(recipientSocket).emit('message', { from, message })
      }
    })

    socket.on('userStatus', (data) => {
      const { userId, connected } = data
      if (connected) {
        const user = userStatus.find((e) => e.userId === userId)
        if (!user) {
          userStatus.push({ userId, connected, id: socket.id })
          io.emit('setStatus', userStatus)
        } else {
          userStatus.forEach((e, index) => {
            if (e.userId === userId) {
              e.connected = true
              e.id = socket.id
            }
          })
          io.emit('setStatus', userStatus)
        }
      }
    })

    // Evento de desconexión
    socket.on('disconnect', () => {
      let user = connectedUsers.filter((user) => user.id !== socket.id)
      console.log('userStatus:', userStatus)
      userStatus.forEach((e) => {
        if (e.id === socket.id) {
          e.connected = false
        }
      })
      io.emit('setStatus', userStatus) // Emitir evento de estado de desconexión
      if (user) {
        connectedUsers = connectedUsers.filter((user) => user.id !== socket.id)
        console.log('Usuario desconectado')
      }
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
