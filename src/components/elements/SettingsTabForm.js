import React, { useEffect,useState } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import SessionUser from './SessionUser';
import LoadingSpinner from "./LoadingSpinner";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.css";


const SettingsTabForm = () => {
    
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');

    const [formData, setFormData] = useState({site:ENDPOINT.SITE_ID, userId:userId });
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
                // if (responseData.data.education !== null) {
                //     setAddMoreFields(responseData.data.education);
                // }
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
        setIsLoading(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            fetch(ENDPOINT.EDUCATION_PROFILE_UPDATE, {
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
                    window.scrollTo({top: 520,behavior: 'smooth'}); 
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
    const renderData = (
        <>
            <h2>Settings</h2>
            <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
            <Form className='edt__pr__flds' noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formCity">
                        <Form.Label>Display Email</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="formState">
                        <BootstrapSwitchButton
                            checked={false}
                            onlabel='Yes'
                            offlabel='No'
                            onstyle="outline-success" 
                            offstyle="outline-danger"
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formCity">
                        <Form.Label>Display Phone Number</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="formState">
                        <BootstrapSwitchButton
                            checked={false}
                            onlabel='Yes'
                            offlabel='No'
                            onstyle="outline-success" 
                            offstyle="outline-danger"
                        />
                    </Form.Group>
                </Row>
                <input type="hidden" name="id" id="id"  />
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

export default SettingsTabForm;