import React, {useEffect, useState} from 'react';
import Banner from '../img/hero/banner.jpg';
import '../css/hero_setbg.css';
import 'font-awesome/css/font-awesome.min.css';
import listCategories from '../api/listCategories';
import { Link, useNavigate } from 'react-router-dom';

function ShopHero(){
    // Sử dụng useState để quản lý trạng thái của việc hiển thị/ẩn danh sách ul
    const [isListVisible, setListVisible] = useState(false);

    // Hàm xử lý khi người dùng click vào "hero__categories__all"
    const handleAllClick = () => {
        setListVisible(!isListVisible); // Đảo ngược trạng thái hiển thị danh sách
    }

    const [listCategory, setListCategory] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const response = await listCategories.get();
            setListCategory(response);
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const searchKey = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = () => {
        navigate(`/shop/search/${search}`)
    }

    return(
        <div>
            <section class="hero">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="hero__categories">
                                <div class="hero__categories__all" onClick={handleAllClick}>
                                    <i class="fa fa-bars"></i>
                                    <span>Các danh mục</span>
                                </div>
                                {isListVisible &&(
                                    <ul className="hero__categories ul">
                                        {listCategory &&
                                         listCategory.map((item) => (
                                            <li key={item.id}><Link to={`/Shop/${item.id}`}><p>{item.name}</p></Link></li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="hero__search">
                                <div class="hero__search__form">
                                    <form action="#">
                                        <div class="hero__search__categories">
                                            Tất cả danh mục
                                            <span class="arrow_carrot-down"></span>
                                        </div>
                                        <input type="text" placeholder="Bạn cần gì ?" onChange={searchKey}/>
                                        <button  class="site-btn" onClick={handleSearch}>TÌM</button>
                                    </form>
                                </div>
                                <div class="hero__search__phone">
                                    <div class="hero__search__phone__icon">
                                        <i class="fa fa-phone"></i>
                                    </div>
                                    <div class="hero__search__phone__text">
                                        <h5>+65 11.188.888</h5>
                                        <span>support 24/7 time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ShopHero;