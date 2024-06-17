import Humberger from './components/humberger';
import './sass/style.scss';

import Header from './components/header';
import ShopHero from './components/shop_hero';
import Footer from './components/footer';
import Breadcrumb from './components/breadcrumb';
import SearchListProduct from './components/SearchProduct';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function SearchProduct(){
    return(
        <div>
            <Humberger/>
            <Header/>
            <ShopHero/>
            <Breadcrumb/>
            <SearchListProduct/>
            <Footer/>
        </div>
    );
}

export default SearchProduct;