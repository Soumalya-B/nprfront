import React, { useEffect,useState } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import SessionUser from './SessionUser';
import LoadingSpinner from "../elements/LoadingSpinner";
// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";

const SocialMediaTabForm = () => {
    
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
                if (responseData.data.socialMedia !== null) {
                    const dataObj = {
                        ...formData,
                        id: (responseData.data.socialMedia.id) ? responseData.data.socialMedia.id : '',
                        website: (responseData.data.profile.website) ? responseData.data.profile.website : '',
                        facebook: (responseData.data.socialMedia.facebook) ? responseData.data.socialMedia.facebook : '',
                        linkedin: (responseData.data.socialMedia.linkedin) ? responseData.data.socialMedia.linkedin : '',
                        twitter: (responseData.data.socialMedia.twitter) ? responseData.data.socialMedia.twitter : '',
                        instagram: (responseData.data.socialMedia.instagram) ? responseData.data.socialMedia.instagram : '',
                        google: (responseData.data.socialMedia.google) ? responseData.data.socialMedia.google : '',
                        youtube: (responseData.data.socialMedia.youtube) ? responseData.data.socialMedia.youtube : '',
                        tiktok: (responseData.data.socialMedia.tiktok) ? responseData.data.socialMedia.tiktok : ''
                    };
                    setFormData(dataObj);
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
            fetch(ENDPOINT.SOCIALHANDLE_PROFILE_UPDATE, {
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
            <h2>Social Handles</h2>
            <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
            <Form className='edt__pr__flds' noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlid="formWebsite">
                    <Form.Label>Website</Form.Label>
                    <Form.Control 
                         
                        type="textbox" 
                        id="website" 
                        controlid="formWebsite" 
                        name="website" 
                        placeholder="Website" 
                        defaultValue={formData.website}
                        onChange={e => setFormData({ ...formData, website: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter Website.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formFacebook">
                    <Form.Label>Facebook Link</Form.Label>
                    <Form.Control 
                         
                        type="textbox" 
                        id="facebook" 
                        controlid="formFacebook" 
                        name="facebook" 
                        placeholder="Facebook Link" 
                        defaultValue={formData.facebook}
                        onChange={e => setFormData({ ...formData, facebook: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter Facebook Link.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formTwitter">
                    <Form.Label>Twitter Link</Form.Label>
                    <Form.Control 
                         
                        type="textbox" 
                        id="twitter" 
                        controlid="formTwitter" 
                        name="twitter" 
                        placeholder="Twitter Link" 
                        defaultValue={formData.twitter}
                        onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter Twitter link.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formLinkedin">
                    <Form.Label>LinkedIn Link</Form.Label>
                    <Form.Control 
                         
                        type="textbox" 
                        id="linkedin" 
                        controlid="formLinkedin" 
                        name="linkedin" 
                        placeholder="LinkedIn Link" 
                        defaultValue={formData.linkedin}
                        onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter LinkedIn Link.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formInstagram">
                    <Form.Label>Instagram Link</Form.Label>
                    <Form.Control 
                         
                        type="textbox" 
                        id="instagram" 
                        controlid="formInstagram" 
                        name="instagram" 
                        placeholder="Instagram Link" 
                        defaultValue={formData.instagram}
                        onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter Instagram Link.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formGoogle">
                    <Form.Label>Google Link</Form.Label>
                    <Form.Control 
                         
                        type="textbox" 
                        id="google" 
                        controlid="formGoogle" 
                        name="google" 
                        placeholder="Google Link" 
                        defaultValue={formData.google}
                        onChange={e => setFormData({ ...formData, google: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter Google Link.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formYoutube">
                    <Form.Label>Youtube Link</Form.Label>
                    <Form.Control 
                         
                        type="textbox" 
                        id="youtube" 
                        controlid="formYoutube" 
                        name="youtube" 
                        placeholder="Youtube Link" 
                        defaultValue={formData.youtube}
                        onChange={e => setFormData({ ...formData, youtube: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter Youtube Link.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlid="formTiktok">
                    <Form.Label>Tiktok Link</Form.Label>
                    <Form.Control 
                         
                        type="textbox" 
                        id="tiktok" 
                        controlid="formTiktok" 
                        name="tiktok" 
                        placeholder="Tiktok Link" 
                        defaultValue={formData.tiktok}
                        onChange={e => setFormData({ ...formData, tiktok: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter Tiktok Link.
                    </Form.Control.Feedback>
                </Form.Group>
                <input type="hidden" name="id" id="id" value={formData.id} />
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

export default SocialMediaTabForm;