import { useAuth0 } from "@auth0/auth0-react"

const LogoutButton = () => {

    const { logout } = useAuth0()

    return (
        <>
            <button className="flex w-[4rem] text-[0.8rem] font-semibold justify-center bg-purple-600 border-purple-700 hover:bg-purple-700 hover:border-purple-600 transition duration-200 ease-in border-[0.2rem] rounded-[0.5rem] mx-[88rem] my-[-5rem]" onClick={() => logout()}>Log out</button>
        </>
    )
}

export default LogoutButton