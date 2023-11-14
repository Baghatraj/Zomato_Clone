import React from "react";
import QuickSearchItems from "./QuickSearchItems";

const QuickSearch = ({data}) => {
    return (
        <div className="left_side">
            <div className="container"><br />
                <div className="row">
                    <div className="col font-style">Quick Searches</div>
                </div>
                <div className="row">
                    <div className="col font-style1">Discover restaurants by the type of meals</div>
                </div>
            </div><br />
            <div className="container">
                <div className="row">
                    {data.map((item ,index)=>{
                        return (
                            <QuickSearchItems key={index} data={item}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default QuickSearch