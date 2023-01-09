import React from 'react';
import Card  from './Card';

const SearchList = ({filteredRestaurants, handleDelete}) => {
    const filtered = filteredRestaurants.map((restaurant)=>{
       return (<Card key={restaurant.Id}
        restaurant={restaurant}
        handleDelete={handleDelete}
       />
       );
    });
  return <>{filtered}</>
};

export default SearchList;
