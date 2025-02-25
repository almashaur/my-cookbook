const BASE_URL=`${import.meta.env.VITE_BACK_END_SERVER_URL}/recipes`

const index = async () => {
   try {
       const res = await fetch(BASE_URL, {
           headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
       })
       return res.json();
   } catch (error) {
       console.log(error)
   }
}

const create = async (formData) => {
  try {
      const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      return res.json();
  } catch (err) {
      console.log(err)
  }
};

const update = async (formData, recipeId) => {
  try {
      const res = await fetch(`${BASE_URL}/${recipeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      return res.json();
  } catch (err) {
      console.log(err)
  }
};

const getRecipeById = async (recipeId)=> {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(recipeId), 
    });
    return res.json()
    
  } catch (error) {
    console.log(error) 
  }

}

const deleteRecipe = async (formData,recipeId)=>{

  try {
    const res = await fetch(`${BASE_URL}/${recipeId}`, {
        // We specify that this is a 'POST' request
        method: 'DELETE',
      });
    return res.json();
} catch (err) {
    console.log(err)
}

}
export { create , update, deleteRecipe, getRecipeById };