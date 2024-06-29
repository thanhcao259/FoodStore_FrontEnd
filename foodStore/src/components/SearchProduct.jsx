import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import listProducts from '../api/listProducts';
import Loading from './Loading';
import listCategories from '../api/listCategories';

function SearchListProduct() {
    const [loading, setLoading] = useState(true);
    const { searchKey } = useParams();
    const [listProduct, setListProducts] = useState([]);
    const [listCategory, setListCategory] = useState('');

    const {id} = useParams();
    const [sortBy, setSortBy] = useState("id");
    const [sortDir, setSortDir] = useState("default");
    const [pageNo, setPageNo] = useState(0);
    const [pageNumb, setPageNumb] = useState('')


    useEffect(() => {
        fetchData();
    }, [id, sortBy, sortDir, pageNo ]);

    const fetchData = async () => {
        try {
            const response = await listProducts.searchPagation(searchKey, sortBy, sortDir, pageNo);
            // const response = await listProducts.search(searchKey);
            const responseCate = await listCategories.get();
            setListProducts(response.products);
            setListCategory(responseCate);
            setPageNumb(response.pageSize)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelected = (e) => {
        setSortDir(e.target.value);
        if (e.target.value === "Default"){
            setSortBy("id");
        } else {
            setSortBy("price");
        }
    };

    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    return (
        <>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div class="col-lg-3 col-md-5">
                            <div class="sidebar">
                                <div class="sidebar__item">
                                    <h4>Danh sách danh mục</h4>
                                    <ul>
                                        {listCategory &&
                                            listCategory.map((item) => (
                                                <li key={item.id}><Link to={`/Shop/${item.id}`}><a>{item.name}</a></Link></li>
                                            ))}
                                    </ul>
                                </div>
                                {/* <div class="sidebar__item">
                                    <h4>Price</h4>
                                    
                                </div> */}
                            </div>
                        </div>

                        <div class="col-lg-9 col-md-7">
                            <div class="filter__item">
                                <div class="row">
                                    <div class="col-lg-4 col-md-5">
                                        <div class="filter__sort">
                                            <span>Sắp xếp theo giá</span>
                                            <select onChange={handleSelected} style={{ marginLeft: '10px' }}>
                                                <option value="Default">Mặc định</option>
                                                <option value="asc">Tăng dần</option>
                                                <option value="desc">Giảm dần</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4">
                                        <div class="filter__found">
                                            <h6><span>{listProduct.length}</span> sản phẩm được tìm thấy</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                {
                                    loading ? (
                                        <Loading />
                                    ) : (
                                        <>
                                            {
                                                listProduct && listProduct.map((item) => (
                                                    <div class="col-lg-4 col-md-7 col-sm-6" key={item.id}>
                                                        <Link to={`/shop-details/${item.id}`} style={{ textDecoration: 'none' }}>
                                                            <div class="product__item">
                                                                <div class="product__item__pic product__discount__item__pic set-bg"
                                                                 style={{ backgroundImage: `url(${item.urlImage})` }}>
                                                                    
                                                                {item.discount > 0 && (<div class="product__discount__percent">-{item.discount * 100}%</div>)}
                                                                </div>
                                                                <div class="product__item__text">
                                                                    <h6>{item.name}</h6>
                                                                    <h5>{formattedAmount.format(item.price)}</h5>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))
                                            }
                                        </>
                                    )
                                }


                            </div>
                            {/* <div class="product__pagination">
                                <a href="#"><i class="fa fa-long-arrow-left" onClick={handleReversePage}></i></a>
                                <a href="#">{pageNo + 1}</a>
                                <a href="#"><i class="fa fa-long-arrow-right" onClick={handleNextPage}></i></a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SearchListProduct
