import React from 'react'
import Navbar from './Components/HelperComponents/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Components/Home'
import Category from './Components/Category'
import Cart from './Components/Cart'
import Mobilenavbar from './Components/HelperComponents/Mobilenavbar'


const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="md:hidden">
                <Mobilenavbar />
            </div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/category/:category" exact component={Category} />
                <Route path="/cart" exact component={Cart} />
            </Switch>
        </Router>
    )
}

export default App
