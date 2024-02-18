import { IoHomeOutline } from "react-icons/io5";
import { PiBrowsersLight } from "react-icons/pi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
const Sidebar = () => {
    return (
        <div>
            <div className="text-slate-50 hover:cursor-pointer hover:bg-slate-500 py-2 m-1 rounded-lg">
                <p className="text-center text-2xl flex justify-center items-center">
                    <IoHomeOutline />
                </p>
                <p>Home</p>
            </div> 
            <div className="text-slate-50 hover:cursor-pointer hover:bg-slate-500 py-2 m-1 rounded-lg">
                <p className="text-center text-2xl flex justify-center items-center">
                    <PiBrowsersLight />
                </p>
                <p>Browse</p>
            </div>
            <div className="text-slate-50 rounded-lg hover:cursor-pointer hover:bg-slate-500 py-2 m-1">
                <p className="text-center text-2xl flex justify-center items-center">
                    <FaArrowTrendUp />
                </p>
                <p>Trending</p>
            </div>
            <div className="text-slate-50 hover:cursor-pointer hover:bg-slate-500 py-2 m-1 rounded-lg">
                <p className="text-center text-2xl flex justify-center items-center">
                    <MdOutlineWatchLater />
                </p>
                <p> Letest</p>
            </div>
            <hr></hr>
        </div>
    );
};

export default Sidebar;