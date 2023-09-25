import React, { useEffect,useState } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";

const ContactForm = () => {
    
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
            fetch(ENDPOINT.CONTACT_SUBMIT, {
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
            <h2>Query / Feedback</h2>
            <p id='resMsg'>{resMsg}</p>
            <Form className="form-horizontal" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control 
                        required 
                        type="text" 
                        id="name" 
                        controlId="formName" 
                        name="name" 
                        placeholder="Enter Name"
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    <Form.Control.Feedback type="invalid">
                        Please enter name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Control 
                        required 
                        type="email" 
                        id="email" 
                        controlId="formEmail" 
                        name="email" 
                        placeholder="Enter Email" 
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    <Form.Control.Feedback type="invalid">
                        Please enter email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Control 
                        required 
                        as="textarea" 
                        rows={4} 
                        id="message" 
                        controlId="formMessage" 
                        name="message" 
                        placeholder="Question or Comment"
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                            />
                    <Form.Control.Feedback type="invalid">
                        Please put your question or comment.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="warning" className="btn btn-submit submitbutt" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default ContactForm;