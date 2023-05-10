import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import NoticeNavbar from "../components/common/NoticeNavbar";

function NoticeSubLayout() {

    return (
        <>  
            <NoticeNavbar/>
            <Outlet/>
        
        </>
    );
}

export default NoticeSubLayout;