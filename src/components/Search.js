import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import "../styles/Search.css";
import { Navigate } from "react-router-dom";

function Search(props) {
    const { handleMoreStuff, link, setLink} = props;

    const countries = ["Egypt"]; // unfortunate
    const [searchInput, setSearchInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (countries.includes(searchInput)) {
            setLink("/demo#");
        } else {
            setLink("/transition#");
        }
        console.log("I ran");
        console.log(link);

        handleMoreStuff(searchInput);
    }

    return (
        <div className="Search">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Where do you want to go?"
                    onChange={e => setSearchInput(e.target.value)}
                />
                <button type="submit">
                    <img src="images/search.png"/>
                </button>
            </form>
            { link != "/transition#" ? <Navigate to="/demo#"/> : ""}
        </div>
    )
}

export default Search;