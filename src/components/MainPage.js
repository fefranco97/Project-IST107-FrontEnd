import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import DialogAddRecipe from './DialogAddRecipe'
import { useState } from 'react'
import RecipesList from './RecipesList'
import DialogSignUp from './DialogSignUp'
import DialogLogIn from './DialogLogIn'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RecipeDetail from './RecipeDetail'
import AccountDetail from './AccountDetail'

function MainPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showSignUpDialog, setShowSignUpDialog] = useState(false)
  const [showLogInDialog, setShowLogInDialog] = useState(false)

  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Burger', img: 'img.png', shortDescription: 'Most popular burger in the world' },
    { id: 2, name: 'Burger', img: 'img.png', shortDescription: 'Most popular burger in the world' },
    { id: 3, name: 'Burger', img: 'img.png', shortDescription: 'Most popular burger in the world' },
    { id: 4, name: 'Burger', img: 'img.png', shortDescription: 'Most popular burger in the world' },
    { id: 5, name: 'Burger', img: 'img.png', shortDescription: 'Most popular burger in the world' },
  ])

  const handleCloseAddDialog = () => {
    setShowAddDialog(false)
  }

  const handleCloseSignUpDialog = async () => {
    setShowSignUpDialog(false)
  }

  const handleCloseLogInDialog = () => {
    setShowLogInDialog(false)
  }

  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary gap-4">
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
                <Nav.Link as={Link} to="/account">
                  Account
                </Nav.Link>
              </div>
              <div>
                <Button variant="primary" onClick={() => setShowAddDialog(true)}>
                  Add Recipe
                </Button>
                <Button className="mx-2" variant="secondary" onClick={() => setShowSignUpDialog(true)}>
                  Sign Up
                </Button>
                <Button className="mr-2" variant="secondary" onClick={() => setShowLogInDialog(true)}>
                  Log In
                </Button>
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
                <RecipesList recipes={recipes} />
              </div>
              <DialogAddRecipe show={showAddDialog} handleClose={handleCloseAddDialog} />
              <DialogSignUp show={showSignUpDialog} handleClose={handleCloseSignUpDialog} />
              <DialogLogIn show={showLogInDialog} handleClose={handleCloseLogInDialog} />
            </div>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
        <Route path="/account" element={<AccountDetail />} />
      </Routes>
    </Router>
  )
}

export default MainPage
