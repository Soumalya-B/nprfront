import React, { useEffect,useState } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import SessionUser from './SessionUser';
import LoadingSpinner from "../elements/LoadingSpinner";
// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {State} from './MasterData';

const PersonalTabForm = () => {
    
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;
    let name =  SessionUser.NAME;
    let isPremium =  SessionUser.MEMBERSHIP;

    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);

    const [formData, setFormData] = useState({site:ENDPOINT.SITE_ID, userId:userId });
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
                setApidata(responseData.data);
                const dataObj = {
                    ...formData,
                    firstName: responseData.data.user.firstName,
                    lastName: responseData.data.user.lastName,
                    companyName: responseData.data.profile.companyName,
                    phone: responseData.data.user.phone,
                    addressLine1: responseData.data.user.addressLine1,
                    addressLine2: responseData.data.user.addressLine2,
                    city: responseData.data.user.city,
                    state: responseData.data.user.state,
                    zip: responseData.data.user.zip,
                    bio: responseData.data.profile.bio,
                    video: responseData.data.profile.video,
                    profileImage: responseData.data.profile.profileImageLink,
                    profileImageThumb: responseData.data.profile.profileImageThumbLink
                };
                setFormData(dataObj);
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
        const fileData = new FormData();
        fileData.append('profileImage', selectedFile );
        fileData.append('remainData', JSON.stringify({ formData }) );
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            fetch(ENDPOINT.PERSONAL_PROFILE_UPDATE, {
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
    const changeFileHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    }
    const renderData = (
        <>
            <h2>Personal Informations</h2>
            <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
            <Form className='edt__pr__flds' noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlid="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        required 
                        type="textbox" 
                        id="firstName" 
                        controlid="formFirstName" 
                        name="firstName" 
                        placeholder="First Name" 
                        defaultValue={apiData.length !== 0 ? apiData.user.firstName : ''}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    <Form.Control.Feedback type="invalid">
                        Please enter first name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        required 
                        type="textbox" 
                        id="lastName" 
                        controlid="formLastName" 
                        name="lastName" 
                        placeholder="Last Name" 
                        defaultValue={apiData.length !== 0 ? apiData.user.lastName : ''}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    <Form.Control.Feedback type="invalid">
                        Please enter last name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        required 
                        readOnly
                        type="email" 
                        id="email" 
                        controlid="formEmail" 
                        name="email" 
                        placeholder="Email" 
                        defaultValue={apiData.length !== 0 ? apiData.user.email : ''}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    <Form.Control.Feedback type="invalid">
                        Please enter email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control 
                        required 
                        type="textbox" 
                        id="phone" 
                        controlid="formPhone" 
                        name="phone" 
                        placeholder="Phone" 
                        defaultValue={apiData.length !== 0 ? apiData.user.phone : ''}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    <Form.Control.Feedback type="invalid">
                        Please enter phone.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control 
                        required 
                        as="textarea" 
                        rows={4} 
                        id="bio" 
                        controlId="formBio" 
                        name="bio" 
                        placeholder="Bio"
                        defaultValue={apiData.length !== 0 ? apiData.profile.bio : ''}
                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                            />
                    <Form.Control.Feedback type="invalid">
                        Please put your bio.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formAddressLine1">
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control 
                        required 
                        type="textbox" 
                        id="addressLine1" 
                        controlid="formAddressLine1" 
                        name="addressLine1" 
                        placeholder="Address Line 1" 
                        defaultValue={apiData.length !== 0 ? apiData.user.addressLine1 : ''}
                        onChange={e => setFormData({ ...formData, addressLine1: e.target.value })}
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
                        defaultValue={apiData.length !== 0 ? apiData.user.addressLine2 : ''}
                        onChange={e => setFormData({ ...formData, addressLine2: e.target.value })}
                        />
                    <Form.Control.Feedback type="invalid">
                        Please enter Address Line 2.
                    </Form.Control.Feedback>
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlid="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                            required
                            id="city" 
                            controlid="formCity" 
                            name="city" 
                            placeholder="City" 
                            defaultValue={apiData.length !== 0 ? apiData.user.city : ''}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlid="formState">
                        <Form.Label>State/Provinces</Form.Label>
                        <Form.Select 
                            required
                            id="state" 
                            controlid="formState" 
                            name="state" 
                            value={apiData.length !== 0 ? apiData.user.state : ''}
                            onChange={e => setFormData({ ...formData, state: e.target.value })} 
                            aria-label="Default select example" 
                            className="form-control"
                        >
                            <State value={apiData.length !== 0 ? apiData.user.state : ''} />
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
                        defaultValue={apiData.length !== 0 ? apiData.user.zip : ''}
                        onChange={e => setFormData({ ...formData, zip: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter zip code.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formVideo">
                    <Form.Label>Video (Embeded Code Only)</Form.Label>
                    <Form.Control 
                        required 
                        as="textarea" 
                        rows={4} 
                        id="video" 
                        controlId="formVideo" 
                        name="video" 
                        placeholder="Video Embedded Code"
                        defaultValue={apiData.length !== 0 ? apiData.profile.video : ''}
                        onChange={e => setFormData({ ...formData, video: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please put your video.
                    </Form.Control.Feedback>
                </Form.Group>
                <Row className="mb-3">
                    <Col xs lg="2">
                        {formData.profileImageThumb && <Form.Group controlid="formImage" className="mb-3">
                            <Form.Label>
                                <img src={formData.profileImageThumb} />
                            </Form.Label>
                        </Form.Group>}
                    </Col>
                    <Col xs lg="10">
                        <Form.Group as={Col} controlId="formProfileImage" className="mb-3">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control 
                                type="file" 
                                id="profileImage" 
                                controlId="formProfileImage" 
                                name="profileImage"
                                size="lg"
                                onChange={changeFileHandler} />
                                <Form.Control.Feedback type="invalid">
                                    Please choose your Picture.
                                </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
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

export default PersonalTabForm;