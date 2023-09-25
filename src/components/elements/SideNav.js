import { Link } from "react-router-dom";
import SessionUser from '../elements/SessionUser';

const SideNav = (props) => {
    const currentPage = props.value;
    let isPremium =  SessionUser.MEMBERSHIP;
    let sideNavList = [];
    if(isPremium === '2') {
        sideNavList = [...sideNavList,{title: 'Profile',link: '/profile'}];
    }
        sideNavList = [...sideNavList,
        {title: 'Inbox',link: '/inbox/0'},
        {title: 'My Jobs',link: '/my_job_post'},
        {title: 'Job Post',link: '/job_post'},
        {title: 'Search Job',link: '/search_jobs'},
        {title: 'Search Member',link: '/search_members'},
        {title: 'My Referrals',link: '/my_referral'},
        
    ];
    let generalSideNavList = [
        {title: 'Account Edit',link: '/account_edit'},
        {title: 'Change Password',link: '/change_password'},
        
    ];
    return (
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <h5 className="border-bottom border-warning">Quick Links</h5>
            <ul>
                {sideNavList.map(function (item,i) {
                    return (
                        <li className={`nav-link ${(item.link == '/' + currentPage) ? 'active' : ''}`}><Link key={i} to={item.link}>{item.title}</Link></li>
                    );
                })}
            </ul>
            <h5 className="border-bottom border-warning">&nbsp;</h5>
            <ul>
            {generalSideNavList.map(function (item,i) {
                return (
                    <li className={`nav-link ${(item.link == '/' + currentPage) ? 'active' : ''}`}><Link key={i} to={item.link}>{item.title}</Link></li>
                );
            })}
            </ul>
        </div>
    );
}

export default SideNav;