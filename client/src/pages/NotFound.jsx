import crash from "../assets/crash.png"
import { NavLink } from "react-router-dom"

const NotFound = () => {
  return (
    <>
      <div className="wrapper flex items-center justify-center my-[7rem]">
        <div className="text-[3rem] font-mono font-semibold mx-[5rem]">
          Oops! this page doesn't exist.
        </div>
        <img src={crash} className="h-[15rem]" />
      </div>

      <div className="flex w-[8rem] text-[1.3rem] font-semibold justify-center bg-blue-600 border-blue-700 hover:bg-blue-700 hover:border-blue-600 transition duration-200 ease-in border-[0.2rem] rounded-[0.5rem] mx-[44rem] my-[3rem]">
        <NavLink to="/">
          Main menu
        </NavLink>
      </div>
    </>
  )
}
export default NotFound
