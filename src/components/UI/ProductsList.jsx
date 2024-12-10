import React from 'react';
import ProductCard from './ProductCard';
import _ from 'lodash';

const ProductsList = ( { data } ) => {
    return (
        <>
        {
            _.sortBy(data, 'category')?.map((item, index) => (
                <ProductCard item={item} key={index}/>
            ))
        }
        </>
    );
    
};

export default ProductsList;