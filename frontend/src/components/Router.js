import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home"
import Filter from "./Filter";
import Details from "./Details";
import Header from "./Header.js";
import Success from "./Success";
import Failure from "./Failure";

const Router = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path="/" Component={Home} />
                <Route path="/filter" Component={Filter} />
                <Route path="/details" Component={Details} />
                <Route path="/success" Component={Success}/>
                <Route path="/failure" Component={Failure}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router