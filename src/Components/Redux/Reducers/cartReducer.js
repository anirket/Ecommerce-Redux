import { ADD_CART_PRODUCT, REMOVE_CART_PRODUCT, GET_CART_PRODUCTS } from '../Constants/constants'

const initialState = {
    loading: false,
    error: false,
    cartItems: [],
    itemexists: false,
    succesfulladded: false
}

export const cartReducer = (currState = initialState, action) => {
    switch (action.type) {
        case ADD_CART_PRODUCT:
            let id = action.payload.id;
            let flag = false;
            currState.cartItems.map((items) => {
                if (items.id === id) {
                    flag = true;
                }
            })
            if (flag == true) {
                return { ...currState, loading: false, error: false, itemexists: true, succesfulladded: false }
            }
            else {
                let new_cart = [...currState.cartItems, action.payload]
                return { ...currState, loading: false, error: false, cartItems: new_cart, itemexists: false, succesfulladded: true }
            }
        case REMOVE_CART_PRODUCT:
            console.log(action.id);
            return {
                ...currState, loading: false, error: false, cartItems: currState.cartItems.filter(item => item.id != action.id), itemexists: false, succesfulladded: false
            }
        default:
            return currState;
    }

}