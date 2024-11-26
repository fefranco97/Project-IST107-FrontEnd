import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function RecipeDetail() {
    const { id } = useParams();
    const location = useLocation();

    const recipe = location.state?.recipe;

    if (!recipe) {
        return <p>Recipe not found or data is still loading...</p>;
    }

    return (
        <div className="container mt-5">
            <h2>{recipe.title}</h2>
            <div className="row">
                <div className="col-lg-6 d-flex align-items-center justify-content-center">
                    <img
                        src={recipe.img}
                        alt={recipe.title}
                        className="img-fluid"
                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-lg-6">
                    <h4>Ingredients</h4>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <h4>Description</h4>
                    <p>{recipe.description}</p>
                </div>
            </div>
        </div>
    );
}
