import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import useSWRImmutable from 'swr/immutable'

import { setSortType } from "../redux/videogame/videoGameSlice";
import { setSortOrder } from "../redux/videogame/videoGameSlice"

const SortBar = () => {
  const dispatch = useDispatch()
  const [tooggleSort, setToogleSort] = useState(true)
  // const sortType = useSelector((state) => state.sortType)

  // const sortTypeHandler = (parameter) => {
  //   let sortedData = [...sortType];

  //   if (parameter === 'name') {
  //     sortedData.sort((a, b) => a.name.localeCompare(b.name));
  //   } else if (parameter === 'releaseDate') {
  //     sortedData.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
  //   } else if (parameter === "rating") {
  //     sortedData.sort((a, b) => a.rating.localeCompare(b.rating));
  //   }

  //   dispatch(fetchByParameter(parameter));
  // };

  const sortTypeHandler = (parameter) => {
    dispatch(setSortType(parameter));
  };

  const toogle = () => {
    setToogleSort(prev => !prev)
  }

  useEffect(() => {
    dispatch(setSortOrder(tooggleSort ? 'ASC' : 'DESC'))
  }, [dispatch, toogle])

  return (
    <div className="flex">
      <select
        onChange={(event) => sortTypeHandler(event.target.value)}
        className="rounded-[0.3rem] w-[11rem] px-2 py-1 bg-violet-900 hover:bg-violet-700 transition duration-200 my-4 font-mono"
      >
        <option value="name" className="border px-2 py-1"> By name </option>
        <option value="releaseDate" className="border px-2 py-1"> By releaseDate </option>
        <option value="rating" className="border px-2 py-1"> By rating </option>
        {/*<option value="price" className="border px-2 py-1"> By price </option>*/}
      </select>
      <button className="rounded-[0.3rem] w-[11rem] px-2 py-1 bg-violet-900 hover:bg-violet-700 transition duration-200 my-4 font-mono mx-[1rem]" onClick={toogle}>
        {tooggleSort ? 'Ascending order' : 'Descending order'}
      </button>
    </div>
  );
};

export default SortBar

