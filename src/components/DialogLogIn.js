import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { LoginWithEmail, SignInWithGoogle } from '../api/user'
import toast from 'react-hot-toast'
import './css/logIn.css'
import { useAuth } from '../provider/auth-provider'
import { useState } from 'react'
import { GiRoastChicken } from 'react-icons/gi'

export default function DialogLogIn({ show, handleClose }) {
  const [isCreating, setIsCreating] = useState(false)
  const { login } = useAuth()

  const handleLogin = async () => {
    setIsCreating(true)
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (email === '' || password === '') {
      alert('Please fill all the fields')
      return
    }

    try {
      const { accessToken, user } = await LoginWithEmail(email, password)
      login(user, accessToken)
      handleClose()
      toast.success('Login successfully')
      setIsCreating(false)
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleLoginWithGoogle = async () => {
    setIsCreating(true)
    try {
      const { idToken, responseData } = await SignInWithGoogle()
      login(responseData.user, idToken)
      handleClose()
      toast.success('Login successfully')
      setIsCreating(false)
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
          <Modal.Title>Log In</Modal.Title>
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
          <Button variant="secondary" onClick={handleClose} className="">
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin} className="">
            {isCreating ? (
              <div className="d-flex align-items-center justify-content-center">
                <GiRoastChicken className="icon-spin" style={{ fontSize: '1.5rem', color: '#e57b3c' }} />
              </div>
            ) : (
              'Log In'
            )}
          </Button>
          <Button onClick={handleLoginWithGoogle} className="google-btn">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo"></img>
            <span>Login with Google</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
