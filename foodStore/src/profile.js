import Humberger from './components/humberger';
import './sass/style.scss';
import Header from './components/header';
import ShopHero from './components/shop_hero';
import Footer from './components/footer';
import Breadcrumb from './components/breadcrumb';
import AccountSetting from './components/profile';
import UpdateProfile from './components/UpdateProfile';
import UpdatePassword from './components/UpdatePassword';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useLocation } from 'react-router-dom';

function Content() {
    const currentPage = useLocation().pathname;
    
    switch (currentPage) {
        case ('/profile'):
            return <AccountSetting/>;
        case ('/profile/update'):
            return <UpdateProfile/>;
        case ('/profile/update-password'):
            return <UpdatePassword/>;    
        default:
            break;
    }
}

function Profile(){
    return(
        <div>
            <Humberger/>
            <Header/>
            <ShopHero/>
            <Breadcrumb/>
            <Content/>
            <Footer/>
        </div>
    )
}

export default Profile;