import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import LoadingSpinner from "../elements/LoadingSpinner";
import SessionUser from '../elements/SessionUser';
import ProfileRenderData from '../elements/ProfileRenderData';
const Profile = () => {
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;
    let apiObject = {
        method: 'POST',
        body: JSON.stringify({ 'site' : ENDPOINT.SITE_ID, 'userId' : userId }),
        headers: { 'Content-Type': 'application/json' },
    };
    if (ENDPOINT.NO_API_MODE === 'YES') {
        apiObject = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
    }
    const [isLoading, setIsLoading] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [apiData, setApidata] = useState({});
    useEffect(() => {
        fetchProfileData();
    }, []);
    const fetchProfileData = () => {
        setIsLoading(true);
        fetch(ENDPOINT.PROFILE_DATA, apiObject)
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.status === 'success') {
                setApidata(responseData.data);
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
    return (
        <>
            {isLoading ? <LoadingSpinner /> : <ProfileRenderData value={apiData} error={[resMsg,msgColor]} version='nonpublic' />}
        </>
    );
};
  
export default Profile;
