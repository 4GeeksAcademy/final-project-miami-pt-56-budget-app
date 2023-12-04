import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Splashpage from "./pages/Splashpage";
import Piggybank from "./pages/piggybankpage";
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { NavBar } from "./component/navbar";
import { Footer } from "./component/footer";
import { EditAccount } from "./pages/Account";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const [showNavbar, setShowNavbar] = useState(true);
    const [currentURL, setCurrentURL] = useState(true);

    useEffect(() => {
        if(currentURL == '/signin' || currentURL == '/signup'){
            setShowNavbar(false)
        }
        else{setShowNavbar(true)}
    }, [currentURL])

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {showNavbar && <NavBar />}
                    <Routes>

                        <Route element={<Splashpage />} path="/splashpage" />
                        <Route element={<Home setCurrentURL={setCurrentURL} />} path="/" />
                        <Route element={<SignIn setCurrentURL={setCurrentURL} />} path="/signin" />
                        <Route element={<SignUp setCurrentURL={setCurrentURL} />} path="/signup" />
                        <Route element={<EditAccount />} path="/account" />
                        <Route element={<Piggybank />} path="/piggybankpage" />


                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
