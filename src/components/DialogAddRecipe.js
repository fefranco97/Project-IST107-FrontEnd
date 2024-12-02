import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import { useState, useEffect } from 'react'
import { BsTrash, BsPlusCircle } from 'react-icons/bs'
import { GiRoastChicken } from 'react-icons/gi'
import './css/dialog.css'
import { getIngredients, createRecipe } from '../api/recipe'
import PortalDropDownMenu from './PortalDropDownMenu'
import { useAuth } from '../provider/auth-provider'
import toast from 'react-hot-toast'

export default function DialogAddRecipe({ show, handleClose }) {
  const [recipeName, setRecipeName] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [image, setImage] = useState(null)
  const [numberOfServings, setNumberOfServings] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState([{}])
  const [availableIngredients, setAvailableIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedQuantity, setSelectedQuantity] = useState([])
  const [selectedUnits, setSelectedUnits] = useState([])

  const [isCreating, setIsCreating] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    const ingredientsForSelect = async () => {
      try {
        const response = await getIngredients()
        setAvailableIngredients(response.data)
      } catch (error) {
        console.error('Failed to load ingredients:', error.message)
      }
    }
    ingredientsForSelect()
  }, [])

  const handleAddNewIngredients = () => {
    setIngredients([...ingredients, {}])
    setSelectedIngredients([...selectedIngredients, ''])
    setSelectedUnits([...selectedUnits, ''])
    setSelectedQuantity([...selectedQuantity, ''])
  }

  const handleDeleteIngredients = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index))
      setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index))
      setSelectedUnits(selectedUnits.filter((_, i) => i !== index))
      setSelectedQuantity(selectedQuantity.filter((_, i) => i !== index))
    }
  }

  const handleSelectIngredient = (index, ingredientName) => {
    const newSelectedIngredients = [...selectedIngredients]
    newSelectedIngredients[index] = ingredientName
    setSelectedIngredients(newSelectedIngredients)
  }

  const handleSelectUnit = (index, unit) => {
    const newSelectedUnits = [...selectedUnits]
    newSelectedUnits[index] = unit
    setSelectedUnits(newSelectedUnits)
  }

  const handleQuantityChange = (index, ingredientQuantity) => {
    const newSelectedQuantity = [...selectedQuantity]
    newSelectedQuantity[index] = ingredientQuantity
    setSelectedQuantity(newSelectedQuantity)
  }

  const resetForm = () => {
    setRecipeName('')
    setShortDescription('')
    setImage(null)
    setNumberOfServings('')
    setDescription('')
    setIngredients([{}])
    setSelectedIngredients([''])
    setSelectedUnits([''])
    setSelectedQuantity([''])
  }

  const handleModalClose = () => {
    handleClose()
    resetForm()
  }

  const handleAddRecipe = async () => {
    try {
      setIsCreating(true)
      const formattedIngredients = ingredients.map((_, index) => ({
        id: selectedIngredients[index],
        quantity: selectedQuantity[index],
        unit: selectedUnits[index],
      }))

      console.log(selectedQuantity)
      console.log(selectedIngredients)
      console.log(selectedUnits)

      console.log(formattedIngredients)

      await createRecipe(recipeName, formattedIngredients, description, shortDescription, user.id, image)

      handleModalClose()
      setIsCreating(false)
    } catch (error) {
      toast.error(error.message)
      setIsCreating(false)
      console.error('Failed to create recipe:', error.message)
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleModalClose} size="xl" onExited={resetForm}>
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
                value={recipeName}
                className="text-black"
                onChange={(e) => setRecipeName(e.target.value)}
              />
              <Form.Control
                className="mb-3 mt-3 text-black"
                id="short"
                placeholder="Short Description"
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
              <Form.Control
                className="mb-3 mt-3 text-black"
                id="picture"
                placeholder="Recipe image"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Form.Control
                id="numberOfServings"
                placeholder="Number of servings"
                type="number"
                value={numberOfServings}
                className="text-black"
                onChange={(e) => setNumberOfServings(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-end mb-2">
              <Button variant="link" onClick={handleAddNewIngredients} className="p-0">
                <BsPlusCircle size={24} />
              </Button>
            </div>

            <div className="ingredients-container">
              {ingredients.map((_, index) => (
                <Form.Group key={index} id={`ingredients-block-${index}`} className="mb-2 d-flex flex-row flex-grow-1">
                  <Dropdown>
                    <Dropdown.Toggle
                      id={`dropdown-block-${index}`}
                      className="custom-dropdown-toggle"
                      style={{ backgroundColor: '#f5e0b3', color: '#000' }}>
                      {selectedIngredients[index] || 'Select ingredients'}
                    </Dropdown.Toggle>

                    <PortalDropDownMenu>
                      <Dropdown.Menu className="custom-dropdown-menu">
                        {availableIngredients
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((ingredient, i) => (
                            <Dropdown.Item key={i} onClick={() => handleSelectIngredient(index, ingredient.name)}>
                              {ingredient.name}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </PortalDropDownMenu>
                  </Dropdown>
                  <Form.Control
                    className="mx-2 text-black"
                    type="number"
                    placeholder="Quantity"
                    value={selectedQuantity[index] || ''}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                  <Dropdown>
                    <Dropdown.Toggle
                      id={`dropdown-units-${index}`}
                      className="custom-dropdown-toggle"
                      style={{ backgroundColor: '#f5e0b3', color: '#000' }}>
                      {selectedUnits[index] || 'Select Units'}
                    </Dropdown.Toggle>

                    <PortalDropDownMenu>
                      <Dropdown.Menu className="custom-dropdown-menu">
                        {['Pieces', 'ml', 'mg', 'g', 'kg', 'As you wish', 'Tablespoon', 'Cup', 'Unit']
                          .sort()
                          .map((unit, i) => (
                            <Dropdown.Item key={i} onClick={() => handleSelectUnit(index, unit)}>
                              {unit}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </PortalDropDownMenu>
                  </Dropdown>
                  {ingredients.length > 1 && (
                    <Button variant="outline-danger" className="ms-2" onClick={() => handleDeleteIngredients(index)}>
                      <BsTrash />
                    </Button>
                  )}
                </Form.Group>
              ))}
            </div>

            <Form.Group className="mb-3">
              <Form.Control
                className="text-black"
                id="instruction"
                as="textarea"
                placeholder="Description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleAddRecipe} disabled={isCreating}>
            {isCreating ? (
              <div className="d-flex align-items-center justify-content-center">
                <GiRoastChicken className="icon-spin" style={{ fontSize: '1.5rem', color: '#e57b3c' }} />
              </div>
            ) : (
              'Add Recipe'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
