const friendRouter = require('express').Router()
const {
  getFriends,
  addFriend,
  rejectFriend,
  acceptFriend,
  getPendingFriendRequests
} = require('../controllers/friendController')

friendRouter.post('/', async (req, res) => {
  
  const { userEmail, friendEmail, action } =req.query
  if(userEmail && friendEmail && action === 'add'){
    try{
        const friend = await addFriend({ userEmail, friendEmail })
        res.status(200).json(friend)
    }catch (error){
        res.status(404).send(error.message)
    }
  }
  if(userEmail && friendEmail && action === 'reject'){
    try{
        const friend = await rejectFriend({ userEmail, friendEmail })
        res.status(200).json(friend)
    }catch (error){
        res.status(404).send(error.message)
    }
  }
  if(userEmail && friendEmail && action === 'accept'){
    try{
        const friend = await acceptFriend({ userEmail, friendEmail })
        res.status(200).json(friend)
    }catch (error){
        res.status(404).send(error.message)
    }
  }
})

friendRouter.get('/', async (req, res) => {
    const { userEmail, limit, page } =req.query
    try {
        const friends = await getFriends({ userEmail, limit, page })
    
        res.status(200).json(friends)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

friendRouter.get('/pending', async (req, res) => {
  const { userEmail } = req.query;
  try {
    const pendingFriendRequests = await getPendingFriendRequests({ userEmail });
    res.status(200).json(pendingFriendRequests);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = friendRouter