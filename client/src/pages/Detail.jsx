import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IconHeart } from '@tabler/icons-react';
import { IconShoppingCartPlus } from '@tabler/icons-react';
import Footer from '../components/Footer'
// import { fetchVideogame } from "../redux/actions/videoGamesAction";

import { Loading } from "../components";
// import del componente NavBar

// import de las actions getDetail, clearDetail

const Detail = () => {
  // const { id } = useParams();
  // const videogame = useSelector(state => state.detail)
  // const dispatch = useDispatch();
  // const navigate = useNavigate();


  // const [currentId, setCurrentId] = useState(id);
  // const [loading, setLoading] = useState(true); // para el componente Loading si es que vamos a usar.


  //  useEffect(() => {
  //   setLoading(true);
  //   dispatch(getDetail(currentId)).then(() => {
  //     setLoading(false);
  //   });
  //   return () => {
  //     dispatch(clearDetail());
  //   };
  //  }, [dispatch, currentId]);


  // if (loading) {
  //    return <Loading />;
  //  }

  return (
    <>
      {/* <div class="tailwind (container)">

          <img class="" src={videogame.img} alt={videogame.name}/>
          // fav button
          // buy button

          <div class="bg-gray-300">
            <div class="text-6xl font-serif text-white" > {videogame.name} </div>
            <div class="text-3xl font-serif text-violet-600"> {videogame.description} </div>
            <div class="text-6xl font-serif text-violet-600"> {videogame.genres} </div>
            <div class="text-6xl font-serif text-violet-600"> {videogame.released} </div>
          <div/>

      </div> */}
      <div className="wrapper">

        <div className="flex">

          <div className="container1">
            <img className="mx-[5rem] my-[5rem]" src="https://cdn.akamai.steamstatic.com/steam/apps/1593500/capsule_616x353.jpg?t=1650554420" alt="{videogame.name}" title="{videogame.name}" />

            <div className="flex justify-between px-[21rem]">
              <button className="h-[4rem] mx-[-15.5rem] my-[-4rem]" onClick={() => navigate(`/favorites`)}> <IconHeart className="w-full h-full"/> </button>
              <button className="h-[4rem] mx-[7rem] my-[-4rem]" onClick={() => navigate(`/cart`)}> <IconShoppingCartPlus className="w-full h-full" /> </button>
            </div>
          </div>

          <div className="container2 bg-violet-900 p-10 w-[40rem] border-4 border-violet-700 rounded-2xl mx-[5rem] my-[5rem]">
            <div className="text-6xl font-serif text-white text-center">
              Name
            </div>
            <div className="text-1xl font-serif text-white mx-[2rem] my-[2rem]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem possimus reprehenderit recusandae, incidunt delectus quasi, ipsum reiciendis quaerat optio aspernatur commodi harum odit? Culpa quas officiis repellendus. Tempora, porro officiis.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptate in quam dolorem sed qui reprehenderit praesentium amet saepe aperiam, sunt quaerat ut, rerum quisquam nulla atque! In, vel soluta.
            </div>

            <div className="container flex">
              <div className="text-2xl font-serif text-white mx-[3rem]">
                Genres:
              </div>
              <div className="text-2xl font-serif text-white mx-[13rem]">
                Released:
              </div>
            </div>
          </div>

        </div>

        <div className="text-3xl text-yellow-500 mx-[77rem] my-[-3rem]">
          Rating
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Detail