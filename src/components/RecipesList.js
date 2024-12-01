import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GiRoastChicken } from 'react-icons/gi';
import { BsTrash } from 'react-icons/bs';

export default function RecipesList({ recipes, showLoadingAnimation = false, showDeleteButton = false, onRecipeDelete }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(showLoadingAnimation);

  useEffect(() => {
    if (showLoadingAnimation) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [showLoadingAnimation]);

  const handleDetailClick = async (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleDeleteClick = (id) => {
    if (onRecipeDelete) {
      onRecipeDelete(id);
    }
  };

  return (
      loading ? (
          <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#f8f0e3' }}>
            <GiRoastChicken className="icon-spin" style={{ fontSize: "8rem", color: '#e57b3c' }} />
          </div>
      ) : (
          <div className="container mt-4">
            <div className="row">
              {recipes.map((recipe) => (
                  <div className="col-md-4 mb-4" key={recipe.id}>
                    <Card className="h-100 shadow-sm border-0">
                      <Card.Img variant="top" src={recipe.img} alt={recipe.title} className="w-100 h-50" />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{recipe.title}</Card.Title>
                        <Card.Text className="flex-grow-1">{recipe.short}</Card.Text>
                        <div className="d-flex justify-content-between mt-auto">
                          <Button variant="primary" onClick={() => handleDetailClick(recipe.id)}>
                            Detail
                          </Button>
                          {showDeleteButton && (
                              <Button variant="outline-danger" onClick={() => handleDeleteClick(recipe.id)}>
                                <BsTrash />
                              </Button>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
              ))}
            </div>
          </div>
      )
  );
}
