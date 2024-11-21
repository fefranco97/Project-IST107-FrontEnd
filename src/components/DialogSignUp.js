import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './css/dialog.css';

export default function DialogSignUp({show, handleClose}) {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                className="inputs"
                                type="text"
                                placeholder="Name"
                                autoFocus
                            />
                            <Form.Control
                                className="inputs"
                                type="email"
                                placeholder="Email"
                            />
                            <Form.Control
                                className="inputs"
                                type="password"
                                placeholder="Password"
                            />
                            <Form.Control
                                className="inputs"
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Sign Up
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}