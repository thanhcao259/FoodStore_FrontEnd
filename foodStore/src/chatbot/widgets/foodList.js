import React, { useEffect, useState } from 'react'
import listProducts from '../../api/listProducts'

import Loading from '../../components/Loading';


export default function FoodList(props) {
    const [listProduct, setListProducts] = useState([]);

    const selectedCategoryId = props.state.selectedCategoryId;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const response = await listProducts.getByCategory(selectedCategoryId);
            setListProducts(response);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    console.log(error);

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === listProduct.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? listProduct.length - 1 : prevIndex - 1));
    };       
    
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    const handleOptionSelect = (option) => {
        props.setState((prevState) => ({
        ...prevState,
        selectedFoodId: option.id,
        }));
        props.actionProvider.handleAddToCart(option);
    };
  return (
    <div>
        {
            loading ? (
                <Loading/>
            ) : (
                    <div className='slider-container'>
                        <div className='slider-inner'>
                            {listProduct.map((product, index) => (
                                <div key={product.id} className={`slider-item ${index === currentIndex ? 'active' : ''}`} onClick={()=>handleOptionSelect(product)}>
                                    <img src={product.urlImage} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>{formattedAmount.format(product.price)}</p>
                                </div>
                            ))}
                        </div>
                        <div className='btn-container'>
                            <button className='slider-button prev' onClick={prevSlide}>
                                &lt;
                            </button>
                            <button className='slider-button next' onClick={nextSlide}>
                                &gt;
                            </button> 
                        </div>     
                    </div>
            )
        }
    </div>
  )
}
