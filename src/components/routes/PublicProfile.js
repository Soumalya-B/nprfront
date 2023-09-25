import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ENDPOINT from '../../constants/api-endpoints';
import LoadingSpinner from "../elements/LoadingSpinner";
import ProfileRenderData from '../elements/ProfileRenderData';
const PublicProfile = () => {
    let { slug } = useParams();
    let userId =  '';
    const [isLoading, setIsLoading] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [apiData, setApidata] = useState({});
    useEffect(() => {
        fetchProfileData();
    }, []);
    const fetchProfileData = () => {
        setIsLoading(true);
        fetch(ENDPOINT.PROFILE_DATA, {
            method: 'POST',
            body: JSON.stringify({ 'site' : ENDPOINT.SITE_ID, 'userId' : userId, 'displayName' : slug }),
            headers: { 'Content-Type': 'application/json' },
        })
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
            {isLoading ? <LoadingSpinner /> : <ProfileRenderData value={apiData} error={[resMsg,msgColor]} version='public' />}
        </>
    );
};
  
export default PublicProfile;
