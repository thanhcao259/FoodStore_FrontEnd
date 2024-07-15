import Humberger from './components/humberger';
import './sass/style.scss';

import Header from './components/header';
import ShopHero from './components/shop_hero';
import Footer from './components/footer';
import Breadcrumb from './components/breadcrumb';
import Product from './components/product';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Foodbot from './Chatbot';

function Shop(){
    return(
        <div>
            <Humberger/>
            <Header/>
            <ShopHero/>
            <Breadcrumb/>
            <Product/>
            <Footer/>
            <Foodbot/>
        </div>
    );
}

export default Shop;