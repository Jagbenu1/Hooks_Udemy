import React, { useState, useEffect, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ userIngredients, setUserIngredients ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  },[userIngredients]);

const filteredIngredientsHandler = useCallback(filterIngredients =>{
  setUserIngredients(filterIngredients);
}, []);

const addIngredientHandler = ingredient => {
  setIsLoading(true);
  fetch("https://react-hooks-update-2e39d-default-rtdb.firebaseio.com/ingredients.json", {
    method: 'POST',
    body: JSON.stringify(ingredient),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      setIsLoading(false);
      return response.json();
  })
    .then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients, 
        {id: responseData.name, ...ingredient }
      ]);
  });    
};

  const removeIngredientHandler = id => {
    fetch(`https://react-hooks-update-2e39d-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(response =>{
      const newList = userIngredients.filter((ig) => ig.id !== id);
      setUserIngredients(newList);
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
