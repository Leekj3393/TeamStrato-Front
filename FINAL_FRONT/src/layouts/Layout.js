import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

import Footer from "../components/common/Footer";
import SubNav from "../components/common/MemberSubNavbar";

function Layout() {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <SubNav/>
            <Footer/>
        </>
    );
}



export default Layout;