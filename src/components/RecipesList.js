import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';


export default function RecipesList({recipes}) {
    return (
        <div className="d-flex flex-row flex-grow-1 align-items-center ">
            {recipes.map((recipe) => (
                <Card key={recipe.id} className="mx-3 my-3" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={recipe.img} alt={recipe.id}/>
                    <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>
                        <Card.Text>
                            {recipe.shortDescription}
                        </Card.Text>
                        <Link to={`/recipe/${recipe.id}`}>
                            <Button variant="primary">Detail</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}