import React, { useEffect,useState } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import SessionUser from './SessionUser';
import LoadingSpinner from "../elements/LoadingSpinner";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";

const EducationTabForm = () => {
    
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;

    const [addMoreFields, setAddMoreFields] = useState([
        { institution: '', degree: '', complitionYear: '' }
    ]);
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
                if (responseData.data.education !== null) {
                    setAddMoreFields(responseData.data.education);
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
    const handleFormChange = (index, event) => {
        let data = [...addMoreFields];
        data[index][event.target.name] = event.target.value;
        setAddMoreFields(data);
        setFormData({ ...formData, educationSeries: data });
    }
    const addFields = () => {
        let newfield = { institution: '', degree: '', complitionYear: '' }
        setAddMoreFields([...addMoreFields, newfield])
    }
    const removeFields = (index, event) => {
        let data = [...addMoreFields];
        data.splice(index, 1);
        setAddMoreFields(data);
        setFormData({ ...formData, educationSeries: data });
    }
    const renderData = (
        <>
            <h2>Educational Informations</h2>
            <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
            <Form className='edt__pr__flds' noValidate validated={validated} onSubmit={handleSubmit}>
                {addMoreFields.map((input, index) => {
                    return(
                        <div key={index}>
                            <h4><u>Education { index+1 }</u></h4>
                            <Form.Group className="mb-3" controlid="formInstitution">
                                <Form.Label>School/Institution</Form.Label>
                                <Form.Control 
                                    required 
                                    type="textbox" 
                                    id="institution" 
                                    controlid="formInstitution" 
                                    name="institution" 
                                    placeholder="School/Institution" 
                                    value={input.institution}
                                    onChange={event => handleFormChange(index, event)}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please enter School/Institution.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlid="formDegree">
                                <Form.Label>Degree/Certification</Form.Label>
                                <Form.Control 
                                    required 
                                    type="textbox" 
                                    id="degree" 
                                    controlid="formDegree" 
                                    name="degree" 
                                    placeholder="Degree/Certification" 
                                    value={input.degree}
                                    onChange={event => handleFormChange(index, event)}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please enter Degree/Certification.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlid="formComplitionYear">
                                <Form.Label>Year of complition</Form.Label>
                                <Form.Control 
                                    required 
                                    type="textbox" 
                                    id="complitionYear" 
                                    controlid="formComplitionYear" 
                                    name="complitionYear" 
                                    placeholder="Year of complition" 
                                    value={input.complitionYear}
                                    onChange={event => handleFormChange(index, event)}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please enter Year of complition.
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

export default EducationTabForm;