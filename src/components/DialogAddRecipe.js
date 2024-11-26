import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import {useState, useEffect} from "react";
import { BsTrash, BsPlusCircle } from 'react-icons/bs';
import './css/dialog.css'
import {getIngredients} from "../api/recipe";

export default function DialogAddRecipe({show, handleClose}) {

   /* useEffect(() => {
        const ingredientsForSelect = async () => {
            //const response = getIngredients();
            console.log(response)
        }

        ingredientsForSelect().then((res) => {
            console.log(res)
        })
    })

    */

    const [ingredients, setIngredients] = useState([]);
    const handleAddNewIngredients = () => {
        setIngredients([...ingredients, ingredients.length]);
    }

    const handleDeleteIngredients = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index))
    }

    const handleCreateRecipe = async () => {
        const title = document.getElementById('name').value;
        const description = document.getElementById('instruction').value;
        const short = document.getElementById('short').value;
    }

    return(
        <>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
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
                                id="short"
                                placeholder="Short Description"
                                type="text"
                            />
                            <Form.Control
                                className="mb-3 mt-3"
                                id="picture"
                                placeholder="Recipe image"
                                type="file"
                                accept="imge/png, imge/jpeg"
                            />
                            <Form.Control
                                id="numberOfServings"
                                placeholder="Number of servings"
                                type="number"
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end mb-2">
                            <Button variant="link" onClick={handleAddNewIngredients} className="p-0">
                                <BsPlusCircle size={24}/>
                            </Button>
                        </div>

                        <Form.Group
                            id="ingredients-block"
                            className="mb-2 d-flex flex-row flex-grow-1"
                        >
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Select ingredients
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Potato</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Tomato</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Egg</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Control
                                className="mx-2"
                                type="number"
                                placeholder="Quantity"
                            />
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Select Units
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Pieces</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">ml</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">mg</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">kg</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button
                                variant="outline-danger"
                                className="ms-2"
                            >
                                <BsTrash />
                            </Button>

                        </Form.Group>
                        <div className="ingredients-container">
                        {ingredients.map((_, index) =>(
                            <Form.Group
                                key={index}
                                id={`ingredients-block-${index}`}
                                className="mb-2 d-flex flex-row flex-row-1"
                            >
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id={`dropdown-block-${index}`}>
                                        Select ingredients
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Potato</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Tomato</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Egg</Dropdown.Item>
                                    </Dropdown.Menu>
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

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Pieces</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">ml</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">mg</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">kg</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {ingredients.length >= 1 &&
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

                        <Form.Group
                            className="mb-3"
                        >
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
    )
}