import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ENDPOINT from '../../constants/api-endpoints';
import LoadingSpinner from "../elements/LoadingSpinner";
import SessionUser from '../elements/SessionUser';
import SideNav from '../elements/SideNav';
import { Link } from 'react-router-dom';

// Bootstrap CSS
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";

const SearchJob = () => {
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;
    const initialState = {
        site:ENDPOINT.SITE_ID,
        userId:userId
    };
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
            fetch(ENDPOINT.JOB_SEARCH, apiObject)
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status === 'success') {
                    setApidata(responseData.data);
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
    const Items = ({ currentItems, totalItems }) => {
        return (
            <>
                <div className="heading">
                    <h2>Search Result(s) : <span>{ totalItems }</span></h2>
                </div>
                    
                <div className="srch-cntnt-tbl">
                    {currentItems.length > 0 ?
                            currentItems.map((item,i) => (
                                <div className="srchcnt">
                                    <h3>{item.title} (Code: {item.code})</h3>
                                    <div className="title-row">
                                        <i className="fa fa-clock-o" aria-hidden="true"></i> {item.created} 
                                    </div>
                                    <p>{item.desc}</p>
                                    <div className="text-right">
                                        <Link to="#">Apply for this job</Link>
                                    </div>
                                </div>
                        )) : 
                        <div className="srchcnt"><h3>No Record Found!!</h3></div>
                    }
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
                    <h2>Search Your Job</h2>
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
                                            placeholder="Job Title/Job Code" 
                                            defaultValue = {formData['jobSearch']}
                                            onChange={e => setFormData({ ...formData, jobSearch: e.target.value })}
                                            />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter job title or job code to search.
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
                <div className="container search-result">
                    <div className="form_info_box edt__prfl__cnt">
                        <div className="row">
                            <div className="col-2 drk__blu__bg">
                                <SideNav value={'search_jobs'} />
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
  
export default SearchJob;
