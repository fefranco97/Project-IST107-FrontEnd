import {config} from "../config/config";

async function getAllRecipes() {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }


    const url = `https://getAllRecipes${config.apiBaseUrl.production}`
        //? `${config.apiBaseUrl.development}/createUser`
    // `https://createUser${config.apiBaseUrl.production}`

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

    const url = `https://getRecipeDetail?id=${id}${config.apiBaseUrl.production}`;

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
    //? `${config.apiBaseUrl.development}/createUser`
    // `https://createUser${config.apiBaseUrl.production}`

    const response = await fetch(url, options)
    const responseData = await response.json()

    if (responseData.status !== 'success') {
        console.log(responseData);
        throw new Error(responseData.message)
    }

    return responseData
}

async function createRecipe(title, ingredients, instruction, short, user, img) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title, ingredients, instruction, short, user, img}),
    }

    const url = `https://createRecipe${config.apiBaseUrl.production}`

    const response = await fetch(url, options)
    const responseData = await response.json()

    if (responseData.status !== 'success') {
        throw new Error(responseData.message)
    }

    return responseData
}

export {getAllRecipes, createRecipe, getIngredients, getRecipe}