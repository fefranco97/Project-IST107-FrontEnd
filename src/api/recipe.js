import { config } from '../config/config'

async function getAllRecipes() {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  const url = `https://getAllRecipes${config.apiBaseUrl.production}`

  const response = await fetch(url, options)
  const responseData = await response.json()

  if (responseData.status !== 'success') {
    throw new Error(responseData.message)
  }

  return responseData
}

async function getRecipe(id) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  const url = `https://getRecipeDetails${config.apiBaseUrl.production}?id=${id}`

  const response = await fetch(url, options)
  const responseData = await response.json()

  if (responseData.status !== 'success') {
    throw new Error(responseData.message)
  }

  return responseData
}

async function getUserRecipes(userId) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }

  const url = `https://getUserRecipes${config.apiBaseUrl.production}?userId=${userId}`

  const response = await fetch(url, options)
  const responseData = await  response.json()

  if(responseData.status !== 'success') {
     throw new Error(responseData.message)
  }

  return responseData
}

async function getIngredients() {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  const url = `https://ingredients${config.apiBaseUrl.production}`

  const response = await fetch(url, options)
  const responseData = await response.json()

  if (responseData.status !== 'success') {
    throw new Error(responseData.message)
  }

  return responseData
}

async function createRecipe(title, ingredients, instructions, short, user, img) {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('ingredients', JSON.stringify(ingredients))
  formData.append('instructions', instructions)
  formData.append('short', short)
  formData.append('user', user)
  formData.append('img', img)

  const url = config.isDevelopmentEnv
    ? `${config.apiBaseUrl.development}/createRecipe`
    : `https://createRecipe${config.apiBaseUrl.production}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    const responseData = await response.json()
    if (responseData.status !== 'success') {
      throw new Error(responseData.message)
    }

    return responseData
  } catch (error) {
    console.error('Erro ao criar receita:', error)
    throw error
  }
}

async function deleteRecipe(recipeId) {
   const options = {
     method: 'DELETE',
     headers: { 'Content-Type': 'application/json' },
   }

  const url = `https://deleteRecipe${config.apiBaseUrl.production}?id=${recipeId}`

  const response = await fetch(url, options)
  const responseData = await response.json()

  if (responseData.status !== 'success') {
    throw new Error(responseData.message)
  }

  return responseData
}

export { getAllRecipes, createRecipe, getIngredients, getRecipe, getUserRecipes, deleteRecipe }
