import React, { useState, useEffect } from 'react';

import ENDPOINT from '../../constants/api-endpoints';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


var parse = require('html-react-parser');

const Banner = () => {
    const [bannerData, setPosts] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.BANNER_LIST)
            .then((response) => response.json())
            .then((responseData) => {
                setPosts(responseData.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    return (
        <OwlCarousel id="myCarousel" className='owl-theme regular slider' data-ride="carousel" nav dots={false} autoplay loop items={1}>
            {bannerData.map((item, i) => {
                return (
                    <div key={i}>
                        <img src={item.imageLink} alt={ `banner_${i}` } />
                    </div>
                );
            })}
        </OwlCarousel>
    );
}

export default Banner;
