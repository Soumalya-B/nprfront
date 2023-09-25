import { Link } from "react-router-dom";
import SessionUser from './SessionUser';

const InboxNav = (props) => {
    const currentPage = props.value;
    let uList = props.uList;
    let sideNavList = [];
    if (uList !== null) {
        uList.map((item,i) => {
            sideNavList.push({title: item.name, link: '/inbox/'+item.uid });
        });
    }
    return (
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <h5 className="border-bottom border-warning">Inbox</h5>
            <ul>
                {sideNavList && sideNavList.map(function (item,i) {
                    return (
                        <li className={`nav-link ${(item.link == '/inbox/' + currentPage) ? 'active' : ''}`}><Link key={i} to={item.link}>{item.title}</Link></li>
                    );
                })}
            </ul>
        </div>
    );
}

export default InboxNav;