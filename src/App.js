import './App.css';
import Clickable from './components/Clickable';
import { useState } from 'react';

function App() {
  const [isOneClicked, setOneClicked] = useState(false);
  const [funFactClicked, setFunFactClicked] = useState(false);
  const [apiResponse, setApiResponse] = useState("");

  const setRestriction = (state) => {
    setOneClicked(state);
  }

  const hideFunFact = (e) => {
    setFunFactClicked(false);
    setOneClicked(false);
    setApiResponse("");
    window.speechSynthesis.cancel();
  }

  // OpenAI stuff
  
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const generateFunFact = async (e) => {
    setFunFactClicked(true);
    setOneClicked(true);

    const today = new Date();
    const prompt = `${months[today.getMonth()]}` + " " + `${today.getDate()}`;
    console.log(prompt);
    const APIBody = {
        "model": "text-davinci-003",
        "prompt": "Tell me about a fun fact that happened in Egypt on " + prompt + " like I'm five.",
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

// TEXT TO SPEECH STUFF
const msg = new SpeechSynthesisUtterance();
    

const speechHandler = (msg) => {
    msg.text = apiResponse;
    let voices = window.speechSynthesis.getVoices();
    msg.voice = voices[7]; // 0 (boring guy), 7 (british guy), 10 (lady but with little bit of accent), 11 (old guy), 17 (british lady), 28 (lady), 33 (lady), 37, 49-51 good but cuts off
    msg.pitch = 1.2;
    msg.rate = 1.1;
    window.speechSynthesis.speak(msg);
}

  return (
    <div className="App">
      <div className='fun-fact-container'>
        <button className='fun-fact' onClick={generateFunFact}>Fun Facts</button>
        {funFactClicked && <div className='fun-fact-box'>
          <p><b>Fun Fact!</b></p>
          <p>{apiResponse}</p>
          <div className='buttons'> 
            <button onClick={hideFunFact}>Back</button>
            <button onClick={() => speechHandler(msg)}>Read To Me</button>
          </div>

          
        </div>}
      </div>
      
      <Clickable imgUrl="/images/star-test.png" desc="A long time ago, around 12,000 years ago, the Nile River Valley in Egypt was a wild and untamed land. People lived in small groups near the river. They hunted animals like antelope and fished in the river for food. They also started to farm and raise animals like goats and sheep. Life was tough, but the people were clever and found ways to make things easier. 
And so, the story of ancient Egypt began, with people living by the Nile River creating one of the most interesting and important civilizations ever." learnmore={["Nile River Valley", "Nile River"]} isOneClicked={isOneClicked} setRestriction={setRestriction}/>
      <Clickable imgUrl="/images/hexagon-test.png" desc="A hexagon is a polygon with six sides and six angles. It is one of the most common shapes in nature, appearing in honeycombs, snowflakes, flowers and many other places. Hexagons are also used extensively in architecture for decorative purposes as well as to create strong structures such as bridges and buildings." learnmore={["Nile River Valley", "Nile River"]} isOneClicked={isOneClicked} setRestriction={setRestriction}/>
      <Clickable imgUrl="/images/star-test.png" desc="A star is a luminous sphere of plasma held together by its own gravity. The nearest star to Earth is the Sun, which is the source of most of the energy on Earth. Other stars are visible in the night sky from Earth due to their immense distance from us. Stars come in many sizes and colors, ranging from blue-white giants to faint red dwarfs. They also vary greatly in age and composition." learnmore={["Nile River Valley", "Nile River"]} isOneClicked={isOneClicked} setRestriction={setRestriction}/>
    </div>
  );
}

export default App;
