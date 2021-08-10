import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RiArrowRightSLine } from "react-icons/ri";
import { removecartproduct } from './Redux/Actions/itemsaction'
import StripeCheckout from 'react-stripe-checkout';



const Cart = () => {
    const cart_items = useSelector(state => state.cart.cartItems);
    const home_products = useSelector(state => state.homeproducts.productarray);
    const [cart_item_details_state, setcart_item_details_state] = useState([]);
    const [total_price, settotal_price] = useState(0);
    let cart_item_details = [];
    const dispatch = useDispatch();

    const removecartitem = (id) => {
        dispatch(removecartproduct(id));
    }

    const handletoken = (token, address) => {
        console.log(token, address);
    }

    useEffect(() => {
        cart_item_details = []
        if (cart_items.length == 0) {
            setcart_item_details_state([])
            return
        }
        for (let i = 0; i < cart_items.length; i++) {
            for (let j = 0; j < home_products.length; j++) {
                if (cart_items[i].id == home_products[j].id) {
                    home_products[j].quantity = cart_items[i].quantity;
                    cart_item_details.push(home_products[j]);
                    setcart_item_details_state(cart_item_details)
                    break;
                }
            }
        }
    }, [cart_items, home_products])


    useEffect(() => {

        let total_cost = 0;
        cart_item_details_state.map((items) => {
            total_cost += items.price * items.quantity;
        })
        settotal_price(total_cost)

    }, [cart_item_details, cart_item_details_state, cart_items])

    console.log(cart_items);
    return (
        <>
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center pt-5">
                {cart_item_details_state.map(({ image, title, price, category, id, description, quantity }) => {
                    let category_title = category.toUpperCase();
                    return (
                        <div key={id} className="card border-2 md:mr-1 md:ml-1  border-gray-600 rounded-lg flex flex-col items-center p-2 pt-4 mb-2 ">
                            <img className="product_image" src={image} alt="" />
                            <div className="product_info">
                                <h2 className="md:pt-10 text-xl font-semibold text-center">{title}</h2>
                                <h3 className=" text-center pt-1 text-sm text-gray-600">{category_title}</h3>
                                <h4 className="text-center font-semibold pt-3"> Quantity : {quantity}</h4>
                                <div className="flex justify-around product_important_details pt-10 ">
                                    <h1 className="text-3xl pl-2">₹ {price * quantity}</h1>
                                    <div>
                                        <button id={id} onClick={() => removecartitem(id)} className="bg-red-500 p-4 text-white text-md tracking-wider rounded-lg">DELETE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {cart_item_details_state.length ?
                (
                    <div className="checkout flex flex-col items-center justify-center pt-2">
                        <h2 className="text-xl pb-2">Total Price: <span className="text-sxl font-semibold">₹ {total_price}</span></h2>
                        <div className="pb-5 pt-5 text-2xl">
                            <StripeCheckout
                                stripeKey="pk_test_51Hey1yBTLqdejHDNhlIr9mrEfD9kqRfZEBCl6LSfWpLBGmloxpOH1fUHCU468R5EtfwdtFvyJ4F9lQ5xnJ3xfBfF000hTuVCW4"
                                token={handletoken}
                                billingAddress
                                shippingAddress
                                amount={(total_price / 70) * 100} />
                        </div>

                    </div>
                )
                :
                (
                    <div className="pt-20 flex justify-center flex-col items-center">
                        <h2 className="text-2xl text-center pb-4">Cart is Empty :(</h2>
                        <img src="./empty_cart.gif" alt="" />
                    </div>
                )
            }
        </>
    )
}

export default Cart
