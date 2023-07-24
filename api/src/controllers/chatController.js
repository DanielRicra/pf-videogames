const { Chat, Friend } = require('../db') // Importa los modelos necesarios

const getChat = async (friendShipId) => {
  try {
    const foudChat = await Chat.findOrCreate({
      where: {
        friendShipId: friendShipId,
      },
    })
    return foudChat
  } catch (error) {
    throw new Error(error)
  }
}
const addMessages = async ({ message, friendShipId }) => {
  try {
    const foundChatUser = await Chat.findOne({
      where: {
        friendShipId: friendShipId,
      },
    })
    foundChatUser.message = [...foundChatUser.message, message]
    await foundChatUser.save()

    const foundFriend = await Friend.findByPk(friendShipId)
    const foundFriendship = await Friend.findOne({
      where: {
        userId: foundFriend.friendId,
        friendId: foundFriend.userId,
      },
    })

    const foundChatFriend = await Chat.findOne({
      where: {
        friendShipId: foundFriendship.id,
      },
    })
    if (message) {
      foundChatFriend.message = [...foundChatFriend?.message, message]
      await foundChatFriend.save()
    }

    return foundChatUser
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { getChat, addMessages }
