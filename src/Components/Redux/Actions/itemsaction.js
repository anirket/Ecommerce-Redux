import { SET_PRODUCTS, FETCH_ERROR, LOADING_PRODUCTS, ADD_CART_PRODUCT, REMOVE_CART_PRODUCT, GET_CATEGORY_PRODUCTS } from '../Constants/constants'

export const get_home_products = () => {
    return async dispatch => {
        try {
            dispatch({
                type: LOADING_PRODUCTS
            })
            const data = await fetch("https://fakestoreapi.com/products")
            const converttojson = await data.json()
            dispatch({
                type: SET_PRODUCTS,
                payload: converttojson
            })
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: FETCH_ERROR
            })
        }
    }
}

export const addcartproduct = (payload) => {
    return {
        type: ADD_CART_PRODUCT,
        payload: payload
    }
}

export const removecartproduct = (payload) => {
    return {
        type: REMOVE_CART_PRODUCT,
        id: payload
    }
}

export const getcategoryproducst = (category) => {
    return async dispatch => {
        try {
            dispatch({
                type: LOADING_PRODUCTS
            })
            const data = await fetch(`https://fakestoreapi.com/products/category/${category}`)
            const converttojson = await data.json()
            console.log(converttojson);
            dispatch({
                type: GET_CATEGORY_PRODUCTS,
                payload: converttojson
            })

        } catch (error) {
            console.log(error);
            dispatch({
                type: FETCH_ERROR
            })
        }
    }
}