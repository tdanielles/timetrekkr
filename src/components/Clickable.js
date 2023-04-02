import '../styles/Clickable.css';
import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

function Clickable(props) {
    const { imgUrl, desc, learnmore, isOneClicked, setRestriction } = props;
    const [clicked, setClicked] = useState(false);

    // OpenAI stuff
    const [apiResponse, setApiResponse] = useState("");
    const API_KEY = "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";

    const displayInfoBox = (e) => {
        if (!isOneClicked) {
            setClicked(true);
            setRestriction(true);
        }
    }

    const hideInfoBox = (e) => {
        setClicked(false);
        setRestriction(false);
        setApiResponse("");
    }

    const generateStuff = async (e) => {
        let prompt = e.target.innerHTML;
        const APIBody = {
            "model": "text-davinci-003",
            "prompt": "You're teaching history to a 6-year-old. I will provide a prompt about a historical statement. You will tell me more about the historical statement using an elementary educational approach. This is the prompt: " + prompt,
            "temperature": 0.3,
            "max_tokens": 150,
            "top_p": 1.0,
            "frequency_penalty": 0.0,
            "presence_penalty": 0.0
        }
        
        await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify(APIBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data.choices[0].text.trim());
            setApiResponse(data.choices[0].text.trim());
        });
        
        
    }

    const backToOriginal = () => {
        setApiResponse("");
    }

    return(
        <div className="Clickable">
            <img className="clickable-img" src={imgUrl} onClick={displayInfoBox}/>
            {clicked && <div className="info-box">
                {apiResponse !== "" ?  apiResponse : desc}
                {learnmore.map((learn) => (
                    <p>Learn more about <span className="emphasis" onClick={generateStuff}>{learn}</span></p>
                ))}
                <div className='buttons'>
                    <button onClick={backToOriginal}>Back to Original Text</button>
                    <button onClick={hideInfoBox}>Exit</button>
                </div>
            </div>}
        </div>
    );
}

export default Clickable;