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
                    <HashLink to="#about"><p className="nav-text">features</p></HashLink>
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
            <div className="about" id="about">
                <div className="about-text">
                    <h1 className="about-title">Our features</h1>
                    <div className="card-container">
                        <div className="card">
                            <img src="images/time-travel.png"/>
                            <h3>Journey through time.</h3>
                            <p>Immerse your senses with a chronological visual adventure from past to present.</p>
                        </div>
                        <div className="card">
                            <img src="images/interactive.png"/>
                            <h3>Interactive and accessible UI.</h3>
                            <p>Hover animations and clickable images foster curiosity, exploration, and engagement.</p>
                        </div>
                        <div className="card">
                            <img src="images/fun-fact.png"/>
                            <h3>Fun fact generator.</h3>
                            <p>A fun fact a day keeps the kids coming back to play. AI-powered to never skip a beat.</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <footer>Made with ♡ by Team 8 at ProduHacks</footer>
        </div>
    )
}

export default Landing;