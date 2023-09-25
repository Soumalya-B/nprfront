import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ENDPOINT from '../../constants/api-endpoints';
import Banner from "../elements/Banner";

var parse = require('html-react-parser');

const MembersBenefitsBlock = (props) => {
    const value = props.value;
    return (
        <>
            {parse(value.content)}
        </>
    );
}
const JobBlock = (props) => {
    const value = props.value;
    return (
        <>
            {parse(value.content)}
        </>
    );
}
const AboutUsBlock = (props) => {
    const value = props.value;
    return (
        <>
            {parse(value.content)}
        </>
    );
}
const FeaturesBlock = (props) => {
    const value = props.value;
    return (
        <div className="row">
            {value.data.map((item, i) => {
                let count = i + 1;
                return (
                    <div className="col-sm-3" key={i}>
                        <div className="ftr-bx">
                            <div className="d-flex align-items-center justify-content-between">
                                <h3>{item.title} - </h3>
                                <div className="icon"><img src={`${process.env.PUBLIC_URL}/assets/images/ftrs_${count}.png`} /></div>
                            </div>
                            {parse(item.content)}
                        </div>
                    </div>
                );
            })};
        </div>
    );
}

const BlogBlock = (props) => {
    const value = props.value;
    return (
        <div className="row"> 
            {value.data.map((item, i) => {
                return (
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 ">
                        <figure className="blgThmb">
                            <img src={item.image} alt="images" />
                            <h3 className="d-flex ">
                                <i className="fa fa-user" aria-hidden="true"></i>&nbsp;{item.postBy}
                            </h3>
                            {parse(item.content)}
                            <div className="ftr">
                                <i className="fa fa-calendar" aria-hidden="true"></i> {item.date}
                                <a href={`/blogs/${item.slug}`} >Read More</a>
                            </div>
                        </figure>
                    </div>
                );
            })}
        </div>
    );
}

const Home = () => {
    const [homepageData, setHomepage] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.HOMEPAGE_DATA)
            .then((response) => response.json())
            .then((responseData) => {
                setHomepage(responseData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    let membersBenefitsBlock = '';
    if (homepageData.membersBenefitsBlock) {
        membersBenefitsBlock = <MembersBenefitsBlock value={homepageData.membersBenefitsBlock} />;
    }
    let jobBlock = '';
    if (homepageData.jobBlock) {
        jobBlock = <JobBlock value={homepageData.jobBlock} />;
    }
    let aboutUsBlock = '';
    if (homepageData.aboutUsBlock) {
        aboutUsBlock = <AboutUsBlock value={homepageData.aboutUsBlock} />;
    }
    let featuresBlock = '';
    if (homepageData.featuresList) {
        featuresBlock = <FeaturesBlock value={homepageData.featuresList} />;
    }
    let blogBlock = '';
    if (homepageData.blogList) {
        blogBlock = <BlogBlock value={homepageData.blogList} />;
    }
    return (
        <>  
            <section className="full_width banner">
                <div className="container-fluid g-0">
                    <div className="row g-0">
                    <div className="col-sm-6">
                        <Banner />
                    </div>
                    <div className="col-sm-6">
                        <div className="memberBenifit">
                            {membersBenefitsBlock}
                        </div>
                    </div>
                    </div>
                    </div>
                </section>
                <section className="full_width cta_blk_yellow d-flex justify-content-center align-items-center">
                <Link to="/membership">Find Your Paralegal</Link>
                </section>
                <section className="full_width programsec">
                <div className="container text-center">
                    <h2>Membership Feature</h2>
                    {featuresBlock}
                </div>
                </section>
                <section className="full_width cta_blk_blue d-flex justify-content-center align-items-center">
                    <a href="#">Click to Join</a>
                </section>

                <section className="full_width jobBoard text-center">
                    <div className="container">
                        {jobBlock}
                    </div>
                </section>

                <section className="full_width CS-block">
                <div className="container">
                    <div className="row"> 
                        <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <div className="caseStudies" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/partners.png)` }} >
                            <img src={`${process.env.PUBLIC_URL}/assets/images/partners_icon.png`} alt="" />
                            <div className="clearfix"></div>
                            <div className="cntrTp">
                                <span data-toggle="counter-up">103</span>
                                <h4>Partners</h4>
                            </div>
                            
                            </div>
                        </div>
                        <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <div className="caseStudies" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/cases.png)` }}>
                            <img src={`${process.env.PUBLIC_URL}/assets/images/cases_icon.png`} alt="" />
                            <div className="clearfix"></div>
                            <div className="cntrTp">
                            <span data-toggle="counter-up">253 </span>
                            <h4>Cases Done</h4>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <div className="caseStudies" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/happyClients.png)` }}>
                            <img src={`${process.env.PUBLIC_URL}/assets/images/happy-clients_icon.png`} alt="" />
                            <div className="clearfix"></div>
                            <div className="cntrTp">
                            <span data-toggle="counter-up">63 </span>
                            <h4>Happy Clients</h4>
                        </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <div className="caseStudies" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/award.png)` }}>
                            <img src={`${process.env.PUBLIC_URL}/assets/images/award-icon.png`} alt="" />
                            <div className="clearfix"></div>
                            <div className="cntrTp">
                            <span data-toggle="counter-up">18 </span>
                            <h4>Award Win</h4>
                            </div>
                            </div>
                        </div>
                    </div>

                    <h2>About Us</h2>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/abt-us-bnr.jpg`} alt="" />
                        </div>
                        <div className="col-12 col-sm-6 text-start">
                            {aboutUsBlock}
                        </div>
                    </div>
                </div>
                </section>

                <section className="full_width btmBlog">
                <h2 className="text-center">In The News/Blog</h2>
                <div className="container">
                    {blogBlock}
                </div>
                </section>
        </>
    );
};
  
export default Home;
