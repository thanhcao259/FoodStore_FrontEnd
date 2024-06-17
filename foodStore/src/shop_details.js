import Humberger from './components/humberger';
import './sass/style.scss';
import Header from './components/header';
import ShopHero from './components/shop_hero';
import Footer from './components/footer';
import Breadcrumb from './components/breadcrumb';
import ProductDetails from './components/product_details';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function ShopDetails(){
    return(
        <div>
            <Humberger/>
            <Header/>
            <ShopHero/>
            <Breadcrumb/>
            <ProductDetails/>
            <Footer/>
        </div>
    );
}

export default ShopDetails;