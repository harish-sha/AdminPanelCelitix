import { CgProfile } from "react-icons/cg";
import { FaDownload } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const Navbar = () => {
    return (
        <nav className="w-full bg-white  text-white  h-16 flex items-center px-4">
            <h1 className="text-lg font-medium text-gray-800">Dashboard</h1>

            {/* Navbar actions (adjust as needed) */}
            <div className="ml-auto flex gap-4">
                <button className="py-2 px-3 rounded-full bg-[#e6f4ff] hover:bg-gray-600"><InfoOutlinedIcon className="text-xl text-blue-800" /></button>
                <button className="py-2 px-3 rounded-full bg-[#e6f4ff] hover:bg-gray-600"><CiMoneyBill className="text-xl text-blue-800" /></button>
                <button className="py-2 px-3 rounded-full bg-[#e6f4ff] hover:bg-gray-600"><AccountBalanceWalletOutlinedIcon className="text-xl text-blue-800" /></button>
                <button className="py-2 px-3 rounded-full bg-[#e6f4ff] hover:bg-gray-600"><FileDownloadOutlinedIcon className="text-xl text-blue-800" /></button>
                <button className="py-2 px-3 rounded-full bg-[#e6f4ff] hover:bg-gray-600"><CgProfile className="text-xl text-blue-800" /></button>
            </div>
        </nav>
    );
};

export default Navbar;
