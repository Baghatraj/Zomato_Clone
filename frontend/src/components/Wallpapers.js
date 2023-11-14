import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wallpaper = ({search}) => {

    const [restaurants, setRestaurants] = useState([])
    const [inputtext, setinputtext] = useState('')
    const [suggestions, setsuggestions] = useState([])
    // const [name, setName] = useState({})
    const navgivate = useNavigate();

    const searchHandle = (event) =>{
        const location_id = event.target.value
        sessionStorage.setItem('locationID', Number(location_id))

        axios.get(`http://localhost:8800/getAllRestaurantsByLid/${location_id}`)
        .then(res => setRestaurants(res.data))
        .catch(err => console.log(err))
    }

    const handleInput = (event) =>{
        const inputtext = event.target.value
        
        const suggestions = restaurants.filter(item => item.name.toLowerCase().includes(inputtext.toLowerCase()))
        setsuggestions(suggestions)
        setinputtext(inputtext)
    }

    const details = (e) =>{
        const name = e.name;
        navgivate(`/details?name=${name}`)
    }


    const suggestion = () =>{
        if(suggestions.length === 0 && inputtext === undefined){
            return null
        }
        if(suggestions.length > 0 && inputtext === ''){
            return null
        }
        if(suggestions.length === 0 && inputtext){
            return(
                <ul className="suggest">
                    <li className="li1">not found</li>
                </ul>
                
            )
        }
        return(
            <ul className="suggest">
                {suggestions.map((item, index) => {
                    return(<li className="li1" key={index} value={item.name} onClick={()=> details(item)}>{item.name}</li>)
                    })}
            </ul>
        )
    }

    return (
        <div id="photo1">
            <div id="box_1">
                <div id="symbol_1">e!</div>
                <div id="text_1">Find the best restaurants, cafes and bars</div><br />
                <div className="container">
                    {/* <input type="text" list="cities" id="search"  /> */}
                    <select id="search" onChange={searchHandle}>
                        <option value="Select">Select</option>
                        {search.map((item)=>{
                            return(
                                <option key={item._id} value={item.location_id} >{item.name},{item.city}</option>
                            )
                        })}
                    </select>
                    <div className="icon"><img src="./Asset/image/search.svg" alt="" id="icon" /></div>
                    <input type="text" placeholder="Search for restaurants" className="search" value={inputtext} onChange={handleInput}/>
                    {suggestion()}
                </div>
            </div>
        </div>
    )
}

export default Wallpaper