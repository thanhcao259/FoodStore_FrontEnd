import React, { useEffect, useState } from 'react';
import listProducts from '../../api/listProducts'

import Loading from '../../components/Loading';
import { useParams } from 'react-router-dom';



function OrderCombo(props) {
    const [listCombo, setListCombo] = useState([]);
    
    const [err, setErr] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await listProducts.getByCategory(12);
            setListCombo(response);
            console.log(response);

        } catch (err) {
            setErr(err);
        }
    }

    console.log(err);

    const nextSlide = () => {
        setCurrentIndex((index)=>(
            index === listCombo.length -1 ?0 : index+1 ));
    };
    const previousSlide = () => {
        setCurrentIndex((index)=>(
            index === 0 ? listCombo.length - 1 : index-1 ));
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
        <div><div className='slider-container'>
        <div className='slider-inner'>
            {listCombo.map((product, index) => (
                <div key={product.id} className={`slider-item ${index === currentIndex ? 'active' : ''}`} 
                onClick={()=>handleOptionSelect(product)}>
                    <img src={product.urlImage} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{formattedAmount.format(product.price)}</p>
                </div>
            ))}
        </div>
        <div className='btn-container'>
            <button className='slider-button prev' onClick={previousSlide}>
                &lt;
            </button>
            <button className='slider-button next' onClick={nextSlide}>
                &gt;
            </button> 
        </div>     
    </div></div>
    )
}

export default OrderCombo;