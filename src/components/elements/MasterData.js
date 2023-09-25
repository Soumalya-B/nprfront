import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
var parse = require('html-react-parser');

//State List
export const State = (props) => {
    const value = props.value;
    const [stateData, setStateData] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.STATE_LIST)
            .then((response) => response.json())
            .then((responseData) => {
                setStateData(responseData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    // var options = '<option>Choose State</option>';
    // stateData.map((item, i) => {
    //     let selectVal = (value == item.name) ? 'selected' : '';
    //     options += '<option value="'+ item.id +'" ' + selectVal + '>' + item.name + '</option>';
    // });
    // return (
    //     <>
    //         {parse(options)}
    //     </>
    // );
    let options = stateData.map((item, i) => {
        let selectVal = (value == item.id) ? true : false;
        return (
            <option key={i} value={item.id} selected={selectVal}>{item.name}</option>
        );
    });
    return options;
}

//Skills List
export const Skill = (props) => {
    const value = props.value;
    const [stateData, setStateData] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.SKILL_LIST)
            .then((response) => response.json())
            .then((responseData) => {
                setStateData(responseData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    let options = stateData.map((item, i) => {
        let selectVal = value.includes(item.id);
        return (
            <option key={i} value={item.id} selected={selectVal}>{item.name}</option>
        );
    });
    return options;
}

//Language List
export const Language = (props) => {
    const value = props.value;
    const [stateData, setStateData] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.LANGUAGE_LIST)
            .then((response) => response.json())
            .then((responseData) => {
                setStateData(responseData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    let options = stateData.map((item, i) => {
        let selectVal = value.includes(item.id);
        return (
            <option key={i} value={item.id} selected={selectVal}>{item.name}</option>
        );
    });
    return options;
}

//Specialization List
export const Specialization = (props) => {
    const value = props.value;
    const [stateData, setStateData] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.SPECIALIZATION_LIST)
            .then((response) => response.json())
            .then((responseData) => {
                setStateData(responseData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    let options = stateData.map((item, i) => {
        let selectVal = value.includes(item.id);
        return (
            <option key={i} value={item.id} selected={selectVal}>{item.name}</option>
        );
    });
    return options;
}

//Software Subscription List
export const SoftwareSubscription = (props) => {
    const value = props.value;
    const [stateData, setStateData] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.SOFTWARE_SUBSCRIPTION_LIST)
            .then((response) => response.json())
            .then((responseData) => {
                setStateData(responseData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    let options = stateData.map((item, i) => {
        let selectVal = value.includes(item.id);
        return (
            <option key={i} value={item.id} selected={selectVal}>{item.name}</option>
        );
    });
    return options;
}

export default {State, Skill, Language, Specialization, SoftwareSubscription};