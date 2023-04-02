import { HashLink } from "react-router-hash-link";
import "../styles/Landing.css";

function Landing() {
    return (
        <div className="Landing">
            <div className="navbar">
                <div className="left-nav">
                    <img className="logo" src="images/logo.png"/>
                </div>
                <div className="mid-nav">
                    <p className="nav-text">about</p>
                    <p className="nav-text">features</p>
                    <p className="nav-text">pricing</p>
                </div>
                <div className="right-nav">
                    <HashLink to="/transition#"><button>try it out</button></HashLink>
                </div>
                
            </div>
            <div className="hero">
                <div className="hero-text">
                    <h1 className="hero-title">Time-travelling made easy.</h1>
                    <p className="sub"> Children can experience travelling through time with our product. Our storybooks have beautiful and pleasing graphics as well
                        as interactive clickables to help children on their learning journey. Through our storybooks, we nurture children's sense of curiosity for history in a natural, exploratory manner.</p>
                        <HashLink to="/transition#"><button>Get started</button></HashLink>
                </div>
                <img src="/images/clock.png"/>
                
            </div>
            <footer>Made with ♡ by Team 8 at ProduHacks</footer>
        </div>
    )
}

export default Landing;