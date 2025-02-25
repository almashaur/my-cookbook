import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../../../context/UserContext';
import DropDownList from '../../forms/DropDownList/DropDownList';
import { create } from '../../../../services/recipeService';
import { Link } from "react-router-dom";




const AddRecipeForm = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const { user } = useContext(UserContext)
    const [selectedOptions,setSelectedOptions]=useState([])

    const initialState = {
        recipeName: '',
        ingredients: [],
        instructions: '',
        level: '',
        cuisine: '',
        tools: [],
        image: '',
        serves: 1,
        owner: user.username,
    }

    const ingredientListInitialState = {
        ingredientName: '',
        amount: '',
        alternative: '',
    }

    const [formData, setFormData] = useState(initialState);
    const [ingredientList, setIngredientList] = useState([ingredientListInitialState]);
    const [toolsList, setToolsList] = useState([]);
    

    // useEffect(() => {
    //     if (recipe) {
    //         // Populate form data with existing recipe data for editing
    //         setFormData({
    //             recipeName: recipe.recipeName,
    //             level: recipe.level,
    //             cuisine: recipe.cuisine,
    //             owner: recipe.owner,
    //             serves: recipe.serves,
    //             instructions: recipe.instructions,
    //         });
    //         setIngredientList(recipe.ingredients || [ingredientListInitialState]);
    //     }
    // }, [recipe]);



    const handleChange = (event) => {
        setMessage('');
        formData.tools= selectedOptions;
        formData.ingredients=ingredientList;
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleIngredientChange = (event, index) => {
        const { name, value } = event.target;
        const list = [...ingredientList];
        list[index][name] = value;
        setIngredientList(list);
        formData.ingredients = list;
    }

    const handleToolsChange = (selectedOptions) => {
        // const { name, options } = e.target;
        // const list = [...toolsList]
        // const selectedTools = Array.from(options).filter(option => option.selected).map(option => option.value);
        // setToolsList({
        //     list,
        //     [name]: selectedTools,
        // });
        // console.log(formData.tools);
        // formData.tools = selectedTools;
        const selectedTools = selectedOptions;
        setFormData({ ...formData, tools: selectedTools });

    };

    const handleIngredientAdd = (event, index) => {
        setIngredientList([...ingredientList, ingredientListInitialState]);
    }
    const handleIngredientRemove = (event, index) => {
        const list = [...ingredientList];
        list.splice(index, 1);
        setIngredientList(list);
        formData.ingredients = list;
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            // console.log('target',event.target);
            const toolsList = formData.tools.map(tool => tool.value);
            console.log(toolsList)
            console.log(formData)
            const newFormData = formData
            newFormData.tools=formData.tools.map(tool => tool.value);
            console.log('new After',newFormData)
            const addRecipe = await create(newFormData);
            
            // setFormData(initialState)
            // navigate('/recipes');

        } catch (error) {
            setMessage(error.message);
        }

    }


    return (
        <main className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className='col-lg-12' >
                        <div className="card shadow p-4 rounded">
                            <h1 className="text-center mb-4">Add Recipe</h1>
                            {message && <div className="alert alert-danger">{message}</div>}

                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <div className='col-lg-10'>

                                    <label htmlFor="owner" className="form-control form-label">Owner
                                        <input type="text" className="form-control" name="owner" id="owner" value={formData.owner}
                                            disabled /></label>
                                </div>
                                <div className="col-lg-10">

                                    <label htmlFor="recipeName" className="form-control form-label">Recipe Name
                                        <input type="text" className="form-control" name="recipeName" id="recipeName" value={formData.recipeName}
                                            onChange={handleChange} /></label>
                                </div>
                                <div className="col-lg-10">

                                    <label htmlFor="level" className="form-control form-label">Level
                                        <select
                                            className="form-control"
                                            name="level"
                                            id="level"
                                            value={formData.level}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Level</option>
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="professional">Professional</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="col-lg-10">

                                    <label htmlFor="cuisine" className="form-control form-label">Cuisine
                                        <select
                                            className="form-control"
                                            name="cuisine"
                                            id="cuisine"
                                            value={formData.cuisine}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Cuisine</option>
                                            <option value="Italian">Italian</option>
                                            <option value="Mediterranean">Mediterranean</option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Mexican">Mexican</option>
                                            <option value="Indian">Indian</option>
                                            <option value="Thai">Thai</option>
                                            <option value="American">American</option>
                                            <option value="French">French</option>
                                            <option value="Japanese">Japanese</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="col-lg-10">

                                    <label htmlFor="tools" className="form-control form-label">Tools
                                    <DropDownList selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} onChange={(e) => handleToolsChange(selectedOptions)}/>
                                    </label>
                                </div>
                                <div className="col-lg-10">

                                    <label htmlFor="image" className="form-control form-label">Image
                                        <input type="text" className="form-control" name="image" id="image" value={formData.image}
                                            onChange={handleChange} /></label>
                                </div>


                                <div className="col-lg-10">
                                    <label htmlFor="serves" className="form form-label">Serves
                                        <input type="number" min="1"step="1"  className="form-control" name="serves" id="serves" value={formData.serves || '1' } onChange={handleChange} /></label>

                                </div>

                                <div className="col-lg-10 form-control">
                                    <h2>Ingredients</h2>
                                    {
                                        ingredientList.map((ingredient, index) => (
                                            <div key={index} className="ingredients">
                                                {ingredientList.length - 1 === index && ingredientList.length < 15 && (
                                                    <button type="button" onClick={handleIngredientAdd} className='btn btn-secondary'>
                                                        <span>Add an Ingredient </span>
                                                    </button>
                                                )}
                                                <div className="first-division form-row">
                                                    <label htmlFor='ingredient'> Name</label>
                                                    <input
                                                        name="ingredientName"
                                                        type="text"
                                                        id="ingredientName"
                                                        value={ingredient.ingredientName}
                                                        onChange={(e) => handleIngredientChange(e, index)}
                                                        required
                                                    />
                                                    <label htmlFor='amount'> amount</label>
                                                    <input
                                                        name="amount"
                                                        type="text"
                                                        id="amount"
                                                        value={ingredient.amount}
                                                        onChange={(e) => handleIngredientChange(e, index)}
                                                        required
                                                    />
                                                    <label htmlFor='alternative'> Alternative</label>
                                                    <input
                                                        name="alternative"
                                                        type="text"
                                                        id="alternative"
                                                        value={ingredient.alternative}
                                                        onChange={(e) => handleIngredientChange(e, index)}
                                                        required
                                                    />
                                                </div>
                                                <div className="second-division">
                                                    {ingredientList.length !== 1 && (
                                                        <span
                                                            onClick={() => handleIngredientRemove(index)}
                                                            style={{ cursor: 'pointer', color: 'black', marginLeft: '10px', fontWeight: 'bold' }}
                                                            title="Remove Ingredient"
                                                        >
                                                            X
                                                        </span>
                                                    )}


                                                </div>

                                            </div>
                                        ))
                                    }

                                </div>
                                <label htmlFor="instructions" className="form-control form-label">Instructions
                                    <textarea name="instructions" className="form-control" id="instructions" onChange={handleChange} value={formData.instructions}>textttttt</textarea></label>
                                <button type="submit" className="btn btn-success d-flex justify-content-between">Add Recipe</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div >
        </main >
    );



}







export default AddRecipeForm;