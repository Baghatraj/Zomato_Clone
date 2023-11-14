import React from "react";
import { useNavigate } from "react-router-dom";

const QuickSearchItems = ({data}) => {
    const {name, content, image, meal_type} = data
    const navigate = useNavigate()

    const handleClick = (id) =>{
        const location_id = Number(sessionStorage.getItem('locationID'))
        if(location_id){
            navigate(`/filter?mealtype=${id}&location_id=${location_id}`)
        }else{
            navigate(`/filter?mealtype=${id}`)
        }
        
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 ">
            <div className="food" onClick={()=> handleClick(meal_type) }>
                <img src={image} alt="" width="100px" height="95px" />
                <div className="word">
                    <b>{name}</b><br />
                    {content}
                </div>
            </div>
        </div>
    )
}

export default QuickSearchItems