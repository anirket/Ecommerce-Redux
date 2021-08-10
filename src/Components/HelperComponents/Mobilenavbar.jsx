import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { RiArrowDropDownLine, RiShoppingCartLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';


const Mobilenavbar = () => {
    const [togglenavbar, settogglenavbar] = useState(false);
    const [displaydropdown, setdisplaydropdown] = useState(false);
    const location = useLocation();

    const ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setdisplaydropdown(false);
        }
    };
    useEffect(() => {
        setdisplaydropdown(false);
        settogglenavbar(false);
    }, [location]);

    const sidenavbarref = useRef(null);


    useEffect(() => {

        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('click', togglenavbarbyclick, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('click', togglenavbarbyclick, true);
        };
    }, []);

    const togglenavbarbyclick = (e)=>{
        if (sidenavbarref.current && !sidenavbarref.current.contains(e.target)) {
            settogglenavbar(false);
        }
    }

    return (
        <div className="md:hidden">
            <div className="md:hidden pl-2 pb-2 navbar flex items-center">
                <div className="burger-menu text-2xl pt-1 pl-3 text-white cursor-pointer" onClick={() => settogglenavbar(!togglenavbar)}>
                    <GiHamburgerMenu />
                </div>
                <div className="logo  text-2xl w-full flex justify-end pr-4  font-semibold">
                    Shopeasy
                </div>
            </div>
            <div ref={sidenavbarref} className={" flex-no-wrap " + (togglenavbar ? "flex" : "hidden")}>
                <div className="w-64 z-40 h-full absolute bg-gray-800 shadow flex-col justify-between ">

                    <div className="px-8">
                        <div className="h-16 w-full flex items-center logo">
                            <div className="logo  text-2xl  font-semibold w-full">
                                Shopeasy
                            </div>
                        </div>
                        <ul className="mt-12 text-white">
                            <div className="p-4">
                                <Link to="/">
                                    <div className="flex items-center">
                                        <HiHome />
                                        <span className="pl-2">
                                            Home
                                        </span>
                                    </div>
                                </Link>
                            </div>
                            <div className="p-4">

                                <div className="flex items-center" onClick={() => setdisplaydropdown(!displaydropdown)}>
                                    <span className="pl-2">
                                        Category

                                    </span>
                                    <RiArrowDropDownLine className="text-4xl pt-1" />
                                </div>
                                <ul className={" text-md pt-1 text-blue-500 " + (displaydropdown ? "" : "hidden")}>
                                    <li className="">
                                        <Link
                                            className="rounded-t  py-2 px-4 block whitespace-no-wrap"
                                            to="/category/electronics"
                                        >Electronics
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link
                                            className=" py-2  px-3 block whitespace-no-wrap"
                                            to="/category/jewelery"
                                        >Jewelery
                                        </Link>
                                    </li>
                                    
                                </ul>
                            </div>
                            <div className="p-4">
                                <Link to="/cart"><div className="flex items-center"><RiShoppingCartLine className="text-2xl" /><span className="pl-2">Cart</span></div></Link>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Mobilenavbar
