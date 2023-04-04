import { HashLink } from "react-router-hash-link";
import "../styles/Transition.css";
import Search from "../components/Search";
import { useState } from "react";

function Transition() {
    const [searchInput, setSearchInput] = useState("");
    const [link, setLink] = useState("/transition#");
    const [error, setError] = useState(false);
    const countries = ["Egypt"]; // unfortunate

    const handleMoreStuff = (x) => {
        console.log("Reached here")
        console.log(link)
        if (countries.includes(x)) {
            setError(false);
        } else {
            setError(true);
        }
    }

    /*const search = () => {
        if (countries.includes(searchInput)) {
            console.log(searchInput);
            setLink("/demo#");
        } else {
            console.log(searchInput);
            setLink("error");
        }
    }*/

    return (
        <div className="Transition">
            <img className="logo-trans" src="images/logo.png"/>
            <div className="trans-main">
                <div className="trans-left">
                    <h1>Where will you go? Explore and find out!</h1>
                    <Search handleMoreStuff={handleMoreStuff} link={link} setLink={setLink}/>
                    { error ? <p className="error">Country doesn't exist in our database!</p> : ""}
                </div>
                <img className="bookshelf" src="images/bookshelf.png"/>
            </div>
            
            
        </div>
    )
}

export default Transition;