import React, { useEffect,useState } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import SessionUser from './SessionUser';
import LoadingSpinner from "../elements/LoadingSpinner";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";
import { Skill, Language, Specialization, SoftwareSubscription } from '../elements/MasterData';

const SkillsTabForm = () => {
    
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;
    const moreFields = { id: '', embededCode: '', image: '' };
    const [addMoreFields, setAddMoreFields] = useState([
        moreFields
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);

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
                const dataObj = {
                    ...formData,
                    skill: responseData.data.profile.skill.map(Number),
                    language: responseData.data.profile.language.map(Number),
                    specialization: responseData.data.profile.specialization.map(Number),
                    softwareSubscription: responseData.data.profile.softwareSubscription.map(Number),
                    associationMembership: responseData.data.associationMembership
                };
                setFormData(dataObj);
                if (responseData.data.associationMembership !== null) {
                    setAddMoreFields(responseData.data.associationMembership);
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
        const fileData = new FormData();
        selectedFile.forEach((file, i) => {
            fileData.append(`imageData-${i}`, file);
        });
        fileData.append('remainData', JSON.stringify({ formData }) );
        setIsLoading(true);
        console.log(fileData);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            fetch(ENDPOINT.PROFESSIONAL_PROFILE_UPDATE, {
                mode: 'no-cors',
                method: 'POST',
                body: fileData,
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
        setFormData({ ...formData, associationMembership: data });
    }
    const addFields = () => {
        setAddMoreFields([...addMoreFields, moreFields])
    }
    const removeFields = (index, event) => {
        let data = [...addMoreFields];
        data.splice(index, 1);
        setAddMoreFields(data);
        setFormData({ ...formData, associationMembership: data });
    }
    const changeFileHandler = (index,event) => {
        formData.associationMembership[index]['image'] = index;
        setFormData({ ...formData, associationMembership: formData.associationMembership });
        let data = [...selectedFile];
        data[index] = event.target.files[0];
        setSelectedFile(data);
    }
    const renderData = (
        <>
            <h2>Professional Informations</h2>
            <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
            <Form className='edt__pr__flds' encType="multipart/form-data" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlid="formSkill">
                    <Form.Label>Skills</Form.Label>
                    <Form.Select 
                        required
                        multiple
                        id="skill" 
                        controlid="formSkill"
                        name="skill" 
                        // defaultValue={formData.skill}
                        onChange={e => setFormData({ ...formData, skill: Array.from(e.target.selectedOptions, (x) => x.value) })} 
                        aria-label="Default select example" 
                        className="form-control"
                    >
                        <Skill value={formData.skill} />
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please choose skills.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formLanguage">
                    <Form.Label>Language</Form.Label>
                    <Form.Select 
                        required
                        multiple
                        id="language" 
                        controlid="formLanguage" 
                        name="language" 
                        // defaultValue={formData.language}
                        onChange={e => setFormData({ ...formData, language: Array.from(e.target.selectedOptions, (x) => x.value) })} 
                        aria-label="Default select example" 
                        className="form-control"
                    >
                        <Language value={formData.language} />
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please choose language.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formSpecialization">
                    <Form.Label>Specializations</Form.Label>
                    <Form.Select 
                        required
                        multiple
                        id="specialization" 
                        controlid="formSpecialization" 
                        name="specialization" 
                        onChange={e => setFormData({ ...formData, specialization: Array.from(e.target.selectedOptions, (x) => x.value) })} 
                        aria-label="Default select example" 
                        className="form-control"
                    >
                        <Specialization value={formData.specialization} />
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please choose specializations.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formSoftwareSubscription">
                    <Form.Label>Software Subscription</Form.Label>
                    <Form.Select 
                        required
                        multiple
                        id="softwareSubscription" 
                        controlid="formSoftwareSubscription" 
                        name="softwareSubscription" 
                        onChange={e => setFormData({ ...formData, softwareSubscription: Array.from(e.target.selectedOptions, (x) => x.value) })} 
                        aria-label="Default select example" 
                        className="form-control"
                    >
                        <SoftwareSubscription value={formData.softwareSubscription} />
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please choose software subscription.
                    </Form.Control.Feedback>
                </Form.Group><hr/>
                {addMoreFields.map((input, index) => {
                    return(
                        <div key={index}>
                            <h4><u>Association Membership { index+1 }</u></h4>
                            {/* <Form.Group className="mb-3" controlid="formEmbededCode">
                                <Form.Label>Embeded Code</Form.Label>
                                <Form.Control 
                                    required 
                                    as="textarea" 
                                    rows={4} 
                                    id="embededCode" 
                                    controlid="formEmbededCode" 
                                    name="embededCode" 
                                    placeholder="Embeded Code" 
                                    value={input.embedCode}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter Embeded Code.
                                </Form.Control.Feedback>
                            </Form.Group> */}
                            <Form.Group controlid="formImage" className="mb-3">
                                <Form.Label>
                                    <img src={input.imageThumbLink} />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlid="formImage" className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    id="image" 
                                    controlid="formImage" 
                                    name="image" 
                                    size="lg"
                                    onChange={event => changeFileHandler(index, event)}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please choose image.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlid="formLink">
                                <Form.Label>Image Link</Form.Label>
                                <Form.Control 
                                    required 
                                    as="textarea" 
                                    rows={4} 
                                    id="link" 
                                    controlid="formLink" 
                                    name="link" 
                                    placeholder="Image Link" 
                                    value={input.link}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter Imahe Link.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <input type="hidden" name="id" id="id" value={input.id} />
                            { index !== 0 &&
                                <Form.Group className="mb-3">
                                    <Button variant="danger" className="btn-sm" type="button" onClick={e => removeFields(index, e)}>Remove</Button>
                                </Form.Group>
                            }
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

export default SkillsTabForm;