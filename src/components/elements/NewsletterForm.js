import React, { useEffect,useState } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";

const NewsletterForm = () => {
    
    const [validated, setValidated] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [formData, setFormData] = useState({site:1});

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            fetch(ENDPOINT.NEWSLETTER_SUBMIT, {
                method: 'POST',
                body: JSON.stringify({ formData }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status === 'success') {
                    setResMsg(responseData.message);
                    setFormData([]);
                } else {
                    setResMsg(responseData.message);
                    setFormData([]);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
        setValidated(true);
    };

    return (
        <>
            <div className="newsletter">
                <h3>Newsletter</h3>
                <p>To Subscribe our monthly newsletter</p>
                <p id='resMsg'>{resMsg}</p>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="input-prepend" controlId="formEmail">
                        <Form.Control 
                            required 
                            type="email" 
                            id="email" 
                            controlId="formEmail" 
                            name="email" 
                            placeholder="Enter your Email here"
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        <Form.Control.Feedback type="invalid">
                            Please enter email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="warning" className="btn btn-submit submitbutt" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default NewsletterForm;