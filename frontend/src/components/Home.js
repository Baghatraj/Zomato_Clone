import React, { useEffect, useState } from "react";
import '../style/style.css'
import Wallpaper from "./Wallpapers";
import QuickSearch from "./QuickSearch";
import axios from "axios";

const Home = () => {

    const [location, setLocation] = useState([])
    const [mealtypes, setmealtypes] = useState([])

    useEffect(()=>{
        sessionStorage.clear();
        axios.get("http://localhost:8800/getAllLocations")
        .then(res => setLocation(res.data))
        .catch(error => console.log(error))
       
        axios.get("http://localhost:8800/getAllMealtypes")
        .then(res => setmealtypes(res.data))
        .catch(err => console.log(err))
    },[])

    return (
        <div>
            <Wallpaper search={location}/>
            <QuickSearch data={mealtypes}/>
        </div>
    )
}

export default Home