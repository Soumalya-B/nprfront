import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ENDPOINT from '../../constants/api-endpoints';
import SessionUser from '../elements/SessionUser';
import SideNav from '../elements/SideNav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'

import PersonalTabForm from "../elements/PersonalTabForm";
import CompanyTabForm from "../elements/CompanyTabForm";
import EducationTabForm from "../elements/EducationTabForm";
import SocialMediaTabForm from "../elements/SocialMediaTabForm";
import SkillsTabForm from "../elements/SkillsTabForm";
import SettingsTabForm from "../elements/SettingsTabForm";

// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import {State} from '../elements/MasterData';

const ProfileEdit = () => {
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('tab');
    const renderData = (
        <section className="full_width  d-flex justify-content-center align-items-center">
            <div className="container form_info_bg">
                <h2>My Profile</h2>
                <div className="form_info_box edt__prfl__cnt">
                    <div className="row">
                        <div className="col-sm-2 drk__blu__bg">
                            <SideNav value={'profile'} />
                        </div>
                        <div className="col-sm-10">
                                <Tabs
                                    defaultActiveKey={(myParam !== null ? myParam : 'personal')}
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="personal" title="Personal">
                                        <PersonalTabForm />
                                    </Tab>

                                    <Tab eventKey="company" title="Company">
                                        <CompanyTabForm />
                                    </Tab>

                                    <Tab eventKey="educations" title="Educations">
                                        <EducationTabForm />
                                    </Tab>

                                    <Tab eventKey="professional" title="Professional">
                                        <SkillsTabForm />
                                    </Tab>

                                    <Tab eventKey="socialmedia" title="Social Media">
                                        <SocialMediaTabForm />
                                    </Tab>

                                    <Tab eventKey="settings" title="Settings">
                                        <SettingsTabForm />
                                    </Tab>
                                </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
    return (
        <>
            {renderData}
        </>
    );
};
  
export default ProfileEdit;
