import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from "react";
import { BsTrash, BsPlusCircle } from 'react-icons/bs';
import './css/dialog.css';
import { getIngredients } from "../api/recipe";
import PortalDropDownMenu from './PortalDropDownMenu';

export default function DialogAddRecipe({ show, handleClose }) {
    const [ingredients, setIngredients] = useState([{}]);
    const [availableIngredients, setAvailableIngredients] = useState([]);

    useEffect(() => {
        const ingredientsForSelect = async () => {
            try {
                const response = await getIngredients();
                setAvailableIngredients(response.data);
            } catch (error) {
                console.error("Failed to load ingredients:", error.message);
            }
        };

        ingredientsForSelect();
    }, []);


    const handleAddNewIngredients = () => {
        setIngredients([...ingredients, {}]);
    }


    const handleDeleteIngredients = (index) => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter((_, i) => i !== index));
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                id="name"
                                placeholder="Name"
                                type="text"
                            />
                            <Form.Control
                                className="mb-3 mt-3"
                                id="short"
                                placeholder="Short Description"
                                type="text"
                            />
                            <Form.Control
                                className="mb-3 mt-3"
                                id="picture"
                                placeholder="Recipe image"
                                type="file"
                                accept="image/png, image/jpeg"
                            />
                            <Form.Control
                                id="numberOfServings"
                                placeholder="Number of servings"
                                type="number"
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end mb-2">
                            <Button variant="link" onClick={handleAddNewIngredients} className="p-0">
                                <BsPlusCircle size={24} />
                            </Button>
                        </div>

                        <div className="ingredients-container">
                            {ingredients.map((_, index) => (
                                <Form.Group
                                    key={index}
                                    id={`ingredients-block-${index}`}
                                    className="mb-2 d-flex flex-row flex-grow-1"
                                >
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id={`dropdown-block-${index}`}>
                                            Select ingredients
                                        </Dropdown.Toggle>

                                        <PortalDropDownMenu>
                                            <Dropdown.Menu className="custom-dropdown-menu">
                                                {availableIngredients.map((ingredient, i) => (
                                                    <Dropdown.Item key={i} href={`#/action-${i}`}>
                                                        {ingredient.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </PortalDropDownMenu>
                                    </Dropdown>
                                    <Form.Control
                                        className="mx-2"
                                        type="number"
                                        placeholder="Quantity"
                                    />
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id={`dropdown-units-${index}`}>
                                            Select Units
                                        </Dropdown.Toggle>

                                        <PortalDropDownMenu>
                                            <Dropdown.Menu className="custom-dropdown-menu">
                                                <Dropdown.Item href="#/action-1">Pieces</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">ml</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">mg</Dropdown.Item>
                                                <Dropdown.Item href="#/action-4">kg</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </PortalDropDownMenu>
                                    </Dropdown>
                                    {ingredients.length > 1 &&
                                        <Button
                                            variant="outline-danger"
                                            className="ms-2"
                                            onClick={() => handleDeleteIngredients(index)}
                                        >
                                            <BsTrash />
                                        </Button>
                                    }
                                </Form.Group>
                            ))}
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Control
                                id="instruction"
                                as="textarea"
                                placeholder="Description"
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Add Recipe
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
