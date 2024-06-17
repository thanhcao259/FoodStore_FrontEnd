import Humberger from './components/humberger';
import './sass/style.scss';
import Header from './components/header';
import ShopHero from './components/shop_hero';
import Footer from './components/footer';
import Breadcrumb from './components/breadcrumb';
import OrdersSection from './components/OrderSections';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function OrdersList(){
    return(
        <div >
            <Humberger/>
            <Header/>
            <ShopHero/>
            <Breadcrumb/>
            <OrdersSection/>
            <Footer/>
        </div>
    )
}

export default OrdersList