import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OrderSummary from './OrderSummary';
import CustomerDetail from './CustomerDetail';
import Payment from './Payment';


const PlaceOrder = (props) => {
    document.title = "book your automobile rental";
    const [errorCount, setErrorCount] = useState(5);
    const [activeForm, setActiveForm] = useState(0);

    const [data, setData] = useState({
        productId: props.product.productId,
        productName: props.product.productName,
        productCategory: props.product.productCategory,
        productDescription: props.product.productDescription,
        rating: props.product.rating,
        noOfRatings: props.product.noOfRatings, 
        price: props.product.price,
        image: props.product.image,
        orderId: "",
        orderDate: ""
    });

    const [user, setUser] = useState({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        customerAddress: "",
        termsAndConditions: false
    });

    const [customerName, setCustomerName] = useState({
        status: false,
        message: ""
    });
    
    const [customerPhone, setCustomerPhone] = useState({
        status: false,
        message: ""
    });
    
    const [customerEmail, setCustomerEmail] = useState({
        status: false,
        message: ""
    });





    const Heading = ["1. Order Summary", "2. Customer details", "3. Payments"]

    const navigate = useNavigate();

    useEffect(() => {
        if (props.product.length === 0) {
            let x = setTimeout(() => {
                if (errorCount === 0) {
                    clearInterval(x);
                    navigate("/products")
                }
                setErrorCount(errorCount - 1);
            }, 1000)
        } else {
            var date = new Date();
            var dateTime = date.getDate() + "/"
                + (date.getMonth() + 1) + "/"
                + date.getFullYear() + " | "
                + date.getHours() + ":"
                + date.getMinutes() + ":"
                + date.getSeconds();
            setData({...props.product, ["orderId"]: `${props.product.productId}${Date.now()}`, ["orderDate"]: dateTime })
        }
    }, [errorCount])

    const handleSummaryNext = (e) => {
        setActiveForm(1);
    }

    const handleCustomerPrevious = (e) => {
        setActiveForm(0);
    }

    let name, value;
    const handleCustomerInput = (e) => {
        if (e.target.type == 'text' || e.target.type == 'number' || e.target.type == 'email' || e.target.type == 'textarea') {
            name = e.target.name;
            value = e.target.value;
            if(e.target.name === "customerName") {
                if(e.target.value === "") {
                    e.target.style.border = "1px solid #dc3545";
                    e.target.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
                    setCustomerName({
                        status: true,
                        message: "Name should not be empty!..."
                    });
                } else if(/[^a-zA-Z \/]/.test(e.target.value)) {
                    e.target.style.border = "1px solid #dc3545";
                    e.target.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
                    setCustomerName({
                        status: true,
                        message: "Invalid Name!..."
                    });
                } else {
                    e.target.style.borderColor = "#ced4da";
                    e.target.style.boxShadow = null;
                    setCustomerName({
                        status: false,
                        message: ""
                    });
                }
            } else if(e.target.name === "customerPhone") {
                if(e.target.value.length != 10) {
                    e.target.style.border = "1px solid #dc3545";
                    e.target.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
                    setCustomerPhone({
                        status: true,
                        message: "Phone must be of 10 digits!..."
                    })
                } else if(e.target.value[0] === '0') {
                    e.target.style.border = "1px solid #dc3545";
                    e.target.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
                    setCustomerPhone({
                        status: true,
                        message: "Phone should not start from 0!..."
                    })
                } else {
                    e.target.style.borderColor = "#ced4da";
                    e.target.style.boxShadow = null;
                    setCustomerPhone({
                        status: false,
                        message: ""
                    })
                }
            } else if(e.target.name === "customerEmail") {
                // alert(e.target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
                if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value)) {
                    // alert("woking")
                    e.target.style.border = "1px solid #dc3545";
                    e.target.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
                    setCustomerEmail({
                        status: true,
                        message: "Email must be valid!..."
                    })
                } else {
                    e.target.style.borderColor = "#ced4da";
                    e.target.style.boxShadow = null;
                    setCustomerEmail({
                        status: false,
                        message: ""
                    });
                }
            } 
        } else {
            name = e.target.name;
            value = e.target.checked;
        }

        

        setUser({ ...user, [name]: value })
    }


    const handleCustomerNext = (e) => {
        if (user.customerName.length == 0 || user.customerEmail.length == 0 || user.customerPhone.length == 0 || user.customerAddress.length == 0) {
            alert("Some of the input are not filled!...");
        } else if (!user.termsAndConditions) {
            alert("Please agree the terms and conditions...");
        } else {
            setData({ ...data, ...user });
            setActiveForm(2);
        }
    }

    // let paymentType;
    // if (activePayment == "COD") {
    //     paymentType = (
    //         <>
    //             <p className="text-muted" style={{ fontSize: "14px", margin: "0" }}>payment mode</p>
    //             <p className="card-text">{activePayment}</p>
    //         </>
    //     )
    // } else if (activePayment == "online") {

    // } else if ("online-payment") {
    //     paymentType = (
    //         <>
    //         </>
    //     );
    // } else {
    //     paymentType = (
    //         <>
    //         </>
    //     );
    // }

    let renderForm;
    if (activeForm == 0) {
        renderForm =  <OrderSummary data={data} handleSummaryNext={handleSummaryNext}/>;
    } else if (activeForm == 1) {
        renderForm = <CustomerDetail customerName={customerName} customerPhone={customerPhone} customerEmail={customerEmail} user={user} handleCustomerInput={handleCustomerInput} handleCustomerNext={handleCustomerNext} handleCustomerPrevious={handleCustomerPrevious}/>;
    } else {
        renderForm = <Payment data={data} user={user} setActiveForm={setActiveForm}/>;
    }

    return (
        <> {
            (props.product.length == 0)
                ?
                <div className="alert alert-danger">
                    <strong>Something Went Wrong!</strong> redirecting in {errorCount}.
                </div>
                :
                <>
                    <div className="container mt-5 p-3 bg-light">
                        <h2 className='text-center'>{Heading[activeForm]}</h2>
                    </div>
                    <div className="container mt-2 bg-light">
                        <ul className="breadcrumb justify-content-center">
                            <li>{Heading[0]} &gt; </li>
                            <li>{Heading[1]} &gt; </li>
                            <li>{Heading[2]} </li>
                        </ul>
                    </div>
                    <div className='container mt-2 p-4 bg-light'>
                        <div className="row">
                            {renderForm}
                        </div>
                    </div>
                </>

        }
        </>
    )

}

export default PlaceOrder;