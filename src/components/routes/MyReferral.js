import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ENDPOINT from '../../constants/api-endpoints';
import LoadingSpinner from "../elements/LoadingSpinner";
import SessionUser from '../elements/SessionUser';
import SideNav from '../elements/SideNav';
import { Link } from 'react-router-dom';

// Bootstrap CSS
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "bootstrap/dist/css/bootstrap.css";

const MyReferral = () => {
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;
    let isPremium =  SessionUser.MEMBERSHIP;

    const [currentReferral, setRefdata] = useState([]);
    const [items, setApidata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    useEffect(() => {
        fetchRefData();
    }, []);
    const fetchRefData = () => {
        setIsLoading(true);
        let apiObject = {
            method: 'POST',
            body: JSON.stringify({ 'site' : ENDPOINT.SITE_ID, 'userId' : userId }),
            headers: { 'Content-Type': 'application/json' },
        };
        if (ENDPOINT.NO_API_MODE === 'YES') {
            apiObject = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
        }
        fetch(ENDPOINT.MY_REFERRAL_DATA, apiObject)
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.status === 'success') {
                setApidata(responseData.data.list);
                let refLink = ENDPOINT.APP_BASE_PATH + '/friendreferrance/' + responseData.data.referralCode;
                setRefdata(refLink);
                setIsLoading(false);
            } else {
                setMsgColor('red');
                setRefdata(responseData.data.referralCode);
                setResMsg(responseData.message);
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.log(err.message);
            setIsLoading(false);
        });
    };
    const copyToClipBoard = async copyMe => {
        try {
          await navigator.clipboard.writeText(copyMe);
          setResMsg('Copied!');
          setMsgColor('green');
        } catch (err) {
            setResMsg('Failed to copy!');
            setMsgColor('red');
        }
        setTimeout(function(){setResMsg('')}, 5000);
    };
    const Items = ({ currentItems }) => {
        console.log(currentItems);
        return (
        <>
            <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
            <Table responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined On?</th>
                        <th>Account Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ?
                        currentItems.map((item,i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.created}</td>
                                <td>{item.status == 1 ? 'YES' : 'NO'}</td>
                                <td>
                                    {isPremium == '2' && <Link className="btn btn-sm btn-warning" to="/paralegal/">View Profile</Link>}
                                </td>
                            </tr>
                    )) : 
                    <tr><td colspan={5}>No Record Found!!</td></tr>
                    }
                </tbody>
            </Table>
        </>
        );
    }
    const PaginatedItems = ({ itemsPerPage }) => {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = (items) ? items.slice(itemOffset, endOffset) : null;
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
                <Items currentItems={currentItems} />
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
        <section className="full_width  d-flex justify-content-center align-items-center">
            <div className="container form_info_bg">
                <h2>My Referrals</h2>
                <div className="form_info_box edt__prfl__cnt">
                    <div className="row">
                        <div className="col-2 drk__blu__bg">
                            <SideNav value={'my_referral'} />
                        </div>
                        <div className="col-sm-10">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>My Referral Code</InputGroup.Text>
                                <Form.Control
                                    className="mb-0"
                                    placeholder="My Referral Code"
                                    size='lg'
                                    value={currentReferral} 
                                />
                                <Button variant="success" id="button-addon2" onClick={(e) => copyToClipBoard(currentReferral)}>
                                    Copy
                                </Button>
                            </InputGroup>
                            <PaginatedItems itemsPerPage={4} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
    return (
        <>
            {isLoading ? <LoadingSpinner /> : renderData}
        </>
    );
};
  
export default MyReferral;
