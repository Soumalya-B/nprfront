import React, { useState, useEffect } from 'react';
import ENDPOINT from '../../constants/api-endpoints';
import LoadingSpinner from "../elements/LoadingSpinner";
import SessionUser from '../elements/SessionUser';
import SideNav from '../elements/SideNav';
import InboxNav from '../elements/InboxNav';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Bootstrap CSS
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "bootstrap/dist/css/bootstrap.css";

var parse = require('html-react-parser');

const Chatbox = (props) => {
    const cValue = props.value;
    const sUser = props.sUser;
    return (
        cValue ? <ul>
            {cValue.map((item, i) => {
                return (
                    <>
                        <li>
                            <div className="divider">
                                <h6>{item.date}</h6>
                            </div>
                        </li>
                        {item.chat.map((loop, k) => {
                            return (
                                <li className={`${(loop.sender == sUser) ? 'repaly' : 'sender'}`}>
                                    <p>{loop.msg}</p>
                                    <span className="time">{loop.time}</span>
                                </li>
                            )
                        })}
                    </>
                )
            })}
        </ul> : <><div>No Chat History</div></>
    );
}

const Inbox = () => {
    let { uid } = useParams() || 0;
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;
    let name =  SessionUser.NAME;
    let isPremium =  SessionUser.MEMBERSHIP;
    let initialState = {
        site:ENDPOINT.SITE_ID,
        userId:userId,
        receiver: uid
    };

    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [formData, setFormData] = useState(initialState);
    const [apiData, setApidata] = useState([]);
    const [userListData, setuserListdata] = useState([]);
    const [currentChatData, setCurrentChatdata] = useState([]);
    useEffect(() => {
        fetchMessageData(uid);
    }, [uid]);
    const fetchMessageData = (userId) => {
        setIsLoading(true);
        initialState = {...initialState, receiver: userId};
        setFormData(initialState);
        fetch(ENDPOINT.MSG_DATA, {
            method: 'POST',
            body: JSON.stringify(initialState),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.status === 'success') {
                setuserListdata(responseData.data.allReceiverList);
                setApidata(responseData.data.message);
                setCurrentChatdata(responseData.data.chatReceiver);
                setIsLoading(false);
            } else {
                setMsgColor('red');
                setResMsg(responseData.message);
                setIsLoading(false);
            }
        })
        .catch((err) => {
            setMsgColor('red');
            setResMsg(err.message);
            setIsLoading(false);
        });
    };
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            fetch(ENDPOINT.MSG_SUBMIT, {
                method: 'POST',
                body: JSON.stringify({ formData }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status === 'success') {
                    setResMsg(responseData.message);
                    setMsgColor('green');
                    setFormData(initialState);     
                    fetchMessageData(initialState.receiver);         
                    window.scrollTo({top: 520,behavior: 'smooth'});
                    setFormData({ ...formData, postMsg: "" })
                } else {
                    setResMsg(responseData.message);
                    setMsgColor('red');
                    window.scrollTo({top: 520,behavior: 'smooth'});
                }
            })
            .catch((err) => {
                setResMsg(err.message);
                setMsgColor('red');
                window.scrollTo({top: 520,behavior: 'smooth'});
            });
        }
        setValidated(true);
    };
    let chatName = name;
    if (currentChatData && currentChatData.name) {
        chatName = currentChatData.name;
    }
    let chatDesg = '';
    if (currentChatData && currentChatData.designation) {
        chatDesg = currentChatData.designation;
    }
    let chatPic = `${process.env.PUBLIC_URL}/assets/images/profile_dummy.jpg`;
    if (currentChatData && currentChatData.profileImageThumbLink) {
        chatPic = currentChatData.profileImageThumbLink;
    }
    
    const renderData = (
        <>
            <section className="full_width  d-flex justify-content-center align-items-center">
                <div className="container form_info_bg">
                    <h2>Message Inbox</h2>
                    <div className="form_info_box edt__prfl__cnt">
                        <div className="row">
                            <div className="col-2 drk__blu__bg">
                                <SideNav value={'inbox/0'} />
                            </div>
                            <div className="col-sm-8">
                                <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
                                <div className="chatbox">
                                    <div className="modal-dialog-scrollable">
                                        <div className="modal-content">
                                            <div className="msg-head">
                                                <div className="row">
                                                    <div className="col-8">
                                                        <div className="d-flex align-items-center">
                                                            <span className="chat-icon">
                                                                <img className="img-fluid" src={chatPic} alt={chatName} width={45} />
                                                            </span>
                                                            <div className="flex-shrink-0">
                                                                <img className="img-fluid" src={chatPic} alt={chatName} width={45} />
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h3>{chatName}</h3>
                                                                <p>{chatDesg}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {isLoading ? <LoadingSpinner /> : 
                                            <div className="modal-body">
                                                <div className="msg-body">
                                                    <Chatbox value={apiData} sUser={userId} />
                                                </div>
                                            </div>}
                                            <div className="send-box">
                                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                    <Form.Control 
                                                        type="textbox" 
                                                        id="postMsg" 
                                                        controlId="formPostMsg" 
                                                        name="postMsg" 
                                                        placeholder="Write message…"
                                                        value={formData.postMsg}
                                                        onChange={e => setFormData({ ...formData, postMsg: e.target.value })}
                                                        />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please write your message.
                                                    </Form.Control.Feedback>
                                                    <Button variant="warning" className="submit" type="submit">
                                                        <i className="fa fa-paper-plane" aria-hidden="true"></i> Send
                                                    </Button>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 drk__grn__bg">
                                <InboxNav value={uid} uList={userListData} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
    return (
        <>
            {renderData}
        </>
    );
};
  
export default Inbox;
