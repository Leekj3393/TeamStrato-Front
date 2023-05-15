import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import EquNavbar from "../components/common/EquNavbar";
import Footer from "../components/common/Footer";

function EquipmentSubLayout() {

    return (
        <>  
            <EquNavbar/>
            <Outlet/>
        
        </>
    );
}

export default EquipmentSubLayout;