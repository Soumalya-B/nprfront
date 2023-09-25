import { Outlet } from 'react-router-dom';
import Header from './elements/Header';
import Footer from './elements/Footer';

const Layout = () => {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  );
};

export default Layout;