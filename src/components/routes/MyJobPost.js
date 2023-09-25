import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ENDPOINT from '../../constants/api-endpoints';
import LoadingSpinner from "../elements/LoadingSpinner";
import SessionUser from '../elements/SessionUser';
import SideNav from '../elements/SideNav';
import { Link } from 'react-router-dom';

// Bootstrap CSS
import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.css";

const MyJobPost = () => {
    if (SessionUser.IS_AUTHENTICATED === false) {
        window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
    }
    let userId =  SessionUser.ID;

    const [isLoading, setIsLoading] = useState(false);
    const [items, setApidata] = useState([]);

    const [resMsg, setResMsg] = useState('');
    const [msgColor, setMsgColor] = useState('');
    useEffect(() => {
        fetchJobListData();
    }, []);
    const fetchJobListData = () => {
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
        setIsLoading(true);
        fetch(ENDPOINT.JOB_LIST_DATA, apiObject)
        .then((response) => response.json())
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
            console.log(err.message);
            setIsLoading(false);
        });
    };
    const handleDeleteItem = (recordId) => {
        setIsLoading(true);
        fetch(ENDPOINT.JOB_DATA_DELETE, {
            method: 'DELETE',
            body: JSON.stringify({ 'site' : ENDPOINT.SITE_ID, 'userId' : userId, 'recordId' : recordId }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.status === 'success') {
                setMsgColor('green');
            } else {
                setMsgColor('red');
            }
            setResMsg(responseData.message);
            window.scrollTo({top: 520,behavior: 'smooth'});
            setIsLoading(false);
            setTimeout(function() { window.location.reload(); }, 3000);
        })
        .catch((err) => {
            setMsgColor('red');
            setResMsg(err.message);
            setIsLoading(false);
        });
    }
    const Items = ({ currentItems }) => {
        return (
        <>
            <p id='resMsg' style={{color: msgColor}}>{resMsg}</p>
            <Table responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Published?</th>
                        <th>Posted</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems ?
                        currentItems.map((item,i) => (
                            <tr key={i}>
                                <td>{item.code}</td>
                                <td>{item.title}</td>
                                <td>{item.desc}</td>
                                <td>{item.isPublished == 1 ? 'YES' : 'NO'}</td>
                                <td>{item.created}</td>
                                <td>
                                    <Link className="btn btn-sm btn-danger" to="#" onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Do you really want to delete this record?"
                                        )
                                        if (confirmBox === true) {
                                            handleDeleteItem(item.id)
                                        }
                                    }}>Delete</Link>
                                </td>
                            </tr>
                    )) : 
                    <tr><td colspan={6}>No Record Found!!</td></tr>
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
                <h2>My Jobs</h2>
                <div className="form_info_box edt__prfl__cnt">
                    <div className="row">
                        <div className="col-2 drk__blu__bg">
                            <SideNav value={'my_job_post'} />
                        </div>
                        <div className="col-sm-10">
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
  
export default MyJobPost;
