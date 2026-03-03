import {useNavigate} from "react-router-dom";
function Hero(){
    const navigate=useNavigate();
    return(
        <section className="hero">
            <div className="hero-content">
                <h1>Explore Beyond.
                    <br/>
                    Travel Protected.
                </h1>
                <p>Real-time safety monitoring for modern explorers</p>
                
                <button className="hero-button" onClick={()=>navigate("/Login")}>GET STARTED</button>
            </div>
        </section>
    );
}
export default Hero