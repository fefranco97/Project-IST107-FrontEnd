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

export { getAllRecipes, createRecipe, getIngredients, getRecipe }
