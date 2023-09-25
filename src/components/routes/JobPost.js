import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import LoadingSpinner from "../elements/LoadingSpinner";
import SessionUser from '../elements/SessionUser';
import SideNav from '../elements/SideNav';

// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.css";


var parse = require('html-react-parser');

const JobPost = () => {
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;
    let name =  SessionUser.NAME;
    let isPremium =  SessionUser.MEMBERSHIP;
    const initialState = {
        site:ENDPOINT.SITE_ID,
        userId:userId,
        jobTitle: '',
        jobCode: '',
        jobDesc: '',
        jobPublished: '0'
    };

    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [formData, setFormData] = useState(initialState);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            fetch(ENDPOINT.JOB_POST_SUBMIT, {
                method: 'POST',
                body: JSON.stringify({ formData }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status === 'success') {
                    setResMsg(responseData.message);
                    setMsgColor('green');
                    setFormData(initialState);
                    window.scrollTo({top: 520,behavior: 'smooth'});     
                    setTimeout(function() { window.location.reload(); }, 3000);               
                } else {
                    setResMsg(responseData.message);
                    setMsgColor('red');
                    window.scrollTo({top: 520,behavior: 'smooth'});
                }
            })
            .catch((err) => {
                setResMsg(err.message);
                setMsgColor('red');
                window.scrollTo({top: 520,behavior: 'smooth'});
            });
        }
        setValidated(true);
    };
    const renderData = (
        <section className="full_width  d-flex justify-content-center align-items-center">
            <div className="container form_info_bg">
                <h2>Post a job</h2>
                <div className="form_info_box edt__prfl__cnt">
                    <div className="row">
                        <div className="col-2 drk__blu__bg">
                            <SideNav value={'job_post'} />
                        </div>
                        <div className="col-sm-10">
                            <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
                            <Form className='edt__pr__flds' noValidate validated={validated} onSubmit={handleSubmit}>
                                <h3>Fill up the below information to publish your Job</h3>
                                <Form.Group className="mb-3">
                                    <Form.Label>Job Role</Form.Label>
                                    <h4 className="font-weight-bold text-uppercase">Paralegal</h4>
                                </Form.Group>
                                <Form.Group className="mb-3" controlid="formJobTitle">
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control 
                                        required 
                                        type="textbox" 
                                        id="jobTitle" 
                                        controlid="formJobTitle" 
                                        name="jobTitle" 
                                        placeholder="Job Title"
                                        defaultValue={formData.jobTitle}
                                        onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                                        />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter job title.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlid="formJobCode">
                                    <Form.Label>Job Code</Form.Label>
                                    <Form.Control 
                                        required 
                                        type="textbox" 
                                        id="jobCode" 
                                        controlid="formJobCode" 
                                        name="jobCode" 
                                        placeholder="Job Code"
                                        defaultValue={formData.jobCode}
                                        onChange={e => setFormData({ ...formData, jobCode: e.target.value })}
                                        />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter job code.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlid="formJobDesc">
                                    <Form.Label>Job Description</Form.Label>
                                    <Form.Control 
                                        required 
                                        as="textarea" 
                                        rows={4} 
                                        id="jobDesc" 
                                        controlid="formJobDesc" 
                                        name="jobDesc" 
                                        placeholder="Job Description"
                                        defaultValue={formData.jobDesc}
                                        onChange={e => setFormData({ ...formData, jobDesc: e.target.value })}
                                            />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your job description.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlid="formJobPublished">
                                    <Form.Check 
                                        type="checkbox" 
                                        id="jobPublished"
                                        name="jobPublished"
                                        label="Publish" 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Button variant="warning" className="submit offset-4" type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
    return (
        <>
            {isLoading ? <LoadingSpinner /> : renderData}
        </>
    );
};
  
export default JobPost;
