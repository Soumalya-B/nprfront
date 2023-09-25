import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';

// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.css";
import { ProgressBar } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import {State} from '../elements/MasterData';
import { Months, Years } from '../elements/CreditCard';

var parse = require('html-react-parser');

const Register = () => {
    let selectedPlan = localStorage.getItem('sessionSelectedPlan');
    let referralCode = localStorage.getItem('sessionReferalCode') || null;
    const [validated, setValidated] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [formData, setFormData] = useState({site:ENDPOINT.SITE_ID,membershipId:selectedPlan,referralCode:referralCode});
    const [showFeature, setToggleFeatures] = useState('block');
    const [disableEnable, setDisableEnable] = useState(true);

    let requireFieldsVal = false;
    let requireFieldsDisplay = 'none';
    if (selectedPlan == 2) {
        requireFieldsVal = true;
        requireFieldsDisplay = 'block';
    }
    
    const showHideFeature = (value) => {
        if (value) {
            formData.billingAddressLine1 = formData.addressLine1;
            formData.billingAddressLine2 = formData.addressLine2;
            formData.billingCity = formData.city;
            formData.billingState = formData.state;
            formData.billingZip = formData.zip;
        } else {
            formData.billingAddressLine1 = '';
            formData.billingAddressLine2 = '';
            formData.billingCity = '';
            formData.billingState = '';
            formData.billingZip = '';
        }
        setToggleFeatures(value);
    }
    
    const disableEnableFeature = () => {
        let val = true;
        if (disableEnable) {
            val = false;
        }
        setDisableEnable(val);
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            fetch(ENDPOINT.REGISTER_SUBMIT, {
                method: 'POST',
                body: JSON.stringify({ formData }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status === 'success') {
                    setResMsg(responseData.message);
                    setMsgColor('green');
                    localStorage.removeItem('sessionReferalCode');
                    window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
                } else {
                    setResMsg(responseData.message);
                    setMsgColor('red');
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
        setValidated(true);
    };
    

    return (
        <section className="full_width  d-flex justify-content-center align-items-center">
            <div className="container form_info_bg">
                <h2>Registration</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                <div className="form_info_box">
                    <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <h3>Personal Info</h3>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Control 
                                required 
                                type="textbox" 
                                id="firstName" 
                                controlId="formFirstName" 
                                name="firstName" 
                                placeholder="First Name" 
                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter first name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Control 
                                required 
                                type="textbox" 
                                id="lastName" 
                                controlId="formLastName" 
                                name="lastName" 
                                placeholder="Last Name" 
                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Control 
                                required 
                                type="textbox" 
                                id="phone" 
                                controlId="formPhone" 
                                name="phone" 
                                placeholder="Phone" 
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter phone.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Control 
                                required 
                                type="email" 
                                id="email" 
                                controlId="formEmail" 
                                name="email" 
                                placeholder="Email" 
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Control 
                                required 
                                type="password" 
                                id="password" 
                                controlId="formPassword" 
                                name="password" 
                                placeholder="Password"
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <h3>Company Info</h3>
                        <Form.Group className="mb-3" controlId="formCompanyName">
                            <Form.Control 
                                required 
                                type="textbox" 
                                id="companyName" 
                                controlId="formCompanyName" 
                                name="companyName" 
                                placeholder="Company Name" 
                                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter company name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAddressLine1">
                            <Form.Control 
                                required 
                                type="textbox" 
                                id="addressLine1" 
                                controlId="formAddressLine1" 
                                name="addressLine1" 
                                placeholder="Address Line 1" 
                                onChange={e => setFormData({ ...formData, addressLine1: e.target.value })}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter Address Line 1.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAddressLine2">
                            <Form.Control 
                                required 
                                type="textbox" 
                                id="addressLine2" 
                                controlId="formAddressLine2" 
                                name="addressLine2" 
                                placeholder="Address Line 2" 
                                onChange={e => setFormData({ ...formData, addressLine2: e.target.value })}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter Address Line 2.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control 
                                    required
                                    id="city" 
                                    controlId="formCity" 
                                    name="city" 
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formState">
                                <Form.Label>State/Provinces</Form.Label>
                                <Form.Select 
                                    required
                                    id="state" 
                                    controlId="formState" 
                                    name="state" 
                                    onChange={e => setFormData({ ...formData, state: e.target.value })} 
                                    aria-label="Default select example" 
                                    className="form-control"
                                >
                                    <State />
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please enter state.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formZip">
                            <Form.Control 
                                required 
                                type="textbox" 
                                id="zip" 
                                controlId="formZip" 
                                name="zip" 
                                placeholder="Zip Code" 
                                onChange={e => setFormData({ ...formData, zip: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter zip code.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <label style={{display: requireFieldsDisplay}}>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check 
                                    type="checkbox" 
                                    onClick={() => showHideFeature(`${(showFeature == 'none') ? 'block' : 'none'}`)} 
                                    label="Billing address same as company address" 
                                />
                            </Form.Group>
                            <h3>Payment Information</h3>
                            <Form.Group className="mb-3" controlId="formNameOnCard">
                                <Form.Control 
                                    required={requireFieldsVal} 
                                    type="textbox" 
                                    id="nameOnCard" 
                                    controlId="formNameOnCard" 
                                    name="nameOnCard" 
                                    placeholder="Name on card" 
                                    onChange={e => setFormData({ ...formData, nameOnCard: e.target.value })}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please enter name on card.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCardNumber">
                                <Form.Control 
                                    required={requireFieldsVal} 
                                    type="textbox" 
                                    id="cardNumber" 
                                    controlId="formCardNumber" 
                                    name="cardNumber" 
                                    placeholder="Card Number" 
                                    onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please enter card number.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formCardMonth">
                                    <Form.Label>Valid Upto</Form.Label>
                                    <Form.Select 
                                        required={requireFieldsVal} 
                                        id="cardMonth" 
                                        controlId="formCardMonth" 
                                        name="cardMonth" 
                                        onChange={e => setFormData({ ...formData, cardMonth: e.target.value })}
                                        aria-label="Default select example" 
                                        className="form-control">
                                        <Months />
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formCardYear">
                                    <Form.Label>&nbsp;</Form.Label>
                                    <Form.Select 
                                        required={requireFieldsVal}  
                                        id="cardYear" 
                                        controlId="formCardYear" 
                                        name="cardYear" 
                                        onChange={e => setFormData({ ...formData, cardYear: e.target.value })}
                                        aria-label="Default select example" 
                                        className="form-control">
                                        <Years />
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formCardCvv">
                                    <Form.Label>CVV/CVC</Form.Label>
                                    <Form.Control 
                                        type="textbox" 
                                        id="cardCvv" 
                                        controlId="formCardCvv" 
                                        name="cardCvv" 
                                        placeholder="Card Number" 
                                        onChange={e => setFormData({ ...formData, cardCvv: e.target.value })}
                                    />
                                </Form.Group>
                            </Row>
                            <h3 style={{display: showFeature}}>Billing Address</h3>
                            <Form.Group className="mb-3" controlId="formBillingAddressLine1" style={{display: showFeature}}>
                                <Form.Control 
                                    required={requireFieldsVal} 
                                    type="textbox" 
                                    id="billingAddressLine1" 
                                    controlId="formBillingAddressLine1" 
                                    name="billingAddressLine1" 
                                    placeholder="Address Line 1" 
                                    defaultValue={formData.billingAddressLine1}
                                    onChange={e => setFormData({ ...formData, billingAddressLine1: e.target.value })}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please enter Address Line 1.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBillingAddressLine2" style={{display: showFeature}}>
                                <Form.Control 
                                    required={requireFieldsVal} 
                                    type="textbox" 
                                    id="billingAddressLine2" 
                                    controlId="formBillingAddressLine2" 
                                    name="billingAddressLine2" 
                                    placeholder="Address Line 2" 
                                    defaultValue={formData.billingAddressLine2}
                                    onChange={e => setFormData({ ...formData, billingAddressLine2: e.target.value })}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please enter Address Line 2.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Row className="mb-3" style={{display: showFeature}}>
                                <Form.Group as={Col} controlId="formGridBillingCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control 
                                        required={requireFieldsVal}
                                        id="billingCity" 
                                        controlId="formGridBillingCity" 
                                        name="billingCity" 
                                        defaultValue={formData.billingCity}
                                        onChange={e => setFormData({ ...formData, billingCity: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="formBillingState">
                                    <Form.Label>State/Provinces</Form.Label>
                                    <Form.Select 
                                        required={requireFieldsVal}
                                        onChange={e => setFormData({ ...formData, billingState: e.target.value })} 
                                        id="billingState" 
                                        controlId="formBillingState" 
                                        name="billingState" 
                                        aria-label="Default select example" 
                                        className="form-control"
                                    >
                                        <State />
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlId="formBillingZip" style={{display: showFeature}}>
                                <Form.Control 
                                    required={requireFieldsVal}
                                    type="textbox" 
                                    id="billingZip" 
                                    controlId="formBillingZip" 
                                    name="billingZip" 
                                    placeholder="Zip Code" 
                                    defaultValue={formData.billingZip}
                                    onChange={e => setFormData({ ...formData, billingZip: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter zip code.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </label>
                        <hr />
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check 
                                id="custom-switch"
                                onClick={() => disableEnableFeature()} 
                                label={`By clicking on the checkbox Im accepting the Terms & Condition`}
                            />
                        </Form.Group>
                        <Button variant="warning" disabled={disableEnable} className="submit offset-4" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </section>
    );
};
  
export default Register;
