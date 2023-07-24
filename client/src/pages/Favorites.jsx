import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../redux/user/userSlice"
import { IconHeartFilled } from '@tabler/icons-react'
import useSWR from 'swr/immutable'
import { useNavigate } from "react-router-dom"
import { deleteFavorite } from '../services/favoriteService'
import { removeFromFavorites } from '../redux/user/userSlice'
import { getUserFavorites } from "../services/favoriteService"

const Favorites = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    const {
        data: userData,
        mutate
    } = useSWR(`user/${user?.id}/favorites`, getUserFavorites, {refreshInterval: 500})

    const removeFavorite = async (videogameId) => {
        try {
            await deleteFavorite(videogameId)
            dispatch(removeFromFavorites(videogameId))
            mutate()
        } catch (error) {
            throw error
        }
    }

    return (
        <div className="bg-gray-900 min-h-screen">
            {
                userData?.Favorites?.map((fav) => {
                    return (
                        <div key={fav.id} className="bg-violet-900 h-[14.2rem] w-[18.4rem] rounded-[0.5rem] m-[1rem] border border-[0.2rem]">
                            <img src={fav.videogame.image} onClick={() => navigate(`/detail/${fav.videogame.id}`)} className="px-[1rem] pt-[1rem] h-[10rem] cursor-pointer" />
                            <p className="mx-[1rem]">{fav.videogame.name}</p>
                            <button className="mx-[1rem]" onClick={() => removeFavorite(fav.id)}><IconHeartFilled className='w-full h-full hover:animate-pulse' /></button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Favorites