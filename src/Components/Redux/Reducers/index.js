import { combineReducers } from 'redux'
import { itemsreducer } from './itemReducer'
import { cartReducer } from "./cartReducer"

export const rootReducer = combineReducers({
    homeproducts: itemsreducer,
    cart: cartReducer
})