// Este componente es para traer la info del usuario actual.

import { useAuth0 } from "@auth0/auth0-react"
import JSONPretty from 'react-json-pretty';
import { toTitleCase } from "../utils/helpers";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0()

    return (
        isAuthenticated && (
            <div className="flex font-serif bg-black bg-opacity-50 border-[0.2rem] rounded-[2rem] my-[5rem] m-[4rem] w-[55rem] h-[21.5rem] border-violet-500">
                <img className="h-[11rem] m-[5rem] border-[rem] rounded-[1rem]" src={user.picture} alt={user.name} />
                <div className="flex flex-col">
                    <h2 className="mx-[1rem] font-serif text-[3rem] underline my-[3rem]">{toTitleCase(user.given_name)} {toTitleCase(user.family_name)}</h2>
                    <h2 className="mx-[1rem] text-[1.5rem]">Nickname: {user.nickname}</h2>
                    <h2 className="mx-[1rem] text-[1.5rem]">E-mail: {user.email}</h2>
                </div>
            </div>
        )
    )
}

export default Profile