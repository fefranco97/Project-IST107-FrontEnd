import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import './css/dialog.css'
import { CreateUser } from '../api/user'
import toast from 'react-hot-toast'

export default function DialogSignUp({ show, handleClose }) {
  const handleSignUp = async () => {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (name === '' || email === '' || password === '') {
      alert('Please fill all the fields')
      return
    }

    try {
      await CreateUser(name, email, password)
      handleClose()
      toast.success('User created successfully')
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control className="inputs" type="text" placeholder="Name" id="name" autoFocus />
              <Form.Control className="inputs" type="email" placeholder="Email" id="email" />
              <Form.Control className="inputs" type="password" placeholder="Password" id="password" />
              <Form.Control className="inputs" type="password" placeholder="Confirm Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
