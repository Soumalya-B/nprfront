import React, { useState, useEffect } from 'react';

import ENDPOINT from '../../constants/api-endpoints';
import { Link } from 'react-router-dom';
import NewsletterForm from '../elements/NewsletterForm';

var parse = require('html-react-parser');

const RefDentistBlock = (props) => {
    const value = props.value;
    return (
        <>
            <h3>{value.title}</h3>
            <p>{value.content}</p>
        </>
    );
}

const AddressBlock = (props) => {
    const value = props.value[0];
    return (
        <>
            <h3>{value.title}</h3>
            <p>{value.content}</p>
            <h3>Our Location</h3>
            <p>
                <span>
                    <i className="fa fa-map-marker"></i>
                </span>
                {value.addressLine1}<br />
                {value.addressLine2}, {value.city}<br />
                {value.state} - {value.pincode}
            </p>
        </>
    );
}

const Footer = () => {
    const goNav = (goto) => {
        window.location.href = goto;
    };
    const [settingsData, setSettings] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.SETTINGS_DATA)
            .then((response) => response.json())
            .then((responseData) => {
                setSettings(responseData.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    let siteName = '';
    let phone = '';
    let socialFacebook = '';
    let socialYelp = '';
    let socialYoutube = '';
    let socialGoogle = '';
    let socialTwitter = '';
    let referringDentist = '';
    if (settingsData.length !== 0) {
        settingsData.map((item, i) => {
            if (item.slug === 'site-name') { siteName = item.content; }
            if (item.slug === 'phone') { phone = item.content; }
            if (item.slug === 'facebook') { socialFacebook = item.content; }
            if (item.slug === 'yelp') { socialYelp = item.content; }
            if (item.slug === 'youtube') { socialYoutube = item.content; }
            if (item.slug === 'google') { socialGoogle = item.content; }
            if (item.slug === 'twitter') { socialTwitter = item.content; }
            if (item.slug === 'referring-dentist') { referringDentist = <RefDentistBlock value={item} />; }
        });
    }
    const [addressData, setAddress] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.ADDRESS_DATA)
            .then((response) => response.json())
            .then((responseData) => {
                setAddress(responseData.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    let addressBlock = '';
    if (addressData.length !== 0) {
        addressBlock = <AddressBlock value={addressData} />;
    }
    const [menuData, setMenus] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.NAV_MENU)
            .then((response) => response.json())
            .then((responseData) => {
                setMenus(responseData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    let listItems = [];
    if (menuData.length !== 0) {
        const hNav = menuData.Footer;
        listItems = hNav;
    }
    return (
        <footer className="full_width footer_main">
            <div className="footer_top">
                <div className="container">
                <div className="row"> 
                    <div className="col-sm-6 col-lg-3">
                        <h3><span>Legal Registries, LLC.</span></h3>
                        <p>
                        Legal Registries, LLC. owns National Attorney Registry, National Paralegal Registry, and Legal Staff Registry. 
                        Our Corporate Offices are located in Hermosa Beach, California. All of our websites are ADA Compliant for the convenience of our members and visitors. 
                        Please feel free to contact us through our contact form on any of our websites. </p>
                    </div>     
                    <div className="col-sm-6 col-lg-3">
                        <h3>Quick Links</h3>
                        <div className="foot_menu d-flex">
                            <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Benefits</a></li>
                            <li><a href="#">Education</a></li>
                            <li><a href="#">News/Blog</a></li>
                            <li><a href="#">Resources  </a></li>     
                            <li><a href="#">Sponsors</a></li>
                            </ul>
                            <ul>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Terms & Condition</a></li>
                            <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <h3>Follow Us</h3>
                        <ul className="d-flex justify-content-start">
                            <li><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#" target="_blank"><i className="fa fa-linkedin"></i></a></li>
                        </ul>
                        <ul className="d-flex justify-content-around">
                            <li><a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/g-ply.png`} alt="" /></a></li>
                            <li><a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/app-str.png`} alt="" /></a></li>
                        </ul>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <h3>Newsletter</h3>
                        <p>Sign up for our newsletter updates</p>
                        {/* <form className="nwsLtr">
                            <input type="text">
                            <input type="submit" value="Subscribe">
                        </form> */}
                    </div>

                </div>
                </div>


            </div>

            <div className="full_width copy_right">
                <div className="container">
                <p>Copyright 2022 © Legal Registries, LLC. All rights reserved</p>
                    
                </div>
            </div>
        </footer>
        // <footer>
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-sm-3">
        //                 {referringDentist}
        //             </div>
        //             <div className="col-sm-3">
        //                 <h3>Important Links</h3>
        //                 <ul className="foot-links">
        //                     {listItems.map((menu, index) => {
        //                         return (
        //                             <li>
        //                                 <a onClick={() => goNav(menu.url) }>{menu.title}</a>
        //                             </li> 
        //                         );
        //                     })};   
        //                 </ul>
        //             </div>			
        //             <div className="col-sm-3">
        //                 <NewsletterForm />
        //             </div>
        //             <div className="col-sm-3">
        //                 {addressBlock}
        //                 <p><span><i className="fa fa-phone"></i></span>{phone}</p>
        //                 <h3 className="footersub">Follow Us</h3>
        //                 <ul className="socialicons">
        //                     {socialFacebook &&
        //                         <li>
        //                             <a target="_blank" href={socialFacebook} rel="noopener noreferrer">
        //                                 <i className="fa fa-facebook" aria-hidden="true"></i>
        //                             </a>
        //                         </li>
        //                     }
        //                     {socialYelp &&
        //                         <li>
        //                             <a target="_blank" href={socialYelp} rel="noopener noreferrer">
        //                                 <i className="fa fa-yelp" aria-hidden="true"></i>
        //                             </a>
        //                         </li>
        //                     }
        //                     {socialYoutube &&
        //                         <li>
        //                             <a target="_blank" href={socialYoutube} rel="noopener noreferrer">
        //                                 <i className="fa fa-youtube-play" aria-hidden="true"></i>
        //                             </a>
        //                         </li>
        //                     }
        //                     {socialGoogle &&
        //                         <li>
        //                             <a target="_blank" href={socialGoogle} rel="noopener noreferrer">
        //                                 <i className="fa fa-google-plus" aria-hidden="true"></i>
        //                             </a>
        //                         </li>
        //                     }
        //                     {socialTwitter &&
        //                         <li>
        //                             <a target="_blank" href={socialTwitter} rel="noopener noreferrer">
        //                                 <i className="fa fa-twitter" aria-hidden="true"></i>
        //                             </a>
        //                         </li>
        //                     }
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>
        //     <section className="copyright">
        //         {new Date().getFullYear()} &copy; All Rights Reserved | {siteName} 
        //     </section>
        // </footer> 
    );
}

export default Footer;