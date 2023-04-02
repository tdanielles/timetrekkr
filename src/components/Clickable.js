import '../styles/Clickable.css';
import { useState } from 'react';

function Clickable(props) {
    const { imgUrl, desc, learnmore, isOneClicked, setRestriction, xOffset, yOffset } = props;
    const [clicked, setClicked] = useState(false);

    // OpenAI stuff
    const [apiResponse, setApiResponse] = useState("");

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
        window.speechSynthesis.cancel();
    }

    const generateStuff = async (e) => {
        /*let prompt = e.target.innerHTML;
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
        });*/
        
        
    }

    const backToOriginal = () => {
        setApiResponse("");
    }

    // TEXT TO SPEECH STUFF
    const msg = new SpeechSynthesisUtterance();
    

    const speechHandler = (msg) => {
        if (apiResponse !== "") {
            msg.text = apiResponse;
        } else {
            msg.text = desc;
        }
        let voices = window.speechSynthesis.getVoices();
        msg.voice = voices[7]; // 0 (boring guy), 7 (british guy), 10 (lady but with little bit of accent), 11 (old guy), 17 (british lady), 28 (lady), 33 (lady), 37, 49-51 good but cuts off
        msg.pitch = 1.2;
        window.speechSynthesis.speak(msg);
    }


    return(
        <div className="Clickable" style={{position: "absolute", left: `${xOffset}px`, top: `${yOffset}px`}}>
            <img className="clickable-img" src={imgUrl} onClick={displayInfoBox}/>
            {clicked && <div className="info-box">
                {apiResponse !== "" ?  apiResponse : desc}
                <p></p>
                <p></p>
                {learnmore.map((learn) => (
                    <p>Learn more about <span className="emphasis" onClick={generateStuff}>{learn}</span></p>
                ))}
                <div className='buttons'>
                    <button onClick={backToOriginal}>Back to Original Text</button>
                    <button onClick={hideInfoBox}>Exit</button>
                    <button onClick={() => speechHandler(msg)}>Read To Me</button>
                </div>
            </div>}
        </div>
    );
}

export default Clickable;