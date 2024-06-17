import Humberger from './components/humberger';
import './sass/style.scss';
import Header from './components/header';
import ShopHero from './components/shop_hero';
import Footer from './components/footer';
import Breadcrumb from './components/breadcrumb';
import CheckoutSection from './components/checkout_section';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function CheckOut(){
    return(
        <div>
            <Humberger/>
            <Header/>
            <ShopHero/>
            <Breadcrumb/>
            <CheckoutSection/>
            <Footer/>
        </div>
    )
}

export default CheckOut;