const { Chat, Friend } = require('../db') // Importa los modelos necesarios

const getChat = async (friendShipId) => {
  try {
    const foundChat = await Chat.findOrCreate({
      where: {
        friendShipId: friendShipId,
      },
    });
    return foundChat;
  } catch (error) {
    throw new Error(error);
  }
};

const addMessages = async ({ message, friendShipId }) => {
  try {
    const foundChatUser = await Chat.findOne({
      where: {
        friendShipId: friendShipId,
      },
    });

    // Make sure foundChatUser.message is an array
    const messagesArray = Array.isArray(foundChatUser.message)
      ? foundChatUser.message
      : [foundChatUser.message];

    foundChatUser.message = [...messagesArray, message];
    await foundChatUser.save();

    const foundFriend = await Friend.findByPk(friendShipId);
    const foundFriendship = await Friend.findOne({
      where: {
        userId: foundFriend.friendId,
        friendId: foundFriend.userId,
      },
    });

    const foundChatFriend = await Chat.findOne({
      where: {
        friendShipId: foundFriendship.id,
      },
    });

    if (message) {
      // Make sure foundChatFriend.message is an array
      const friendMessagesArray = Array.isArray(foundChatFriend.message)
        ? foundChatFriend.message
        : [foundChatFriend.message];

      foundChatFriend.message = [...friendMessagesArray, message];
      await foundChatFriend.save();
    }

    return foundChatUser;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getChat, addMessages };