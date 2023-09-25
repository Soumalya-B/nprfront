import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import LoadingSpinner from "../elements/LoadingSpinner";
import SessionUser from '../elements/SessionUser';
import SideNav from '../elements/SideNav';
import { Link } from 'react-router-dom';



// Bootstrap CSS
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "bootstrap/dist/css/bootstrap.css";

var parse = require('html-react-parser');

const ContentBlock = (props) => {
    const value = props.value;
    return (
        <>
            {parse(value)}
        </>
    );
}
const ReferAFriend = () => {
    
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;
    let isPremium =  SessionUser.MEMBERSHIP;

    const [currentReferral, setRefdata] = useState([]);
    const [currentReferralContent, setApidata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    useEffect(() => {
        fetchRefData();
    }, []);
    const fetchRefData = () => {
        setIsLoading(true);
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
        fetch(ENDPOINT.MY_REFERRAL_DATA, apiObject)
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.status === 'success') {
                let refLink = ENDPOINT.APP_BASE_PATH + '/friendreferrance/' + responseData.data.referralCode;
                setRefdata(refLink);
                setApidata(responseData.data.referralContent);
                setIsLoading(false);
            } else {
                setMsgColor('red');
                setApidata(responseData.data.referralContent);
                let refLink = ENDPOINT.APP_BASE_PATH + '/friendreferrance/' + responseData.data.referralCode;
                setRefdata(refLink);
                setResMsg(responseData.message);
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.log(err.message);
            setIsLoading(false);
        });
    };
    const copyToClipBoard = async copyMe => {
        try {
          await navigator.clipboard.writeText(copyMe);
          setResMsg('Copied!');
          setMsgColor('green');
        } catch (err) {
            setResMsg('Failed to copy!');
            setMsgColor('red');
        }
        setTimeout(function(){setResMsg('')}, 5000);
    };
    let contentBlock = '';
    if (currentReferralContent.content) {
        contentBlock = <ContentBlock value={currentReferralContent.content} />;
    }
    const renderData = (
        <section className="full_width  d-flex justify-content-center align-items-center membership">
            <div className="container">
                <h1 className="text-center">Refer An Associate</h1>
                <div className="row justify-content-md-center pb-5">
                    <div className="col-md-auto text-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/mbrshp_login_icon.png`}/>
                    </div>
                </div>
                <div className="row justify-content-md-center pb-2">
                    <div className="col-md-8 text-center">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Referral Code</InputGroup.Text>
                            <Form.Control
                                className="mb-0"
                                placeholder="My Referral Code"
                                size='lg'
                                value={currentReferral} 
                            />
                            <Button variant="success" id="button-addon2" onClick={(e) => copyToClipBoard(currentReferral)}>
                                Copy
                            </Button>
                        </InputGroup>
                        <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
                    </div>
                </div>
                <div className="row justify-content-md-center pb-2">
                    <div className="col-md-auto text-center shareRefer">
                        <ul>
                            <li>Share via:</li>
                            <li><a href="#" title="Via Email"><i class="fa fa-envelope fa-2x" aria-hidden="true"></i></a></li>
                            <li><a href="#" title="Via Facebook"><i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i></a></li>
                            <li><a href="#" title="Via Whatsapp"><i class="fa fa-whatsapp fa-2x" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-md-center pb-5">
                    <div className="col-md-auto text-center spcl_bnft">
                        {contentBlock}
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
  
export default ReferAFriend;
