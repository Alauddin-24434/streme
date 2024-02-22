import LoginButton from "./LoginButton";

const Navbar = () => {
    return (
      <div className='flex justify-between max-w-[1400px]  mx-10 lg:mx-auto'>
      <div>
        {/* <h1 className="text-lg font-bold lg:text-2xl text-[#00b84b]">STREME</h1> */}
        <img className="w-[120px] pt-3 md:pt-0 md:w-[190px]" src={"https://i.ibb.co/B396qB4/Screenshot-2024-02-07-031511-removebg-preview.png"}></img>
      </div>
      <div className="mt-6 mr-3">
        <button className="text-red hover:before:bg-redborder-red-500 relative h-[50px] w-40 overflow-hidden border border-green-500 bg-white px-3 text-green-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-green-500 before:transition-all before:duration-500 hover:text-white hover:shadow-green-500 hover:before:left-0 hover:before:w-full">

        <span className="relative z-10"><LoginButton /></span>
        </button>
      </div>
    </div>
    );
};

export default Navbar;