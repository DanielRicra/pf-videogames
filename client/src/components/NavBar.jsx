import SearchBar from "./searchBar"
export default function NavBar(){
    return(
        <nav className = 'h-28 flex items-center'>
            
            <div className='w-1/3 flex justify-center'>
                <div className='flex w-1/1.3 ml-36'> 
                    <SearchBar/>
                </div>
            </div>

            {/* logo */}
            <div className='w-1/3 flex justify-center'>
                <img src="https://i.ibb.co/n7sdW1S/pseudologo.png" alt="pseudologo" border="0" className='h-20 opacity-90 hover:opacity-80'/>
            </div>
            
            {/* seccion de iconos (favoritos, sign-in, carrito) */}
            <div className="flex w-1/3 justify-start">
                <img src="https://i.ibb.co/NLMstPJ/favorites-icon.png" alt="favorites-icon" border="0" className="h-6 w-6 filter invert opacity-90 hover:opacity-75 ml-32"/>
                <img src="https://i.ibb.co/NjQSCSL/user-icon.png" alt="user-icon" border="0" className="h-6 w-6 filter invert ml-10 opacity-90 hover:opacity-75"/>
                <img src="https://i.ibb.co/VYQpfSY/shopping-cart-icon.png" alt="shopping-cart-icon" border="0" className="h-6 w-6 filter invert ml-10 opacity-90 hover:opacity-75"/>
            </div>
            
        </nav>
    )
}