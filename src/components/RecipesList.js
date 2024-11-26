import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { getRecipe } from '../api/recipe';

export default function RecipesList({ recipes }) {
    const navigate = useNavigate();

    const handleDetailClick = async (id) => {
        try {
            const recipeDetail = await getRecipe(id);
            navigate(`/recipe/${id}`, { state: { recipe: recipeDetail.data } });
        } catch (error) {
            console.error('Failed to fetch recipe details:', error.message);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {recipes.map((recipe) => (
                    <div className="col-md-4 mb-4" key={recipe.id}>
                        <Card className="h-100">
                            <Card.Img variant="top" src={recipe.img} alt={recipe.title} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{recipe.title}</Card.Title>
                                <Card.Text className="flex-grow-1">
                                    {recipe.short}
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() => handleDetailClick(recipe.id)}
                                    className="mt-auto"
                                >
                                    Detail
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
