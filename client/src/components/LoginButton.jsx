import { useAuth0 } from "@auth0/auth0-react"

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()

    return (
        <>
            <button className="flex w-[8rem] text-[1.3rem] font-semibold justify-center bg-blue-600 border-blue-700 hover:bg-blue-700 hover:border-blue-600 transition duration-200 ease-in border-[0.2rem] rounded-[0.5rem] mx-[44rem] my-[3rem]" onClick={() => loginWithRedirect()}>Log in</button>
        </>
    )
}

export default LoginButton
