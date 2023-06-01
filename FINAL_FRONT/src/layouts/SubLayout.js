import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Navbar2 from "../components/common/Navbar2";
import SubNav from "../components/common/MemberSubNavbar";

import Footer from "../components/common/Footer";

function SubLayout() {

    return (
        <>  
            <Navbar2/>
            <Outlet/>
            <SubNav/>
        
        </>
    );
}

export default SubLayout;