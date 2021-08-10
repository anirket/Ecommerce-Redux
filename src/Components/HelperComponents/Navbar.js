import React, { useEffect, useRef } from 'react'
import { HiHome } from "react-icons/hi";
import { RiShoppingCartLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from 'react';

const Navbar = () => {

    const [displaydropdown, setdisplaydropdown] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setdisplaydropdown(false);
        }
    };


    useEffect(() => {
        setdisplaydropdown(false);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);


    return (
        <div className="hidden md:flex items-center pl-2 pb-2 navbar justify-between">
            <div className="logo md:text-4xl text-md  font-semibold">
                Shopeasy
            </div>
            <div className="navelements flex pr-2 items-center justify-around text-xl font-semibold text-white pt-1">
                <Link to="/">
                    <div className="flex items-center">
                        <HiHome />
                        <span className="pl-2">
                            Home
                        </span>
                    </div>
                </Link>
                <div className="flex items-center cursor-pointer"
                    onClick={() => setdisplaydropdown(true)}
                    ref={ref}
                >
                    <span className="pl-2 flex items-center ">
                        Category
                        <RiArrowDropDownLine className="text-4xl pt-1" />
                    </span>
                </div>
                <ul  className={" text-lg absolute mt-40 pr-0 text-gray-700 pt-1 " + (displaydropdown ? "" : "hidden")}>
                    <li className="">
                        <Link
                            className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                            to="/category/electronics"
                        >Electronics
                        </Link>
                    </li>
                    <li className="">
                        <Link
                            className="bg-gray-200 hover:bg-gray-400 py-2  px-3 block whitespace-no-wrap"
                            to="/category/jewelery"
                        >Jewelery
                        </Link>
                    </li>
                </ul>
                <Link to="/cart"><div className="flex items-center"><RiShoppingCartLine className="text-2xl" /><span className="pl-2">Cart</span></div></Link>
            </div>
        </div>
    )
}

export default Navbar
