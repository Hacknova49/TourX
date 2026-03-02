import React from "react";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
function Landing(){
    return(
        <div>
            <Navbar/>
            <Hero/>
            <Features/>
            <Footer/>
        </div>
    );
}
export default Landing;