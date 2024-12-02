import { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { useParams } from 'react-router-dom'
import { getRecipe } from '../api/recipe'
import { GiRoastChicken } from 'react-icons/gi'

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setIsLoading(true)
    const data = async () => {
      const resp = await getRecipe(id)
      if (resp) {
        setRecipe(resp.data)
      }
    }
    data().then((data) => {
      console.log(data)
      setIsLoading(false)
    })
  }, [id])

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh', backgroundColor: '#f8f0e3' }}>
        <GiRoastChicken className="icon-spin" style={{ fontSize: '8rem', color: '#e57b3c' }} />
      </div>
    )
  }

  return (
    <div className="container pt-4" style={{ height: 'calc(100vh - 4.5rem)' }}>
      <h2>{recipe.title}</h2>
      <div className="row">
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <img
            src={recipe.img}
            alt={recipe.title}
            className="img-fluid"
            style={{ maxHeight: '300px', objectFit: 'cover', borderRadius: '20px' }}
          />
        </div>
        <div className="col-lg-6">
          <h4>Ingredients</h4>
          <ListGroup>
            {recipe.ingredients.map((ingredient, index) => (
              <ListGroup.Item key={index}>
                {ingredient.id + ' ' + ingredient.quantity + ' ' + ingredient.unit}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <h4>Description</h4>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  )
}
