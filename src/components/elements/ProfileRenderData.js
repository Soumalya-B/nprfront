import React, { useState, useEffect } from 'react';
import SessionUser from '../elements/SessionUser';
import { Link } from 'react-router-dom';

var parse = require('html-react-parser');

export default function ProfileRenderData(props) {
    const profileVersion = props.version;
    const apiData = props.value;
    const resMsg = props.error[0];
    const msgColor = props.error[1];
    const [isShowMore, setShowMore] = useState(true);
    const BioText = (props) => {
        const text = props.value;
        const len = 300;
        return (
            <>
                {isShowMore ? parse(text.slice(0, len)) : parse(text)}
                {text && text.length > len && (
                    <Link onClick={toggleReadMore}>
                        {isShowMore ? "... show more" : "show less"}
                    </Link>
                )}
            </>
        );
    }
    const toggleReadMore = (e) => {
        if (isShowMore){
            setShowMore(false);
        } else {
            setShowMore(true);
        }
    }
    let uname = '';
    let profileImage = '';
    let bio = '';
    let email = '';
    let phone = '';
    let website = '';
    let designation = '';
    let address = '';
    let video = '';
    let badge = '';
    let education = [];
    let skill = [];
    let language = [];
    let specialization = [];
    let softwareSubscription = [];
    let company = [];
    let facebookLink = '';
    let linkedInLink = '';
    let twitterLink = '';
    let youtubeLink = '';
    let googleLink = '';
    let instagramLink = '';
    let tiktokLink = '';
    if (apiData.user) {
        uname = apiData.user.firstName + " " + apiData.user.lastName;
        email = apiData.user.email;
        designation = apiData.user.designation;
        phone = apiData.user.phone;
        address = parse(apiData.user.addressLine1 + "<br>" + apiData.user.addressLine2 + "<br>" + apiData.user.city + ", " + apiData.user.state + "-" + apiData.user.zip);
    }
    if (apiData.profile) {
        profileImage = (apiData.profile.profileImageLink) ? apiData.profile.profileImageLink : `${process.env.PUBLIC_URL}/assets/images/profile_dummy.jpg`;
        bio = <BioText value={apiData.profile.bio} />
        website = apiData.profile.website;
        video = parse(apiData.profile.video);
        if (apiData.profile.skillData) {
            skill = apiData.profile.skillData;
        }
        if (apiData.profile.languageData) {
            language = apiData.profile.languageData;
        }
        if (apiData.profile.specializationData) {
            specialization = apiData.profile.specializationData;
        }
        if (apiData.profile.softwareSubscriptionData) {
            softwareSubscription = apiData.profile.softwareSubscriptionData;
        }
    }
    if (apiData.education) {
        education = apiData.education;
    }
    if (apiData.company) {
        company = apiData.company;
    }
    if (apiData.associationMembership) {
        badge = apiData.associationMembership;
    }
    if (apiData.socialMedia) {
        facebookLink = apiData.socialMedia.facebook || null;
        linkedInLink = apiData.socialMedia.linkedin || null;
        twitterLink = apiData.socialMedia.twitter || null;
        youtubeLink = apiData.socialMedia.youtube || null;
        googleLink = apiData.socialMedia.google || null;
        instagramLink = apiData.socialMedia.instagram || null;
        tiktokLink = apiData.socialMedia.tiktok || null;
    }
    return (
        <section className="full_width profile_details">
            <div className="container">
                <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="profile_info">
                            <div className="p_pic">
                                <img src={profileImage} alt={uname} title={uname} />
                            </div>
                            {bio && <><h3>Biography</h3><p>{bio}</p></>}
                            {badge.length !== 0 && 
                                <div className="associationWrapper">
                                    <h3>Associations</h3>
                                    <ul>
                                        {badge.map(function(item, i) {
                                            return (
                                                <li key={i}><a href={item.link} target="_blank"><img src={item.imageLink} /></a></li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            }
                            {video && <><h3>Video</h3><p>{video}</p></>}
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="profile_content">
                            <div className="float-right edit-btn">
                                {(profileVersion === 'nonpublic') && 
                                    <Link className="btn btn-danger" to="/profile_edit">Edit Profile</Link>
                                }
                                {(profileVersion === 'public') && 
                                    <Link className="btn btn-danger" to="#"><i className="fa fa-share-alt" aria-hidden="true"></i></Link>
                                }
                            </div>
                            <h2>{uname}</h2>
                            {designation && <h4>{designation}</h4>}
                            <ul>
                                {phone && <li><i className="fa fa-phone" aria-hidden="true"></i> {phone}</li>}
                                <li><i className="fa fa-envelope-o" aria-hidden="true"></i> {email}</li>
                                {address && <li><i className="fa fa-map-marker" aria-hidden="true"></i> {address}</li>}
                                {website && <li><i className="fa fa-globe" aria-hidden="true"></i> <a href={website} target='_blank'>{website}</a></li>}
                            </ul>
                            <div className="float-right social-icons">
                                <ul>
                                    {facebookLink && <li><a href={facebookLink} target="_blank"><i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i></a></li>}
                                    {linkedInLink && <li><a href={linkedInLink} target="_blank"><i class="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a></li>}
                                    {twitterLink && <li><a href={twitterLink} target="_blank"><i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i></a></li>}
                                    {instagramLink && <li><a href={instagramLink} target="_blank"><i class="fa fa-instagram fa-2x" aria-hidden="true"></i></a></li>}
                                    {googleLink && <li><a href={googleLink} target="_blank"><i class="fa fa-google fa-2x" aria-hidden="true"></i></a></li>}
                                    {youtubeLink && <li><a href={youtubeLink} target="_blank"><i class="fa fa-youtube-square fa-2x" aria-hidden="true"></i></a></li>}
                                    {tiktokLink && <li><a href={tiktokLink} target="_blank">Tiktok</a></li>}
                                </ul>
                            </div>
                            <div className="detail_cnt">
                                {language.length !== 0 &&
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h3>Language</h3>
                                        </div>
                                        <div className="col-sm-9">
                                            <ul>
                                                {language.map(function(item, i) {
                                                    return (
                                                        <li key={i}>{item}</li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                }
                                {company &&
                                    <div className="row education">
                                        <div className="col-sm-3">
                                            <h3>Professional Experiences</h3>
                                        </div>
                                        <div className="col-sm-9">
                                            {company.map(function(item, i) {
                                                return (
                                                    <>
                                                        <h4 key={i}>{item.companyName}</h4>
                                                        <div className="eduSubWrap" key={i}>
                                                            <p>{item.role}</p>
                                                            <p>{item.city}, {item.state}</p>
                                                            <span>{item.workedFrom} - {(item.workedTo !== '') ? item.workedTo : 'Current'}</span>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                        </div>
                                    </div>
                                }
                                {skill.length !== 0 &&
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h3>Skill</h3>
                                        </div>
                                        <div className="col-sm-9">
                                            <ul>
                                                {skill.map(function(item, i) {
                                                    return (
                                                        <li key={i}>{item}</li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                }
                                {specialization.length !== 0 &&
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h3>Specialization Areas</h3>
                                        </div>
                                        <div className="col-sm-9">
                                            <ul>
                                                {specialization.map(function(item, i) {
                                                    return (
                                                        <li key={i}>{item}</li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                }
                                {softwareSubscription.length !== 0 &&
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h3>Software Subscription</h3>
                                        </div>
                                        <div className="col-sm-9">
                                            <ul>
                                                {softwareSubscription.map(function(item, i) {
                                                    return (
                                                        <li key={i}>{item}</li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                }
                                {education &&
                                    <div className="row education">
                                        <div className="col-sm-3">
                                            <h3>Education</h3>
                                        </div>
                                        <div className="col-sm-9">
                                            {education.map(function(item, i) {
                                                return (
                                                    <>
                                                        <h4 key={i}>{item.institution}</h4>
                                                        <div className="eduSubWrap" key={i}>
                                                            <p>{item.degree}</p>
                                                            <span>{item.complitionYear}</span>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}