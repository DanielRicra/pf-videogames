const { Friend, User }= require('../db')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')

const getFriends = async ({ userEmail, page = 1, limit = 10 }) => {
  if (isNaN(page) || isNaN(limit)) {
      throw new Error('Page or limit must be numbers')
  }

  try {

      let user = await User.findOne({
        where: { email: userEmail }
      })
      if(!user){ throw new Error (`No se encontro un user con email: ${userEmail}`)}

      let foundedFriends = await Friend.findAll({
          where: { userId: user.id, status: 'Accepted' },
          offset: (page - 1) * limit,
          limit,
          order: [['id', 'ASC']],
      })

      const totalFriends = await Friend.count({
          distinct: true,
          col: 'id',
          where: { userId: user.id, status: 'Accepted' },
          order: [['id', 'ASC']],
      });

        // Obtener los datos del usuario correspondiente a cada amigo
        const populatedFriends = await Promise.all(
            foundedFriends.map(async (friend) => {
              const friendUser = await User.findOne({ where: { id: friend.friendId } });
              return {
                ...friend.toJSON(),
                friendUser
              };
            })
        );

      const result = {
          totalresults: totalFriends,
          nextPage: null,
          prevPage: null,
          results: populatedFriends
        }


      const currentPage = parseInt(page)
      const totalPages = Math.ceil(totalFriends / parseInt(limit));

      if (currentPage < totalPages) {
          result.nextPage = currentPage + 1;
      }

      if (currentPage > 1) {
          result.prevPage = currentPage - 1;
      }

      return result
  } catch (error) {
      return { error: error.message }
  }
}

const addFriend = async({ userEmail, friendEmail }) =>{
    try{

        const friend1 = await User.findOne({
            where:{email:userEmail}
        })
        if(!friend1){ throw new Error (`No se encontro un usuario con email: ${userEmail}`)}

        const friend2 = await User.findOne({
            where:{email:friendEmail}
        })
        if(!friend2){ throw new Error (`No se encontro un usuario con email: ${friendEmail}`)}

        const friendship = await Friend.findOrCreate({
            where:{
            userId:friend1.id,
            friendId:friend2.id
            }
        })
        const inverseFriendship = await Friend.findOrCreate({
            where:{
            userId:friend2.id,
            friendId:friend1.id
            }
        })

        return friendship
    } catch(error){
        return { error: error.message }
    }
}

const acceptFriend = async({ userEmail, friendEmail }) =>{
    try{

        const friend1 = await User.findOne({
            where:{email:userEmail}
        })
        if(!friend1){ throw new Error (`No se encontro un usuario con email: ${userEmail}`)}

        const friend2 = await User.findOne({
            where:{email:friendEmail}
        })
        if(!friend2){ throw new Error (`No se encontro un usuario con email: ${friendEmail}`)}

        const friendship = await Friend.findOne({
            where:{
            userId:friend1.id,
            friendId:friend2.id
            }
        })
        friendship.status = 'Accepted'
        await friendship.save()

        const inverseFriendship = await Friend.findOne({
            where:{
            userId:friend2.id,
            friendId:friend1.id
            }
        })
        inverseFriendship.status = 'Accepted'
        await inverseFriendship.save()

        return friendship
    } catch(error){
        return { error: error.message }
    }
}

const rejectFriend = async({ userEmail, friendEmail }) =>{
    try{

        const friend1 = await User.findOne({
            where:{email:userEmail}
        })
        if(!friend1){ throw new Error (`No se encontro un usuario con email: ${userEmail}`)}

        const friend2 = await User.findOne({
            where:{email:friendEmail}
        })
        if(!friend2){ throw new Error (`No se encontro un usuario con email: ${friendEmail}`)}

        const friendship = await Friend.findOne({
            userId:friend1.id,
            friendId:friend2.id
        })
        friendship.status = 'Rejected'
        await friendship.save()
        
        const inverseFriendship = await Friend.findOne({
            userId:friend2.id,
            friendId:friend1.id
        })
        inverseFriendship.status = 'Rejected'
        await inverseFriendship.save()

        return friendship
    } catch(error){
        return { error: error.message }
    }
}

module.exports = {
    getFriends,
    addFriend,
    acceptFriend,
    rejectFriend
};