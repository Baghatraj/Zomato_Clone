import React, { useEffect, useState } from "react";
import '../style/filter.css';
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Filter = () => {

    const navgivate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const restaurantsPerPage = 2
    const [sort, setSort] = useState(1)
    const [cusineid, setCuisineid] = useState([])
    const [locationdata, setLocationdata] = useState([])
    // const [locationid, setLocationid] = useState(undefined)
    const [restaurants, setRestaurants] = useState([]);
    const [lcost, setLcost] = useState(undefined);
    const [hcost, setHcost] = useState(undefined)
    const location = useLocation().search
    const qs = queryString.parse(location);
    const { mealtype: mealtype_id } = qs
    const location_id = Number(sessionStorage.getItem('locationID'))

    useEffect(() => {
        axios.get("http://localhost:8800/getAllLocations")
            .then(res => setLocationdata(res.data))
            .catch(error => console.log(error))

        const filteredObj = {
            mealtype_id: Number(mealtype_id),
            location_id: location_id,
            cuisine_id: cusineid,
            sort: sort,
            lcost: lcost,
            hcost: hcost
        }
        axios.post("http://localhost:8800/filter", filteredObj)
            .then(res => setRestaurants(res.data))
            .catch(err => console.log(err))

    }, [location, sort, cusineid, lcost, hcost, location_id, mealtype_id])

    const searchHandle = (e) => {
        const locationid = Number(e.target.value)
        const filteredObj = {
            mealtype_id: Number(mealtype_id),
            location_id: locationid,
            sort: sort,
            lcost: lcost,
            hcost: hcost
        }
        axios.post("http://localhost:8800/filter", filteredObj)
            .then(res => setRestaurants(res.data))
            .catch(err => console.log(err))
    }

    const handleCuisine = (id) => {

        const index = cusineid.indexOf(id)
        if (index === -1) {
            cusineid.push(id)
            setCuisineid(cusineid)
        } else {
            cusineid.splice(index, 1)
            setCuisineid(cusineid)
        }

        setTimeout(() => {
            filter();
        }, 0);

    }

    const searchSort = (e) => {
        const sort = e.target.value
        setSort(sort)
        setTimeout(() => {
            filter();
        }, 0);
    }

    const handleCost = (lcost, hcost) => {
        setLcost(lcost)
        setHcost(hcost)
        setTimeout(() => {
            filter();
        }, 0);

    }
    const filter = () => {
        const filteredObj = {
            mealtype_id: Number(mealtype_id),
            location_id: location_id,
            cuisine_id: cusineid,
            sort: sort,
            lcost: lcost,
            hcost: hcost
        }

        axios.post("http://localhost:8800/filter", filteredObj)
            .then(res => setRestaurants(res.data))
            .catch(err => console.log(err))
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const length = Math.ceil(restaurants.length / restaurantsPerPage)
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

    const handleDetail = (e) =>{
        const name = e.name
        navgivate(`/details?name=${name}`)
    }

    return (
        <div>
            <div className="container mt-3">
                <h2 className="h2">Breakfast Places in Mumbai</h2>
            </div>
            <div className="d-flex">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                            <button className="d-lg-none  btn-style" data-bs-toggle="collapse" data-bs-target="#filter">
                                Filters
                            </button>
                            <div id="filter" className="collapse show filter-border" style={{ width: "200px" }}>
                                <form action="" className="filter">
                                    <div className="filter-box">
                                        <div className="location-box">
                                            <span>Filters</span> <br />
                                            <span>Select Location</span> <br />
                                            <select id="search" onChange={searchHandle}>
                                                <option value="Select">Select</option>
                                                {locationdata.map((item) => {
                                                    return (
                                                        <option key={item._id} value={item.location_id} >{item.name},{item.city}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="cuisine">
                                            Cuisine<br />
                                            <input type="checkbox" onChange={() => handleCuisine(1)} />North Indian <br />
                                            <input type="checkbox" onChange={() => handleCuisine(2)} />South Indian <br />
                                            <input type="checkbox" onChange={() => handleCuisine(3)} />Chinese <br />
                                            <input type="checkbox" onChange={() => handleCuisine(4)} />Fast Food <br />
                                            <input type="checkbox" onChange={() => handleCuisine(5)} />Street Food <br />
                                        </div>
                                        <div className="cuisine">
                                            Cost for Two <br />
                                            <input type="radio" name="price" onChange={() => handleCost(0, 500)} />Less than ₹500 <br />
                                            <input type="radio" name="price" onChange={() => handleCost(500, 1000)} />₹500 to ₹1000 <br />
                                            <input type="radio" name="price" onChange={() => handleCost(1000, 1500)} />₹1000 to ₹1500<br />
                                            <input type="radio" name="price" onChange={() => handleCost(1500, 2000)} />₹1500 to ₹2000<br />
                                            <input type="radio" name="price" onChange={() => handleCost(2000, 50000)} />₹2000+<br />
                                        </div>
                                        <div className="cuisine">
                                            Sort <br />
                                            <input type="radio" name="Sort" id="" value={1} onClick={searchSort} />Price Low to High <br />
                                            <input type="radio" name="Sort" id="" value={-1} onClick={searchSort} />Price High to Low <br />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="row">
                                {currentRestaurants.length > 0 ? currentRestaurants.map((item, index) => {
                                    return (
                                        <div className="col-12" key={index} onClick={()=> handleDetail(item)}>
                                            <div className="box margin-bottom">
                                                <div className="box1">
                                                    <img src={`./${item.image}`} alt="food" className="img" />
                                                    <div className="desc">
                                                        <h3>{item.name}</h3>
                                                        <h6>{item.locality}</h6>
                                                        <p>{item.city}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="rate">
                                                    CUISINE:&emsp;&emsp;&emsp;&emsp;&ensp;{item.cuisine.map(item => {
                                                        return <span key={item.id}>{item.name},</span>
                                                    })} <br />
                                                    COST FOR TWO:&emsp; &#x20b9; {item.min_price}
                                                </div>
                                            </div>
                                        </div>

                                    )

                                }) : <div>No result</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {(restaurants.length > 0) ?
                <div className="d-flex justify-content-center mt-5">
                    <ul className="pagination">
                        {Array.from({length}).map((_, index) => (
                            <li
                                key={index}
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                <span className="page-link">{index + 1}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                : null}

        </div>

    )
}

export default Filter