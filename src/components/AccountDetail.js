import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Col, Row, Image } from "react-bootstrap";
import { getUserRecipes, deleteRecipe } from "../api/recipe";
import RecipesList from "./RecipesList";

export default function AccountDetail({ logInUser }) {

    const [userRecipes, setUserRecipes] = useState([]);

    useEffect(() => {
        const userAllRecipes = async () => {
            try {
                const res = await getUserRecipes(logInUser.id);
                if (res) {
                    setUserRecipes(res.data);
                }
            } catch (error) {
                console.error("Failed to load user recipes:", error.message);
            }
        };

        userAllRecipes();
    }, [logInUser.id]);

    const handleRecipeDelete = async (recipeId) => {
        try {
            await deleteRecipe(recipeId);
            setUserRecipes(userRecipes.filter(recipe => recipe.id !== recipeId));
        } catch (error) {
            console.error("Failed to delete recipe:", error.message);
        }
    };

    return (
        <Container fluid style={{ backgroundColor: '#f8f0e3', minHeight: '100vh' }} className="mt-5">
            <Row className="mb-4 align-items-center" style={{ marginLeft: '120px'}}>
                <Col md={1} className="text-center">
                    <Image
                        src={logInUser?.photoURL || "https://via.placeholder.com/150"}
                        roundedCircle
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '4px' }}
                        alt="User Avatar"
                    />
                </Col>
                <Col md={3}>
                    <div style={{padding: '10px', borderRadius: '10px', marginTop: '20px', maxWidth: '400px', marginLeft: '3px' }}>
                        <h5 style={{ marginBottom: '10px' }}>Name</h5>
                        <p style={{ fontSize: '1rem', marginBottom: '15px' }}>{logInUser?.name || "N/A"}</p>
                        <h5 style={{ marginBottom: '10px' }}>Email</h5>
                        <p style={{ fontSize: '1rem' }}>{logInUser?.email || "N/A"}</p>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card style={{ padding: "30px", textAlign: "center", backgroundColor: 'transparent', border: 'none' }}>
                        <Card.Text style={{ color: '#a09a9a' }}>
                            <h4>Your Recipes</h4>
                            <RecipesList recipes={userRecipes} onRecipeDelete={handleRecipeDelete} showDeleteButton={true} />
                        </Card.Text>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
