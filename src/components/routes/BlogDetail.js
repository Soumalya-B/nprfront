import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import { ProgressBar } from 'react-loader-spinner'
import { Link } from 'react-router-dom';

var parse = require('html-react-parser');

const BlogDetail = () => {
    let { slug } = useParams();
    let apiUrl = ENDPOINT.BLOG_DATA;
    if (slug !== undefined) {
        apiUrl = ENDPOINT.BLOG_DATA + '/' + slug;
    }
    const [pageData, setPage] = useState([]);
    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((responseData) => {
                setPage(responseData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    if (pageData.length !== 0) {
        if (slug !== undefined) {
            let pageTitle = '';
            let pageContent = '';
            pageTitle = pageData.data.title;
            pageContent = pageData.data.content;
            if (!pageContent.data) {
                return (
                    <>
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
                    </>
                );
            } else {
                return (
                    <div className="container">
                        <div className="innerpage">
                            <center>
                            <ProgressBar
                                    height="80"
                                    width="80"
                                    ariaLabel="progress-bar-loading"
                                    wrapperStyle={{textAlign: 'center', justifyContent: 'center'}}
                                    wrapperClass="progress-bar-wrapper"
                                    borderColor = '#f8de00'
                                    barColor = '#570101'
                                />
                            </center>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <>
                    <div className="innerpage-banner">
                        <Link to="/">
                            <img src={`${process.env.PUBLIC_URL}/assets/img/blog.jpeg`} alt="" />
                        </Link>
                    </div>
                    <div className="container">
                        <div className="innerpage">
                            <h1>Blogs</h1>
                            {pageData.data.map((item, i) => {
                                return (
                                    <div className="blog">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="blog-thumb">
                                                    <img src="http://ke.mybetasite.net/webadmin/readandwritefiles//blog/1533734789-dental-blog-attract-patients..jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                            <h3>{item.title}</h3>
                                            {parse(item.content)}
                                            <Link to={`/blogs/${item.slug}`}>Read More</Link>     
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            );
        }
    } else {
        return (
            <div className="container">
                <div className="innerpage">
                    <center>
                    <ProgressBar
                            height="80"
                            width="80"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{textAlign: 'center', justifyContent: 'center'}}
                            wrapperClass="progress-bar-wrapper"
                            borderColor = '#f8de00'
                            barColor = '#570101'
                        />
                    </center>
                </div>
            </div>
        );
    }
};
  
export default BlogDetail;
