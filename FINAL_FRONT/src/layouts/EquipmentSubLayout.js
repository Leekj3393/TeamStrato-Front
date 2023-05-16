import { Outlet } from "react-router-dom";
import EquNavbar from "../components/common/EquNavbar";
import { useEffect, useState } from "react";

function EquipmentSubLayout() 
{

    const [url , setUrl] = useState(window.location.href.replace("http://localhost:3000/",""));

    useEffect(() =>{
        const handleUrlChange = () => {
            const currentURL = window.location.href.replace("http://localhost:3000/", "");
            setUrl(currentURL);
        };
            },
            [window.location.href]
      );
    
      console.log("url",url);


    return (
        <>  
            <EquNavbar url={url}/>
            <Outlet/>
        
        </>
    );
}

export default EquipmentSubLayout;