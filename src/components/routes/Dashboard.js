import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import SessionUser from '../elements/SessionUser';

// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";
import { ProgressBar } from 'react-loader-spinner'
import { Link } from 'react-router-dom';

var parse = require('html-react-parser');

const Dashboard = () => {
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let user =  SessionUser.ID;
    let name =  SessionUser.NAME;
    let isPremium =  SessionUser.MEMBERSHIP;
    return (
        <section className="full_width membership">
            <div className="container">
                <h1 className="text-uppercase">Welcome {name} to dashboard</h1>
                <div className="spcl_bnft text-center">
                    {isPremium === '2' &&
                        <div className="row justify-content-md-center">
                            <div className="col-md-auto">
                                <Link to="/refer_an_associate" className="btn btn-lg btn-success">Refer an associate</Link>
                            </div>
                        </div>
                    }
                    <h4>Feature Links</h4>
                    <div className="row justify-content-md-center">
                        {isPremium === '2' &&
                            <div className="col-md-auto">
                                <Link to="/profile" className="btn btn-lg btn-success">My Profile</Link>
                            </div>
                        }
                        <div className="col-md-auto">
                            <Link to="/inbox/0" className="btn btn-lg btn-success">Inbox</Link>
                        </div>
                        <div className="col-md-auto">
                            <Link to="/my_job_post" className="btn btn-lg btn-success">My Jobs</Link>
                        </div>
                        <div className="col-md-auto">
                            <Link to="/job_post" className="btn btn-lg btn-success">Post Job</Link>
                        </div>
                        {isPremium === '2' &&
                            <div className="col-md-auto">
                                <Link to="/my_referral" className="btn btn-lg btn-success">My Referrals</Link>
                            </div>
                        }
                    </div>
                    <hr />
                    <div className="row justify-content-md-center mb-3">
                        <div className="col-md-auto">
                            <Link to="/search_jobs" className="btn btn-lg btn-info">Search Job</Link>
                        </div>
                        <div className="col-md-auto">
                            <Link to="/search_members" className="btn btn-lg btn-info">Search Members</Link>
                        </div>
                    </div>
                    <hr />
                    <h4>General Links</h4>
                    <div className="row justify-content-md-center mb-3">
                        <div className="col-md-auto">
                            <Link to="/account_edit" className="btn btn-lg btn-danger">Edit Account</Link>
                        </div>
                        <div className="col-md-auto">
                            <Link to="/" className="btn btn-lg btn-danger">Change Password</Link>
                        </div>
                        <div className="col-md-auto">
                            <Link to="/profile" className="btn btn-lg btn-danger">Membership</Link>
                        </div>
                        <div className="col-md-auto">
                            <Link to="/profile" className="btn btn-lg btn-danger">My Favorites</Link>
                        </div>
                        <div className="col-md-auto">
                            <Link to="/profile" className="btn btn-lg btn-danger">Inbox</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
  
export default Dashboard;
