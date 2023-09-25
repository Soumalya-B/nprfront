import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import { ProgressBar } from 'react-loader-spinner'
import { Link } from 'react-router-dom';

var parse = require('html-react-parser');

const Gallery = () => {
    let { slug } = useParams();
    let apiUrl = ENDPOINT.IMAGES_DATA;
    if (slug !== undefined) {
        apiUrl = ENDPOINT.IMAGES_DATA;
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
        if (pageData.data !== 0) {
            return (
                <>
                    <div className="innerpage-banner">
                        <Link to="/">
                            <img src={`${process.env.PUBLIC_URL}/assets/img/blog.jpeg`} alt="" />
                        </Link>
                    </div>
                    <div class="innerpage">
                        <div class="container">
                            <h1>Take a Tour!</h1>
                            <div class="image-gallery">
                                <div class="list-group gallery">
                                    <div class="row">
                                        {pageData.data.map((item, i) => {
                                            return (
                                                <div class="wrap col-sm-4 col-xs-6 col-md-3 col-lg-3" key={i}>
                                                    <a class="thumbnail fancybox" rel="ligthbox" href={item.imageLink}>
                                                        <img src={item.imageThumbLink} class="img-responsive" title={item.title} alt="" />
                                                    </a>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
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
  
export default Gallery;
