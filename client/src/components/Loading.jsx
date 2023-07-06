import teclado from "../assets/teclado.png";

const Loading = () => {
  return (
    <>
      {/* <NavBar /> */}
      <div className="flex flex-col items-center text-5xl font-semibold gap-5 my-[13rem]">
        <img src={teclado} alt="Teclado" className="w-[7rem] animate-bounce" />
        <p className="font-mono font-light">Loading...</p>
      </div>
    </>
  );
};

export default Loading;