import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getcategoryproducst, addcartproduct } from './Redux/Actions/itemsaction'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { RiShoppingCartLine } from 'react-icons/ri';
import { useAlert } from 'react-alert'
import { CgMathMinus, CgMathPlus } from 'react-icons/cg';

const Category = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const error_check = useSelector(state => state.homeproducts.error)
    const loading_check = useSelector(state => state.homeproducts.loading)
    const category_products = useSelector(state => state.homeproducts.category_products)
    const item_exist_check = useSelector(state => state.cart.itemexists);
    const successfull_added = useSelector(state => state.cart.succesfulladded);
    const alert = useAlert()
    const [item_clicked, setitem_clicked] = useState(0);
    useEffect(() => {
        dispatch(getcategoryproducst(category));
    }, [category])
    useEffect(() => {
        console.log("hello");
        if (item_clicked != 0) {
            if (item_exist_check) {
                alert.show('This item already exists in cart!')
            }
            if (successfull_added) {
                alert.show('Item added Successfully')
            }
        }
    }, [item_clicked])

    const handlecounter = (e, action) => {

        let target_element;
        if (action === "add") {
            if (e.target.tagName === "svg") {
                target_element = e.target.parentElement.nextElementSibling;
            }
            else if (e.target.tagName === "path") {
                target_element = e.target.parentElement.parentElement.nextElementSibling;
            }
            else if (e.target.tagName === "BUTTON") {
                target_element = e.target.nextElementSibling;
            }
        }
        else {
            if (e.target.tagName === "svg") {
                target_element = e.target.parentElement.previousElementSibling;
            }
            else if (e.target.tagName === "path") {
                target_element = e.target.parentElement.parentElement.previousElementSibling;
            }
            else if (e.target.tagName === "BUTTON") {
                target_element = e.target.previousElementSibling;
            }
        }

        let current_counter = target_element.textContent;
        if (action === "add") {
            if (current_counter == 10) {

                //cant increment popup
                return;
            }
            current_counter++;
        }
        else {
            if (current_counter == 1) {
                //cant increment popup
                return;
            }
            current_counter--;
        }


        target_element.textContent = current_counter;
    }
    const additemtocart = (e) => {
        console.log(e.target.tagName);
        let button_element = e.target;
        if (e.target.tagName == "svg") {
            button_element = e.target.parentElement;
        }
        else if (e.target.tagName == "path") {
            button_element = e.target.parentElement.parentElement.parentElement;
        }
        let element_id = button_element.id;
        let quantity = button_element.parentElement.previousElementSibling.children[1].textContent;
        console.log(element_id, quantity);

        let payload = {
            id: element_id,
            quantity: quantity
        }

        dispatch(addcartproduct(payload));

        setitem_clicked(prevstate => prevstate + 1)

        ///changfe here
    }
    if (error_check) {
        return (
            <div className="flex flex-col items-center justify-center pt-32">
                <h1 className="text-2xl font-semibold pb-10 text-center">The server responed with error Please try later!!</h1>
                <img src="./error.gif" alt="" />
            </div>
        )
    }
    if (loading_check) {
        return (
            <div className="loader flex justify-center items-center pt-40 flex-col">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
                <h2 className="text-3xl pt-20">LOADING...</h2>
            </div>
        )
    }


    return (
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center pt-2 md:pt-5">
            {category_products.map(({ image, title, price, category, id }) => {
                let category_title = category.toUpperCase();
                return (
                    <div key={id} className="card border-2 md:mr-1 md:ml-1  border-gray-600 rounded-lg flex flex-col  items-center p-2 pt-4 mb-2 ">
                        <img className="product_image" src={image} alt="" />

                        <div className="product_info">

                            <h2 className="md:pt-10 text-xl font-semibold text-center">{title}</h2>
                            <h3 className=" text-center pt-1 text-sm text-gray-600">{category_title}</h3>

                            <div className="md:pt-5 Quantity flex items-center justify-center pt-2">
                                <button onClick={(e) => handlecounter(e, "add")} className="bg-gray-300 p-2 text-2xl"><CgMathPlus /></button>
                                <h2 className="p-2">{1}</h2>
                                <button onClick={(e) => handlecounter(e, "remove")} className="bg-gray-300 p-2 text-2xl"><CgMathMinus /></button>
                            </div>
                            <div className="flex justify-between product_important_details pt-10 ">
                                <h1 className="text-3xl pl-2">₹ {price}</h1>
                                <button id={id} onClick={additemtocart} className="bg-green-600 p-3 flex items-center w-36 md:w-52 md:text-2xl justify-around text-white">
                                    Add to cart <RiShoppingCartLine />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Category
