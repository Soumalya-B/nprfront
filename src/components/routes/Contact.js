import React, { useEffect,useState } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import { Link } from 'react-router-dom';
// import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { ProgressBar } from 'react-loader-spinner'
import ContactForm from '../elements/ContactForm';

var parse = require('html-react-parser');

const Contact = () => {

    const [showModal, setShow] = useState({ show: false, data: null });
    const handleClose = () => setShow({ show: false, data: null });
    const handleShow = (map) => {
        setShow({ show: true, data: map })
    };
    const Address = () => {
        const [addressData, setAddress] = useState([]);
        useEffect(() => {
            fetch(ENDPOINT.ADDRESS_DATA)
                .then((response) => response.json())
                .then((responseData) => {
                    setAddress(responseData.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, []);
        return (
            <>
                <div className="contact">
                    {addressData.map((item, i) => {
                        return (
                            <div className="row">
                                <div className="col-sm-5">
                                    <h4>{item.city} Office</h4>
                                    <p><span><i className="fa fa-map-marker"></i></span>{item.addressLine1}<br/>
                                    {item.addressLine2}, {item.city}<br/>
                                    {item.state} - {item.pincode}</p>
                                    {item.email &&
                                        <p>Email : {item.email}</p>
                                    }
                                    <p><span><i className="fa fa-phone"></i></span>{item.phone}</p>
                                </div>
                                <div className="col-sm-7">
                                    <div className="map">
                                        {parse(item.map)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
    let modelMap = <ProgressBar height="80" width="80" ariaLabel="progress-bar-loading" wrapperStyle={{}} wrapperclassName="progress-bar-wrapper" borderColor = '#f8de00' barColor = '#570101' />;
    if (showModal.data) {
        modelMap = parse(showModal.data);
    }
    const [refDentistData, setRefDentist] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.SETTINGS_DATA + '/referring-dentist')
            .then((response) => response.json())
            .then((responseData) => {
                setRefDentist(responseData.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    let refDentistContent = '';
    if (refDentistData.length !== 0) {
        refDentistContent = refDentistData.content;
    }
    return (
        <>
            <div className="innerpage-banner">
                <Link to="/">
                    <img src={`${process.env.PUBLIC_URL}/assets/img/blog.jpeg`} alt="" />
                </Link>
            </div>
            <div className="innerpage">
                <div className="">
                    <div className="container">
                    <h1>Contact Us</h1>
                    <p>{ refDentistContent }</p>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="">
                                <div className="">
                                    <div id="content">
                                        <div className="contact">
                                            <Address />
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>

                        <div className="col-sm-4">
                            <div className="feedback">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;