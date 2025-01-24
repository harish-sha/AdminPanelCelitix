import { CgProfile } from "react-icons/cg";
import { FaDownload } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";

const Navbar = () => {
    return (
        <nav className="w-full bg-white  text-white  h-16 flex items-center px-4">
            <h1 className="text-lg font-medium text-gray-800">Dashboard</h1>

            {/* Navbar actions (adjust as needed) */}
            <div className="ml-auto flex gap-4">
                <button className="py-2 px-3 rounded-full bg-gray-700 hover:bg-gray-600"><BsInfoCircle className="text-xl" /></button>
                <button className="py-2 px-3 rounded-full bg-gray-700 hover:bg-gray-600"><CiMoneyBill className="text-xl" /></button>
                <button className="py-2 px-3 rounded-full bg-gray-700 hover:bg-gray-600"><IoWalletOutline className="text-xl" /></button>
                <button className="py-2 px-3 rounded-full bg-gray-700 hover:bg-gray-600"><FaDownload className="text-xl" /></button>
                <button className="py-2 px-3 rounded-full bg-gray-700 hover:bg-gray-600"><CgProfile className="text-xl" /></button>
            </div>
        </nav>
    );
};

export default Navbar;
