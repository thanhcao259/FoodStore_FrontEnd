// src/chatbotConfig.js
import { createChatBotMessage } from 'react-chatbot-kit';

import Avatar from './widgets/Avatar';
import LoginBtn from './widgets/LoginBtn';
import CategoriesList from './widgets/categoriesList';
import FoodList from './widgets/foodList';
import AddToCart from './widgets/addToCart';
import ContinueShopping from './widgets/ContinueShopping';
import ViewCart from './widgets/ViewCart';
import OrderCombo from './widgets/orderCombo';



const botName = "Foody";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Xin chào! Tôi là ${botName}. Tôi có thể giúp gì cho bạn?`)
  ],
  customComponents: {
    botAvatar: (props) => <Avatar {...props}/>
  },
  widgets: [
    {
      widgetName: "loginBtn",
      widgetFunc: (props) => <LoginBtn {...props} />,
    },
    {
      widgetName: "categoryList",
      widgetFunc: (props) => <CategoriesList {...props} />,
    },
    {
      widgetName: "foodList",
      widgetFunc: (props) => <FoodList {...props} />,
    },
    {
      widgetName: "addToCart",
      widgetFunc: (props) => <AddToCart {...props} />,
    },
    {
      widgetName: "continueShopping",
      widgetFunc: (props) => <ContinueShopping {...props} />,
    },
    {
      widgetName: "viewCart",
      widgetFunc: (props) => <ViewCart {...props} />,
    },
    {
      widgetName: "orderCombo",
      widgetFunc: (props) => <OrderCombo {...props}/>,
    }
  ],
};

export default config;
