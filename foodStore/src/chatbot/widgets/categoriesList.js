import React, { useEffect, useState } from 'react'
import listCategories from '../../api/listCategories'

export default function CategoriesList(props) {

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

    const handleOptionSelect = (option) => {
        props.setState((prevState) => ({
         ...prevState,
        selectedCategoryId: option.id,
        }));
        props.actionProvider.handleFoodList(option);
    };

    return (
        <div>
            {listCategory && listCategory.map((item) => (
                <button className='category-list' key={item.id} onClick={()=>handleOptionSelect(item)}> {item.name} </button>
            ))}
        </div>
    )
}
