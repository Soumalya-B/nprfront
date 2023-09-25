import React, { useEffect,useState } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import SessionUser from './SessionUser';
import LoadingSpinner from "../elements/LoadingSpinner";
import DatePicker from "react-datepicker";
// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import {State} from './MasterData';
import "react-datepicker/dist/react-datepicker.css";

const CompanyTabForm = () => {
    
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;
    let name =  SessionUser.NAME;
    let isPremium =  SessionUser.MEMBERSHIP;

    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const fieldObj = {
        companyName: '', 
        role: '', 
        workedFrom: '', 
        workedTo: '', 
        phone: '', 
        address1: '', 
        address2: '', 
        city: '', 
        state: '', 
        zip: '', 
        website: ''
    };
    const [addMoreFields, setAddMoreFields] = useState([fieldObj]);
    const [formData, setFormData] = useState({site:ENDPOINT.SITE_ID, userId:userId });
    const [presentCompany, setPresentCompany] = useState([]);
    const [endDateRequired, setEndDateRequired] = useState([]);
    const [endDateDisabled, setEndDateDisabled] = useState([]);
    const [apiData, setApidata] = useState([]);
    useEffect(() => {
        fetchProfileData();
    }, []);
    const fetchProfileData = () => {
        setIsLoading(true);
        fetch(ENDPOINT.PROFILE_DATA, {
            method: 'POST',
            body: JSON.stringify({ 'site' : ENDPOINT.SITE_ID, 'userId' : userId }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.status === 'success') {
                if (responseData.data.company !== null) {
                    setAddMoreFields(responseData.data.company);
                }
                setIsLoading(false);
            } else {
                setMsgColor('red');
                setResMsg(responseData.message);
                setIsLoading(false);
            }
        })
        .catch((err) => {
            setMsgColor('red');
            setResMsg(err.message);
            setIsLoading(false);
        });
    };
    const handleSubmit = (event) => {
        console.log(formData);
        setIsLoading(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            fetch(ENDPOINT.COMPANY_PROFILE_UPDATE, {
                method: 'POST',
                body: JSON.stringify({ formData }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status === 'success') {
                    setResMsg(responseData.message);
                    setMsgColor('green');
                    fetchProfileData();
                } else {
                    setResMsg(responseData.message);
                    setMsgColor('red');
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
                setResMsg(err.message);
                setMsgColor('red');
                setIsLoading(false);
            });
        }
        setValidated(true);
    };
    const handleFormChange = (index, event) => {
        let data = [...addMoreFields];
        data[index][event.target.name] = event.target.value;
        setAddMoreFields(data);
        setFormData({ ...formData, companySeries: data });
    }
    const handleDateChange = (index, name, event) => {
        let data = [...addMoreFields];
        let sDate = [];
        let dateObj = new Date(event);
        data[index][name] = dateObj.getFullYear() + '-' + dateObj.getMonth() + '-' + dateObj.getDate();
        sDate[index] = event;
        setAddMoreFields(data);
        setFormData({ ...formData, companySeries: data });
        if (name === 'workedFrom') {
            setStartDate(sDate);
        } else {
            setEndDate(sDate);
        }
    }
    const addFields = () => {
        setAddMoreFields([...addMoreFields, fieldObj])
    }
    const removeFields = (index, event) => {
        let data = [...addMoreFields];
        data.splice(index, 1);
        setAddMoreFields(data);
        setFormData({ ...formData, companySeries: data });
    }
    const presentWorkToggle = (index,event) => {
        let data = [];
        let rData = [];
        let dData = [];
        data[index] = (presentCompany[index]) ? false : true;
        rData[index] = (presentCompany[index]) ? false : true;
        dData[index] = (presentCompany[index]) ? true : false;
        setEndDateRequired(rData);
        setEndDateDisabled(dData);
        setPresentCompany(data);
    }
    let iRData = [];
    let iDData = [];
    const renderData = (
        <>
            <h2>Company Information</h2>
            <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
            <Form className='edt__pr__flds' noValidate validated={validated} onSubmit={handleSubmit}>
                {addMoreFields.map((input, index) => {
                    // {
                    //     if (input.workedTo === null) {
                    //         iDData[index] = true;
                    //         iRData[index] = false;
                    //         setEndDateRequired(iRData);
                    //         setEndDateDisabled(iDData);
                    //     } else {
                    //         iDData[index] = false;
                    //         iRData[index] = true;
                    //         setEndDateRequired(iRData);
                    //         setEndDateDisabled(iDData);
                    //     }
                    // }
                    return(
                        <div key={index}>
                            <h4><u>Company { index+1 }</u></h4>
                            <Form.Group className="mb-3" controlid="formCompanyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control 
                                    required 
                                    type="textbox" 
                                    id="companyName" 
                                    controlid="formCompanyName" 
                                    name="companyName" 
                                    placeholder="Company Name" 
                                    value={input.companyName}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter company name.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlid="formRole">
                                <Form.Label>Role/Designation</Form.Label>
                                <Form.Control 
                                    required 
                                    type="textbox" 
                                    id="role" 
                                    controlid="formRole" 
                                    name="role" 
                                    placeholder="Role/Designation"
                                    value={input.role}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter Role/Designation.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check 
                                    defaultChecked={(input.workedTo) ? false : true}
                                    type="checkbox" 
                                    onClick={event => presentWorkToggle(index, event)}
                                    label="I'm currently working here" 
                                />
                            </Form.Group>
                            <Row>
                                <Form.Group as={Col} controlid="formWorkedFrom">
                                    <Form.Label>Start Date</Form.Label>
                                    <DatePicker 
                                        className="form-control"
                                        required
                                        id="workedFrom" 
                                        controlid="formWorkedFrom" 
                                        name="workedFrom" 
                                        placeholder="Start Date" 
                                        value={input.workedFrom}
                                        onChange={event => handleDateChange(index, 'workedFrom', event)}
                                        dateFormat={'yyyy-MM-dd'}
                                        selected={startDate[index] ? startDate[index] : new Date()}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter start date.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlid="formWorkedTo">
                                    <Form.Label>End Date</Form.Label>
                                    <DatePicker 
                                        className="form-control"
                                        // required={endDateRequired}
                                        // disabled={endDateDisabled}
                                        required={(input.workedTo) ? false : endDateRequired}
                                        disabled={(input.workedTo === null) ? endDateDisabled : false}
                                        id="workedTo" 
                                        controlid="formWorkedTo" 
                                        name="workedTo" 
                                        placeholder="End Date" 
                                        value={input.workedTo}
                                        onChange={event => handleDateChange(index, 'workedTo', event)}
                                        dateFormat={'yyyy-MM-dd'}
                                        selected={(input.workedTo !== null) ? (endDate[index] ? endDate[index] : new Date()) : ''}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter end date.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlid="formAddressLine1">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control 
                                    required 
                                    type="textbox" 
                                    id="addressLine1" 
                                    controlid="formAddressLine1" 
                                    name="addressLine1" 
                                    placeholder="Address Line 1"
                                    value={input.addressLine1}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter Address Line 1.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlid="formAddressLine2">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control 
                                    required 
                                    type="textbox" 
                                    id="addressLine2" 
                                    controlid="formAddressLine2" 
                                    name="addressLine2" 
                                    placeholder="Address Line 2"
                                    value={input.addressLine2}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter Address Line 2.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Row>
                                <Form.Group as={Col} controlid="formCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control 
                                        required
                                        id="city" 
                                        controlid="formCity" 
                                        name="city" 
                                        placeholder="City" 
                                        value={input.city}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlid="formState">
                                    <Form.Label>State/Provinces</Form.Label>
                                    <Form.Select 
                                        required
                                        id="state" 
                                        controlid="formState" 
                                        name="state"
                                        //value={input.state}
                                        onChange={event => handleFormChange(index, event)}
                                        aria-label="Default select example" 
                                        className="form-control"
                                    >
                                        <State value={input.state} />
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlid="formZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control 
                                    required 
                                    type="textbox" 
                                    id="zip" 
                                    controlid="formZip" 
                                    name="zip" 
                                    placeholder="Zip Code" 
                                    value={input.zip}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter zip code.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlid="formPhone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="textbox" 
                                    id="phone" 
                                    controlid="formPhone" 
                                    name="phone" 
                                    placeholder="Phone Number" 
                                    value={input.phone}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter phone number.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlid="formWebsite">
                                <Form.Label>Website</Form.Label>
                                <Form.Control 
                                    type="textbox" 
                                    id="website" 
                                    controlid="formWebsite" 
                                    name="website" 
                                    placeholder="Website" 
                                    value={input.website}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter website.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <input type="hidden" name="id" id="id" value={input.id} />
                            { index !== 0 &&
                                <Form.Group className="mb-3">
                                    <Button variant="danger" className="btn-sm" type="button" onClick={e => removeFields(index, e)}>Remove</Button>
                                </Form.Group>}
                            <hr />
                        </div>
                    );
                })}
                <Form.Group className="mb-3">
                    <Button variant="info" className="btn-sm" type="button" onClick={addFields}>Add More..</Button>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="warning" className="submit" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
    return (
        <>
            {isLoading ? <LoadingSpinner /> : renderData}
        </>
    );
}

export default CompanyTabForm;