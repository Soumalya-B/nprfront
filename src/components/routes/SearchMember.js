import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ENDPOINT from '../../constants/api-endpoints';
import LoadingSpinner from "../elements/LoadingSpinner";
import SessionUser from '../elements/SessionUser';
import SideNav from '../elements/SideNav';
import { Link } from 'react-router-dom';
import {
//     FacebookShareCount,
//     PinterestShareCount,
//     VKShareCount,
//     OKShareCount,
//     RedditShareCount,
//     TumblrShareCount,
//     HatenaShareCount,
//     FacebookShareButton,
//     FacebookMessengerShareButton,
//     FacebookMessengerIcon,
//     LinkedinShareButton,
//     TwitterShareButton,
//     PinterestShareButton,
//     VKShareButton,
//     OKShareButton,
//     TelegramShareButton,
//     WhatsappShareButton,
//     RedditShareButton,
//     EmailShareButton,
//     TumblrShareButton,
//     LivejournalShareButton,
//     MailruShareButton,
//     ViberShareButton,
//     WorkplaceShareButton,
//     LineShareButton,
//     WeiboShareButton,
//     PocketShareButton,
//     InstapaperShareButton,
//     HatenaShareButton,
//     FacebookIcon,
//     TwitterIcon,
//     LinkedinIcon,
//     PinterestIcon,
//     VKIcon,
//     OKIcon,
//     TelegramIcon,
//     WhatsappIcon,
//     RedditIcon,
//     TumblrIcon,
//     MailruIcon,
    EmailIcon,
//     LivejournalIcon,
//     ViberIcon,
//     WorkplaceIcon,
//     LineIcon,
//     PocketIcon,
//     InstapaperIcon,
//     WeiboIcon,
//     HatenaIcon,
  } from "react-share";

// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.css";

