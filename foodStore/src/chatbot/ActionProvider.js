// src/ActionProvider.js
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

    const [isLogin, setIsLogin] = useState(false);
        
    useEffect(() =>{
        const token = Cookies.get('token');
        if (token){
            setIsLogin(true);
        }
    }, [isLogin]);

    const handleLogin = () => {
        if (!isLogin) {
            const message = createChatBotMessage(
                "Xin lỗi bạn chưa đăng nhập. Hãy đăng nhập để tiếp tục thao tác ",
                {
                    widget: "loginBtn",
                }
            );
            updateState(message);
            
        } else {
            const message = createChatBotMessage(
                "Vâng bạn muốn loại thực phẩm nào ạ?",
                {
                    widget: "categoryList",
                }
            );
            updateState(message);
        }
        
    }

    const handleFoodList = (item) => {
        const message = createChatBotMessage(
            `Bạn muốn mua ${item.name}. Hãy chọn thực phẩm bạn muốn mua`,
            {
                widget: "foodList",
            }
        );
        updateState(message);
    }

    const handleComboList = (item) =>{
        const mess = createChatBotMessage(
            `Lựa chọn những combo mà bạn muốn đặt`,
            { widget: "orderCombo", }
        ); updateState(mess);
    }
    const handleAddToCart = (item) => {
        const message = createChatBotMessage(
            `Bạn muốn thêm ${item.name} vào giỏ hàng chứ?`,
            {
                widget: "addToCart",
            }
        );
        updateState(message);
    }

    const handleAddToCartSucces = () => {
        const message = createChatBotMessage(
            `Đã thêm sản phẩm vào giỏ hàng. Bạn có muốn chọn thêm sản phẩm không ?`,
            {
                widget: "continueShopping",
            }
        );
        updateState(message);
    }
    const handleCancelAddToCart = () => {
        const message = createChatBotMessage(
            `Cảm ơn bạn đã sử dụng Foody. Tạm biệt`
        );
        updateState(message);
    }

    const handleContinueShopping = () => {
        const message = createChatBotMessage(
            `Hãy tiếp tục chọn loại sản phẩm mà bạn muốn mua`,
            {
                widget: "categoryList",
            }
        );
        updateState(message);
    }

    const handleStopShopping = () => {
        const message = createChatBotMessage(
            `Cảm ơn bạn đã sử dụng Foody. Hãy tiến hành kiểm tra giỏ hàng của bạn và đặt hàng bạn nhé !!!`,
            {
                widget: "viewCart",
            }
        );
        updateState(message);
    }

    const handleHello = () => {
        const message = createChatBotMessage(
            "Xin chào, Foody có thể giúp gì cho bạn!"
        );
        updateState(message);
    }

    const updateState = (message) => {
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],

        }))
    }
    return (
        <div>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              actions: {
                handleLogin,
                handleHello,
                handleFoodList,
                handleAddToCart,
                handleAddToCartSucces,
                handleCancelAddToCart,
                handleContinueShopping,
                handleStopShopping, 
                handleComboList,   
              },
            });
          })}
        </div>
    );
};
  
export default ActionProvider;
  