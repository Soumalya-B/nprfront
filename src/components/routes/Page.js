import { useParams } from 'react-router-dom'
import React, { useState, useEffect, useMemo } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import LoadingSpinner from "../elements/LoadingSpinner";
import SideNav from '../elements/SideNav';
// import { ProgressBar } from 'react-loader-spinner'
import { Link } from 'react-router-dom';

var parse = require('html-react-parser');

const Page = () => {
    let { slug } = useParams();
    let initialState = {
        site:ENDPOINT.SITE_ID
    };

    const [isLoading, setIsLoading] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    let [pageData, setPage] = useState([]);
    useEffect(() => {
        fetchPageData(slug);
    }, [slug]);
    const fetchPageData = (slug) => {
        setIsLoading(true);
        fetch(ENDPOINT.PAGE_DATA + '/' + slug + '/' + ENDPOINT.SITE_ID, {
            method: 'GET',
            // body: JSON.stringify(initialState),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.status === 'error') {
                setMsgColor('red');
                setResMsg(responseData.message);
                setIsLoading(false);
            } else {
                setPage(responseData);
                setIsLoading(false);
            }
        })
        .catch((err) => {
            setMsgColor('red');
            setResMsg(err.message);
            setIsLoading(false);
        });
    };
    let pageTitle = '';
    let pageContent = '';
    if (pageData.length !== 0) {
        pageTitle = pageData.data.title;
        pageContent = pageData.data.content;
    }
    // if (pageData.length !== 0) {
    //     pageTitle = pageData.data.title;
    //     pageContent = pageData.data.content;
    //     if (!pageContent.data) {
    //         return (
    //             <>
    //                 <div className="innerpage-banner">
    //                     <Link to="/">
    //                         <img src={`${process.env.PUBLIC_URL}/assets/img/blog.jpeg`} alt="" />
    //                     </Link>
    //                 </div>
    //                 <div className="container">
    //                     <div className="innerpage">
    //                         <h1>{pageTitle}</h1>
    //                         {parse(pageContent)} 
    //                     </div>
    //                 </div>
    //             </>
    //         );
    //     } else {
    //         return (
    //             <div className="container">
    //                 <div className="innerpage">
    //                     <center>
    //                     <ProgressBar
    //                             height="80"
    //                             width="80"
    //                             ariaLabel="progress-bar-loading"
    //                             wrapperStyle={{textAlign: 'center', justifyContent: 'center'}}
    //                             wrapperClass="progress-bar-wrapper"
    //                             borderColor = '#f8de00'
    //                             barColor = '#570101'
    //                         />
    //                     </center>
    //                 </div>
    //             </div>
    //         );
    //     }
    // } else {
    //     return (
    //         <div className="container">
    //             <div className="innerpage">
    //                 <center>
    //                 <ProgressBar
    //                         height="80"
    //                         width="80"
    //                         ariaLabel="progress-bar-loading"
    //                         wrapperStyle={{textAlign: 'center', justifyContent: 'center'}}
    //                         wrapperClass="progress-bar-wrapper"
    //                         borderColor = '#f8de00'
    //                         barColor = '#570101'
    //                     />
    //                 </center>
    //             </div>
    //         </div>
    //     );
    // }
    const renderData = (
        <>
            <section className="full_width  d-flex justify-content-center align-items-center">
                <div className="container form_info_bg">
                    <h2>Message Inbox</h2>
                    <div className="form_info_box edt__prfl__cnt">
                        <div className="row">
                            <div className="col-sm-12">
                                <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
                                <div className="innerpage-banner">
                                    <Link to="/">
                                        <img src={`${process.env.PUBLIC_URL}/assets/img/blog.jpeg`} alt="" />
                                    </Link>
                                </div>
                                <div className="container">
                                    <div className="innerpage">
                                        <h1>{pageTitle}</h1>
                                        {parse(pageContent)} 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
    return (
        <>
            {isLoading ? <LoadingSpinner /> : renderData}
        </>
    );
};
  
export default Page;