const SearchMember = () => {
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;
    let isPremium =  SessionUser.MEMBERSHIP;
    const initialState = {
        site:ENDPOINT.SITE_ID,
        userId:userId
    };
    const firstState = {
        site:ENDPOINT.SITE_ID,
        userId:userId
    };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (profileId) => {
        setShow(true);
        setFormESFData({ ...formESFData, profileId: profileId });
    }

    const [errMsgESF, setErrMsgESF] = useState('');
    const [msgColorESF, setMsgColorESF] = useState('');
    const [formESFData, setFormESFData] = useState(firstState);
    const [ESFShow, setESFShow] = useState('none');
    const handleESFClose = () => setESFShow('none');
    const handleESFShow = () => {
        setESFShow('block');
        setFormESFData({ ...formESFData, type: 'EMAIL' });
    }
    
    const [isLoading, setIsLoading] = useState(false);
    const [items, setApidata] = useState([]);
    const [validated, setValidated] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [formData, setFormData] = useState(initialState);
    const handleSubmit = (event) => {
        setIsLoading(true);
        let apiObject = {
            method: 'POST',
            body: JSON.stringify({ formData }),
            headers: { 'Content-Type': 'application/json' },
        };
        if (ENDPOINT.NO_API_MODE === 'YES') {
            apiObject = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
        }
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            fetch(ENDPOINT.PROFILE_SEARCH, apiObject)
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status === 'success') {
                    setApidata(responseData.data);
                    setResMsg('');
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
        }
        setValidated(true);
    }
    const handleShareable = (event) => {
        let shareApiUrl = '';
        if (formESFData.type === 'EMAIL') {
            shareApiUrl = ENDPOINT.EMAIL_SHARE;
        }
        let apiObject = {
            method: 'POST',
            body: JSON.stringify({ formESFData }),
            headers: { 'Content-Type': 'application/json' },
        };
        const form = event.currentTarget;
        console.log(event);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            fetch(shareApiUrl, apiObject)
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status === 'success') {
                    //setApidata(responseData.data);
                    setErrMsgESF('');
                } else {
                    setMsgColorESF('red');
                    setErrMsgESF(responseData.message);
                }
            })
            .catch((err) => {
                setMsgColorESF('red');
                setErrMsgESF(err.message);
            });
        }
        setValidated(true);
    }
    const Items = ({ currentItems, totalItems }) => {
        // const shareUrl = 'http://github.com';
        // const title = 'GitHub';
        return (
            <>
                <div className="heading">
                    <h2>Search Result(s) : <span>{ totalItems }</span></h2>
                </div>
                    
                <div className="srch-cntnt-tbl">
                    {currentItems.length > 0 ?
                            currentItems.map((item,i) => (
                                <div className="profile-box d-flex">
                                    <img src={(item.profileImageThumbLink) ? item.profileImageThumbLink : `${process.env.PUBLIC_URL}/assets/images/profile-thumb.jpg`} alt="" />
                                    <div className="p-cnt-blk">
                                        <div className="row searchProfileItem">
                                            <div className="col-6"><h3>{item.firstName} {item.lastName}</h3></div>
                                            <div className="col-6 text-right">
                                                <ul>
                                                    <li><Link to={`/inbox/${item.id}`}><i className="fa fa-comments" aria-hidden="true"></i></Link></li>
                                                    {/* <li><EmailShareButton
                                                            url={shareUrl}
                                                            subject={title}
                                                            body="<table><tr><th>Name</th><th>ID</th><tr><tr><th>Soumalya</th><th>134234</th><tr><table>"
                                                        >onClick={() => handleShareable('EMAIL',item.id)}
                                                            <EmailIcon size={16} round />
                                                        </EmailShareButton></li> */}
                                                    <li><Link to="#" onClick={() => handleShow(item.id)} ><i className="fa fa-share-alt" aria-hidden="true"></i></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h4><i className="fa fa-envelope-o" aria-hidden="true"></i> {item.email}</h4>
                                        <p>{item.bio}</p>
                                        {isPremium === '2' && 
                                            <Link to={`/paralegal/${item.displayName}`}>See full profile <i className="fa fa-angle-double-right" aria-hidden="true"></i></Link>
                                        }
                                    </div>
                                </div>
                        )) : 
                        <div className="srchcnt"><h3>No Record Found!!</h3></div>
                    }
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Share Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Link onClick={handleESFShow} title="Email">
                                <EmailIcon size={45} round  />
                            </Link>
                            <div id="emailShareForm" style={{display:ESFShow}}>
                                <p id='errMsgESF' style={{color: msgColorESF}}>{errMsgESF}</p>
                                <Form noValidate validated={validated} onSubmit={handleShareable}>
                                    <div className="d-flex">
                                        <Form.Group controlId="formEmailShare">
                                            <Form.Control 
                                                required
                                                as="textarea" 
                                                rows={1} 
                                                id="emailsShare" 
                                                controlId="formEmailShare" 
                                                name="emailsShare" 
                                                placeholder="Enter emails"
                                                defaultValue = {formESFData['emailsShare']}
                                                onBlur={e => setFormESFData({ ...formESFData, emailsShare: e.target.value })}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter email ids.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <div className="pl-3">
                                            <Button variant="warning" className="submit" type="submit">
                                                Share
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="srch-fld">Enter multiple email ids separated by (,) comma.</div>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        );
    }
    const PaginatedItems = ({ itemsPerPage }) => {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = items.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(items.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };
        return (
            <>
                <Items currentItems={currentItems} totalItems={items.length} />
                <nav aria-label="Page navigation comments" className="mt-4 mb-4">
                    <ReactPaginate
                        previousLabel="previous"
                        nextLabel="next"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        renderOnZeroPageCount={null}
                    />
                </nav>
            </>
        );
    }
    const renderData = (
        <>
            <section className="full_width j_s_r_page">
                <div className="container">
                    <h2>Profile Search Result</h2>
                    <div className="form_info_bg">
                        <div className="form_auto_search_field">
                            <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <div className="d-flex">
                                    <Form.Group className="srch-fld" controlId="formJobSearch">
                                        <Form.Control 
                                            type="textbox" 
                                            id="jobSearch" 
                                            controlId="formJobSearch" 
                                            name="jobSearch" 
                                            placeholder="name" 
                                            defaultValue = {formData['jobSearch']}
                                            onChange={e => setFormData({ ...formData, jobSearch: e.target.value })}
                                            />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter name to search.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="srch-fld">
                                    <Button variant="warning" className="submit" type="submit">
                                        Search
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="full_width search-result">
                <div className="container">
                    <div className="srch-cntnt-tbl">
                        <div className="row">
                            <div className="col-2 drk__blu__bg">
                                <SideNav value={'search_members'} />
                            </div>
                            <div className="col-sm-10">
                                <PaginatedItems itemsPerPage={4} />
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
  
export default SearchMember;
