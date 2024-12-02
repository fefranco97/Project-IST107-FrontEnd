import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import './css/dialog.css'
import { CreateUser } from '../api/user'
import toast from 'react-hot-toast'
import { useAuth } from '../provider/auth-provider'
import { useState } from 'react'

export default function DialogSignUp({ show, handleClose }) {
  const [isCreating, setIsCreating] = useState(false)
  const { login } = useAuth()

  const handleSignUp = async () => {
    setIsCreating(true)
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (name === '' || email === '' || password === '') {
      alert('Please fill all the fields')
      return
    }

    try {
      const response = await CreateUser(name, email, password)

      login({ email: response.email, id: response.id, name: response.name }, response.id)
      handleClose()
      toast.success('User created successfully')
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    } finally {
      setIsCreating(false)
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
            {isCreating ? (
              <div className="d-flex align-items-center justify-content-center">
                <GiRoastChicken className="icon-spin" style={{ fontSize: '1.5rem', color: '#e57b3c' }} />
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
