import {useParams} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export default function RecipeDetail({recipes}) {
    const { id } = useParams();
    const recipe = recipes.find(r => r.id === parseInt(id));

    console.log(recipe);

    if(!recipes) {
        return <h2>Recipe not found</h2>
    }

    return(
        <Container className="mt-5">
            <Card style={{ width: '50%', margin: 'auto'}}>
                <Card.Img variant="top" src="img.png" alt={recipe.id}/>
                <Card.Body>
                    <Card.Title>{recipe.name}</Card.Title>
                    <Card.Text>
                        {recipe.shortDescription}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}