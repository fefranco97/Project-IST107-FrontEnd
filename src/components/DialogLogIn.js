import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { LoginWithEmail, SignInWithGoogle } from '../api/user'
import toast from 'react-hot-toast'
import './css/logIn.css'

export default function DialogLogIn({ show, handleClose }) {
  const handleLogin = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (email === '' || password === '') {
      alert('Please fill all the fields')
      return
    }

    try {
      await LoginWithEmail(email, password)
      handleClose()
      toast.success('Login successfully')
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }
  }

  const handleLoginWithGoogle = async () => {
    try {
      await SignInWithGoogle()
      handleClose()
      toast.success('Login successfully')
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
            <Form.Group className="mb-3">
              <Form.Control className="inputs" type="email" placeholder="Email" id="email" />
              <Form.Control className="inputs" type="password" placeholder="Password" id="password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Log In
          </Button>
          <Button variant="google" onClick={handleLoginWithGoogle} className="google-btn">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo"></img>
            <span>Login with Google</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
