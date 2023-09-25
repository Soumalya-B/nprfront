import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Membership from './routes/Membership';
import Dashboard from './routes/Dashboard';
import Profile from './routes/Profile';
import PublicProfile from './routes/PublicProfile';
import AccountEdit from './routes/AccountEdit';
import ProfileEdit from './routes/ProfileEdit';
import JobPost from './routes/JobPost';
import MyJobPost from './routes/MyJobPost';
import MyReferral from './routes/MyReferral';
import ReferAFriend from './routes/ReferAFriend';
import FriendReferrance from './routes/FriendReferrance';
import SearchJob from './routes/SearchJob';
import SearchMember from './routes/SearchMember';
import Inbox from './routes/Inbox';
import Page from './routes/Page';
// import Blog from './routes/Blog';
// import BlogDetail from './routes/BlogDetail';
// import Testimonial from './routes/Testimonial';
// import Contact from './routes/Contact';
// import MetaData from './elements/MetaData';
// import Gallery from './routes/Gallery';

const Skeleton = () => {
  return (
    <>
      {/* <MetaData /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="membership" element={<Membership />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="paralegal/:slug" element={<PublicProfile />} />
          <Route path="account_edit" element={<AccountEdit />} />
          <Route path="profile_edit" element={<ProfileEdit />} />
          <Route path="job_post" element={<JobPost />} />
          <Route path="my_job_post" element={<MyJobPost />} />
          <Route path="my_referral" element={<MyReferral />} />
          <Route path="search_jobs" element={<SearchJob />} />
          <Route path="search_members" element={<SearchMember />} />
          <Route path="refer_an_associate" element={<ReferAFriend />} />
          <Route path="friendreferrance/:referalCode" element={<FriendReferrance />} />
          <Route path="inbox/:uid" element={<Inbox />} />
          <Route path="page/:slug" element={<Page />} />
          
          {/* <Route path="blogs" element={<Blog />} />
          <Route path="blogs/:slug" element={<BlogDetail />} />
          
          <Route path="testimonials" element={<Testimonial />} />
				  <Route exact path="contact" element={<Contact />} />
				  <Route exact path="gallery/image" element={<Gallery />} /> */}
          <Route path="*" element={<p>Not found!</p>} />
        </Route>
      </Routes>
    </>
  );
};

export default Skeleton;