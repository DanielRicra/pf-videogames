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

    socket.on('userStatus', (data) => {
      const { userId, status } = data
      const user = userStatus.find((e) => e.userId === userId)
      if (!user) {
        userStatus.push({ userId, status, id: socket.id })
        io.emit('setStatus', { userId, status: 'connected' })
      }
    })

    // Evento de desconexión
    socket.on('disconnect', () => {
      let user = connectedUsers.filter((user) => user.id !== socket.id)
      let UserStatus = userStatus.find((e) => e.id === socket.id)
      if (UserStatus) {
        console.log('lo sacooo')
        userStatus = userStatus.filter((e) => e.id !== UserStatus.id)
        console.log('🚀 ~ file: index.js:65 ~ socket.on ~ array:', userStatus)
        io.emit('userStatus', {
          userId: UserStatus.userId,
          status: 'disconnected',
        }) // Emitir evento de estado de desconexión
      }
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
