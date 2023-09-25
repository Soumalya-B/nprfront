import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';

// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";
import { ProgressBar } from 'react-loader-spinner'
import { Link } from 'react-router-dom';

var parse = require('html-react-parser');

const Login = () => {
    const [validated, setValidated] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [formData, setFormData] = useState({site:ENDPOINT.SITE_ID});
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        let apiObject = {
            method: 'POST',
            body: JSON.stringify({ formData }),
            headers: { 'Content-Type': 'application/json' },
        };
        if (ENDPOINT.NO_API_MODE === 'YES') {
            apiObject = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            fetch(ENDPOINT.LOGIN_SUBMIT, apiObject)
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status === 'success') {
                    if (responseData.login) {
                        // Login TRUE
                        localStorage.setItem('sessionUser',JSON.stringify({
                            'isAuthenticated':true, 
                            'uid':responseData.uid, 
                            'name':responseData.name,
                            'membership':responseData.membership
                        }));
                        setResMsg(responseData.message);
                        setMsgColor('green');
                        setFormData([]);
                        localStorage.removeItem('sessionSelectedPlan');
                        window.location.href = ENDPOINT.APP_BASE_PATH + '/dashboard';
                    } else {
                        // Login FALSE
                        setResMsg(responseData.message);
                        setMsgColor('red');
                    }
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
                <h2>Neque porro quisquam est qui dolorem ipsum quia dolor</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                <div className="form_info_box">
                    <h3>Login</h3>
                    <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlid="formEmail">
                            <Form.Control 
                                required 
                                type="email" 
                                id="email" 
                                controlid="formEmail" 
                                name="email" 
                                placeholder="Email" 
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlid="formPassword">
                            <Form.Control 
                                required 
                                type="password" 
                                id="password" 
                                controlid="formPassword" 
                                name="password" 
                                placeholder="Password"
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="warning" className="submit offset-4" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <Link to="/forgot_password">Forgot password?</Link>
                </div>
            </div>
        </section>
    );
};
  
export default Login;
