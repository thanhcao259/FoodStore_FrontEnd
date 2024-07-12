import React from 'react'
import cartAction from '../../api/cartApi'

export default function AddToCart(props) {

    const selectedFoodId = props.state.selectedFoodId;

    const handleAddToCart = async (e) => {
        try {
            const formData = new FormData();
            formData.append("quantity", 1);
            formData.append("idProduct", selectedFoodId);
            await cartAction.add(formData);
            props.actionProvider.handleAddToCartSucces();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelAddToCCart = () => {
        props.actionProvider.handleCancelAddToCart();
    }

    return (
        <div>
            <div>
                <button className='order-btn add' onClick={() => handleAddToCart()}>Thêm</button>
                <button className='order-btn' onClick={() => handleCancelAddToCCart()}>Không</button>
            </div>
        </div>
    )
}
