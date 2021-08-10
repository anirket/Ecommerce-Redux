import { SET_PRODUCTS, FETCH_ERROR, LOADING_PRODUCTS, GET_CATEGORY_PRODUCTS } from '../Constants/constants'

const initialState = {
    loading: false,
    productarray: [],
    category: ["electronics", "jewelery", "men clothing", "women clothing"],
    category_products: [],
    error: false
}


export const itemsreducer = (currsate = initialState, action) => {
    switch (action.type) {
        case LOADING_PRODUCTS:
            return { ...currsate, loading: true, error: false }
        case SET_PRODUCTS:
            return { ...currsate, productarray: action.payload, error: false, loading: false }
        case FETCH_ERROR:
            return { ...currsate, error: true, loading: false }
        case GET_CATEGORY_PRODUCTS:
            return { ...currsate, category_products: action.payload,error: false, loading: false }
        default:
            return currsate;
    }
}