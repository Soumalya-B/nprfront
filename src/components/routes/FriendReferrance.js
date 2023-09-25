import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ENDPOINT from '../../constants/api-endpoints';
import SessionUser from '../elements/SessionUser';

const FriendReferrance = () => {
    let { referalCode } = useParams();
    if (SessionUser.IS_AUTHENTICATED !== false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/dashboard';
    }
    localStorage.setItem('sessionSelectedPlan',ENDPOINT.PREMIUM_MEM_ID);
    localStorage.setItem('sessionReferalCode',referalCode);
    
    window.location.href = ENDPOINT.APP_BASE_PATH + '/register';
};
  
export default FriendReferrance;
