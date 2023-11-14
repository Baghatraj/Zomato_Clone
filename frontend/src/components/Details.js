import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.css"
import { Carousel } from 'react-responsive-carousel';
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import '../style/details.css'
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";


const Details = () => {
    const [rname, setRname] = useState([])
    const [menu, setMenu] = useState([])
    const [cuisine, setCuisine] = useState([])
    // const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    //const [secret, setSecret] = useState()
    const [total, setTotal] = useState(0)
    const location = useLocation().search
    const stripePromise = loadStripe('pk_test_51O9n4QSJf6A7iDzdNlNGiPKuI2EhWc1uikVm8grQNYJ8E2lSlG2YdhJqgPHvPkTiIFj9IsJ8WA9PGzE5lD9sRdWM00aPjTfssk')

    //Modal
    const [modal, setmodal] = useState(false)
    const [paymentModal, setPaymentModal] = useState(false)
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    useEffect(() => {
        const qs = queryString.parse(location)
        const { name } = qs
        axios.get(`http://localhost:8800/getAllRestaurantsByName/${name}`)
            .then((res) => {
                setRname(res.data[0])
                setCuisine(res.data[0].cuisine)
            })
            .catch(err => console.log(err))

        axios.get(`http://localhost:8800/menu/${name}`)
            .then(res => setMenu(res.data))
            .catch(err => console.log(err))

    }, [location])

    const openModal = () => {
        setmodal(true)
    }

    const closeModal = () => {
        setmodal(false)
    }

    const handleQty = (index, operation) => {
        let total = 0;
        const items = menu[0].item
        const item = items[index]

        if (operation === "add") {
            item.qty += 1
        } else {
            if (item.qty === 0) {
                item.qty = 0
            } else
                item.qty -= 1
        }

        items[index] = item
        for (let i = 0; i < items.length; i++) {
            const currentItem = items[i];
            total += currentItem.qty * currentItem.price;
        }
        setTotal(total)

    }

    const pay = () => {
        const data = JSON.parse(sessionStorage.getItem('data'))
        //const token = sessionStorage.getItem('token')
        if (data) {
            const { email } = data
            if (!email) {
                alert('Please login')
            } else {
                setPaymentModal(true)
                setmodal(false)
                setEmail(email)
                // setToken(token)
            }
        } else {
            alert('please login')
        }
    }
    // const handlePayment = async () => {
    //     const response = await fetch('http://localhost:8800/charge', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ amount: total })
    //     })
    //     const { client_secret } = await response.json()
    //     setSecret(client_secret)
    //     console.log(secret);
    // }

    const options = {
        mode :'payment',
        currency: 'inr',
        amount : total * 100
    }


    return (
        <div>
            <div className="mx-3 mt-3">
                <Carousel showThumbs={false} autoPlay={true} renderIndicator={false}>
                    <div>
                        <img src={require("./Asset/image/breakfast.jpeg")} alt="not found" className="img1" />
                    </div>
                    <div>
                        <img src={require("./Asset/image/breakfast.jpeg")} alt="not found" className="img1" />
                    </div>
                    <div>
                        <img src={require("./Asset/image/breakfast.jpeg")} alt="not found" className="img1" />
                    </div>
                </Carousel>
            </div><br />
            <div className="d-flex justify-content-between mx-3 mt-1">
                <div><h2>{rname.name}</h2></div>
                <div><button className="btn-order" onClick={openModal}>Place online Order </button></div>
            </div>
            <div className="mx-3 mt-1">
                <Tabs>
                    <TabList>
                        <Tab>Overview</Tab>
                        <Tab>Contact</Tab>
                    </TabList>
                    <TabPanel>
                        <div>
                            <div>Rating : {rname.aggregate_rating}</div>
                            <div>Review : {rname.rating_text}</div>
                            <div>min_Price : {rname.min_price}</div>
                            <div> Cuisine:
                                {cuisine.map((item, index) => {
                                    return (
                                        <div key={index}>{item.name}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <div>Phone Number : +{rname.contact_number}</div>
                            <div>Address:</div>
                            <div>{rname.name},</div>
                            <div>{rname.locality},</div>
                            <div>{rname.city}</div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <Modal isOpen={modal} style={customStyles}>
                <div>
                    {menu.map((item) => {
                        return (
                            <div key={item._id}>
                                <h2>{item.name}</h2>
                                <h4>Subtotal : ₹ {total}</h4>
                                <button onClick={() =>{pay(); }}>Pay now</button>
                                {item.item.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <h5>{item.name}</h5>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <div>Price: ₹{item.price}</div>
                                                <div>
                                                    <button onClick={() => handleQty(index, "sub")}>-</button>
                                                    <span>{item.qty}</span>
                                                    <button onClick={() => handleQty(index, "add")}>+</button>
                                                </div>
                                            </div>
                                            <div>Description:</div>
                                            <p>{item.desc}</p>
                                            <hr />
                                        </div>
                                    )
                                })}
                                <button onClick={closeModal}>Close</button>
                            </div>
                        )

                    })}
                </div>
            </Modal>
            <Modal isOpen={paymentModal} style={customStyles}>
                <div>
                    
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm total={total} email={email}/>
                    </Elements>
                    <button onClick={() => setPaymentModal(false)}>Close</button>
                </div>
            </Modal>
        </div>
    )
}

export default Details