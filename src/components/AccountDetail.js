import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getUserRecipes} from "../api/recipe";
import {useAuth} from "../provider/auth-provider";
import RecipesList from "./RecipesList";

export default function AccountDetail() {

    const { user } =  useAuth();
    const [userRecipes, setUserRecipes ] = useState([])

    useEffect(() => {
        const userAllRecipes = async () => {
            const res = await getUserRecipes(user.id)
            if(res) {
                setUserRecipes(res.data)
            }
            console.log(userRecipes)
        }

        userAllRecipes().then(() => {})
    }, []);

    return (
        <Container className="mt-5">
            <Row className="mb-3">
                <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                readOnly
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <Button
                        variant="warning"
                        style={{
                            width: "100%"

                        }}
                    >Change Password</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card style={{ padding: "30px", textAlign: "center"}}>
                        <Card.Text style={{ color: '#a09a9a'}}>
                        </Card.Text>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
