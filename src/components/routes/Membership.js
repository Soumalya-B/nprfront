import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';

var parse = require('html-react-parser');

const TopBlock = (props) => {
    const value = props.value;
    return (
        <>
            {parse(value.content)}
        </>
    );
}
const BottomBlock = (props) => {
    const value = props.value;
    return (
        <>
            {parse(value.content)}
        </>
    );
}
const PlanData = (props) => {
    const value = props.value;
    const setPlan = (value) => {
        if (localStorage.getItem('sessionReferalCode') !== null) {
            if (value == ENDPOINT.GUEST_MEM_ID) {
                value = ENDPOINT.PREMIUM_MEM_ID;
            }
        }
        localStorage.setItem('sessionSelectedPlan',value);
        window.location.href = ENDPOINT.APP_BASE_PATH + '/register';
    }
    return (
        <div className="row">
            {value.map((item, i) => {
                let count = i + 1;
                return (
                    <div className="col-sm-6" key={i}>
                        <div className="mbrshp_bx">
                            <h2>{item.title}</h2>
                            <div className="hdng_dv">
                                <MembershipPrice value={item} />
                            </div>
                            <div className="feature_list">
                                <h3>Features</h3>
                                {parse(item.content)}
                                { (item.moreContent) && <MoreFeatures value={item.moreContent} />}
                            </div>
                            <a onClick={() => setPlan(item.id)}>Register</a>
                        </div>
                    </div>
                );
            })};
        </div>
    );
}

const MoreFeatures = (props) => {
    const value = props.value;

    const [showFeature, setToggleFeatures] = useState('none');
    const showHideFeature = (value) => {
        setToggleFeatures(value);
    }
    return (
        <>
            <a className="moreclass" onClick={() => showHideFeature(`${(showFeature == 'none') ? 'block' : 'none'}`)}><i className="fa fa-info-circle" aria-hidden="true"></i> More Features <i className="fa fa-angle-double-right" aria-hidden="true"></i></a>
            <div className="data" style={{display: showFeature}}>
                {parse(value)}
            </div>
            <div className="clear"></div> 
        </>
    );
}

const MembershipPrice = (props) => {
    const value = props.value;
    if (value.amount != 0) {
        return (
            <div className="m_price">
                ${value.amount}
                <span>{value.duration}</span>
            </div>
        );
    } else {
        return (
            <img src={`${process.env.PUBLIC_URL}/assets/images/tag-img.png`} alt="" />
        );
    }
}

const Membership = () => {
    const [apiData, setApidata] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.MEMBERSHIP_LIST)
            .then((response) => response.json())
            .then((responseData) => {
                setApidata(responseData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    let topBlock = '';
    if (apiData.topBlock) {
        topBlock = <TopBlock value={apiData.topBlock} />;
    }
    let planData = '';
    console.log(apiData.data);
    if (apiData.data) {
        planData = <PlanData value={apiData.data} />;
    }
    let bottomBlock = '';
    if (apiData.bottomBlock) {
        bottomBlock = <BottomBlock value={apiData.bottomBlock} />;
    }

    return (
        <section className="full_width membership">
            <div className="container">
                {topBlock}
                {planData}
                <div className="spcl_bnft text-center">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/mbrshp_login_icon.png`} alt="" />
                    {bottomBlock}
                </div>
            </div>
        </section>
    );
};
  
export default Membership;
