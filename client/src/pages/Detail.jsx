import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReviewForm from "../components/ReviewForm"; 

import Loading from "../components/Loading";

const Detail = () => {
  const { id } = useParams(); // Obtener el ID del videojuego de los parámetros
  // const videogame = useSelector(state => state.detail)
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [currentId, setCurrentId] = useState(id);
  // const [loading, setLoading] = useState(true);

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
  //   return <Loading />;
  // }

  return (
    <>
      {/* <NavBar /> */}
      <div className="wrapper">
        <div className="flex">
          <div className="container1 mt-8">
            <img
              className="mx-[5rem] my-[5rem]"
              src="https://cdn.akamai.steamstatic.com/steam/apps/1593500/capsule_616x353.jpg?t=1650554420"
              alt="{videogame.name}"
              title="{videogame.name}"
            />

            <div className="">
              <button
                className="text-3xl mx-[10rem] my-[1rem] mt-[0.5rem]"
                onClick={() => navigate(`/favorites`)}
              >
                Fav
              </button>
              <button
                className="text-3xl mx-[5rem] my-[-1rem]"
                onClick={() => navigate(`/buy-game`)}
              >
                Buy
              </button>
            </div>
          </div>

          <div className="container2 bg-violet-900 p-10 w-[40rem] border-4 border-violet-700 rounded-2xl mx-[4rem] my-[8rem]">
            <div className="text-6xl font-serif text-white text-center">
              Name
            </div>
            <div className="text-1xl font-serif text-white mx-[2rem] my-[2rem]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              possimus reprehenderit recusandae, incidunt delectus quasi, ipsum
              reiciendis quaerat optio aspernatur commodi harum odit? Culpa quas
              officiis repellendus. Tempora, porro officiis. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Ex voluptate in quam
              dolorem sed qui reprehenderit praesentium amet saepe aperiam, sunt
              quaerat ut, rerum quisquam nulla atque! In, vel soluta.
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
          
        </div>

        {/* Pasa el ID del videojuego a ReviewForm */}
        <ReviewForm videogameId={id} />
      </div>
    </>
  );
};

export default Detail;
