export default function SearchBar(){
    return(
        <div className="flex justify-center">
            <form className="flex w-auto h-8 border-2 border-white-400 rounded-md opacity-82">
                
                <input placeholder="search ..." className="flex-grow px-2 outline-none bg-transparent opacity-50 caret-white text-white text-sm" />
                
                <button type="submit" className="px-3">
                    <img src="https://i.ibb.co/zX7N8qH/search-icon.png" alt="search-icon" className="h-5 w-5 filter invert opacity-80 hover:opacity-90" />
                </button>

            </form>
        </div>
    )
}