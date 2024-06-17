import React, { useEffect, useState } from "react";
import '../css/hero_setbg.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import listCategories from "../api/listCategories";
import Loading from "./Loading";
import { Link } from "react-router-dom";



function Categories(){
    const options = {
        items: 4,
        loop: true,
        autoplay: true,
        rewind: true,
        autoplayTimeout: 3000,
        dots: false,
        nav: true,
        margin: 10,
        
    };

    const [listCategory, setListCategory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
            try {
                const response = await listCategories.get();
                setListCategory(response);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
  
    };


    return(
        <div>
            {
                loading ? (
                    <Loading/>
                ) : (
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="categories__slider">
                                    <OwlCarousel className="owl-theme" {...options}>
                                        {/* <div className="col-lg">
                                            <div className="categories__item">
                                                <h5><a href="#">Fresh Fruit</a></h5>
                                            </div>
                                        </div> */}

                                        {listCategory && listCategory.map((item) => (
                                            <div className="col-lg" key={item.id}>
                                                <Link to={`/Shop/${item.id}`}>
                                                    <div className="categories__item" style={{backgroundImage: `url(${item.urlImage})`}}>
                                                        <h5><a>{item.name}</a></h5>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </OwlCarousel>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </div>
    );
}

export default Categories;