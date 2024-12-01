import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import DialogAddRecipe from './DialogAddRecipe'
import { useState, useEffect } from 'react'
import RecipesList from './RecipesList'
import DialogSignUp from './DialogSignUp'
import DialogLogIn from './DialogLogIn'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RecipeDetail from './RecipeDetail'
import AccountDetail from './AccountDetail'
import { getAllRecipes } from '../api/recipe'
import { useAuth } from '../provider/auth-provider'
import './css/mainPage.css'

function MainPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showSignUpDialog, setShowSignUpDialog] = useState(false)
  const [showLogInDialog, setShowLogInDialog] = useState(false)

  const { user, logout } = useAuth()
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const data = async () => {
      const resp = await getAllRecipes()
      if (resp) {
        setRecipes(resp.data)
      }
    }

    data().then((data) => {})
  }, [])

  const handleCloseAddDialog = async () => {
    setShowAddDialog(false)
    const resp = await getAllRecipes()
    if (resp) {
      setRecipes(resp.data)
    }
  }

  const handleCloseSignUpDialog = async () => {
    setShowSignUpDialog(false)
  }

  const handleCloseLogInDialog = () => {
    setShowLogInDialog(false)
  }

  return (
    <Router>
      <Navbar expand="lg" className="bg-primary gap-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Recipes Book
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-between w-100">
              <div className="d-flex gap-2">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>

                {user ? (
                  <Nav.Link as={Link} to="/account">
                    Account
                  </Nav.Link>
                ) : (
                  ''
                )}
              </div>
              <div>
                {user ? (
                  <Button variant="secondary" onClick={() => setShowAddDialog(true)}>
                    Add Recipe
                  </Button>
                ) : (
                  ''
                )}

                <Button className="mx-2" variant="secondary" onClick={() => setShowSignUpDialog(true)}>
                  Sign Up
                </Button>

                {user ? (
                  <Button className="mr-2" variant="secondary" onClick={() => logout()}>
                    Log Out
                  </Button>
                ) : (
                  <Button className="mr-2" variant="secondary" onClick={() => setShowLogInDialog(true)}>
                    Log In
                  </Button>
                )}

                {user && user.photoURL ? (
                  <img src={user.photoURL} class="rounded-circle shadow-4 mx-3" style={{ width: 36 }} alt="Avatar" />
                ) : (
                  ''
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="mt-3 ml-3">
                <RecipesList recipes={recipes} showLoadingAnimation={true} />
              </div>
              <DialogAddRecipe show={showAddDialog} handleClose={handleCloseAddDialog} />
              <DialogSignUp show={showSignUpDialog} handleClose={handleCloseSignUpDialog} />
              <DialogLogIn show={showLogInDialog} handleClose={handleCloseLogInDialog} />
            </div>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
        <Route path="/account" element={<AccountDetail logInUser={user}/>} />
      </Routes>
    </Router>
  )
}

export default MainPage
