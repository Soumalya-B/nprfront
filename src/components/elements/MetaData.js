import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import {Helmet} from "react-helmet";

const MetaData = () => {
    const [metaData, setMeta] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.META_DATA + '/1')
        .then((response) => response.json())
        .then((responseData) => {
            setMeta(responseData);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);
    let currentPath = window.location.pathname;
    let defaultMetaTitle = '';
    let defaultMetaKeywords = '';
    let defaultMetaDesc = '';
    let defaultMetaCanonical = '';
    let metaTitle = '';
    let metaKeywords = '';
    let metaDesc = '';
    let metaCanonical = '';
    if (metaData.length !== 0) {
        defaultMetaTitle = metaData.default.metaTitle;
        defaultMetaKeywords = metaData.default.metaKeywords;
        defaultMetaDesc = metaData.default.metaDescription;
        defaultMetaCanonical = metaData.default.metaCanonical;
        metaData.page.map((item, i) => {
            let itemPath = item.path;
            if (item.path !== '/') {
                itemPath = item.path;
            }
            if (itemPath === currentPath) {
                metaTitle = (item.metaTitle) ? item.metaTitle : defaultMetaTitle;
                metaKeywords = (item.metaKeywords) ? item.metaTitle : defaultMetaKeywords;
                metaDesc = (item.metaDescription) ? item.metaTitle : defaultMetaDesc;
                metaCanonical = (item.metaCanonical) ? item.metaTitle : defaultMetaCanonical;
            }
            return true;
        });
    }
    return (
        <Helmet>
            <title>{metaTitle}</title>
            <meta name="keyword" content={metaKeywords} />
            <meta name="description" content={metaDesc} />
            <link rel='canonical' href={metaCanonical} />
        </Helmet>
    );
}

export default MetaData;