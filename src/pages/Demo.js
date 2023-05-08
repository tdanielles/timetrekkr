import '../styles/Demo.css';
import Clickable from '../components/Clickable';
import { useState, useRef } from 'react';
import Music from "../music.mp3";
import { useEffect } from 'react';

function Demo () {
  const [isOneClicked, setOneClicked] = useState(false);
  const [funFactClicked, setFunFactClicked] = useState(false);
  const [helpBtnClicked, setHelpBtnClicked] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const [isMusicPlaying, setMusicState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => {
            setLoading(false)
      }, 5000);
  }, []);

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

  const showMusicBox = (e) => {
      setHelpBtnClicked(true);
      setApiResponse("How to navigate this storybook. Click on images with a yellow outlien to learn more about them! If you want to learn more about a topic, just click an underlined word, and it'll go more in depth on that particular topic! If you don't feel like reading, you can click on the 'Read To Me' button to have the computer read it out to you! There are also sounds and fun fact buttons on the upper right corner for you to play with!");
  }

  const hideMusicBox = (e) => {
      setHelpBtnClicked(false);
  }

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
    // AUDIO STUFF
    const audioRef = useRef(new Audio(Music));
    const play = (e) => {
        e.target.innerHTML = "Stop Music";
        setMusicState(true);
        audioRef.current.volume = 0.3;
        audioRef.current.play();
    };
    const pause = (e) => {
        e.target.innerHTML = "Play Music";
        setMusicState(false);
        audioRef.current.pause();
    }

  return (
      <>
           { loading ? (<div className='loading-bg'><img src="images/loading.gif"/></div>): (<div className="App">
      <div className='mini-navbar'>
            <h1>Welcome to Egypt!</h1>
            <div className='right-side'>
                  <div className='fun-fact-container'>
                  <button className='fun-fact' onClick={generateFunFact}>Want to know a fun fact about Egypt?</button>
                        {funFactClicked && <div className='fun-fact-box'>
                        <p><b>Fun Fact!</b></p>
                        <p>{apiResponse}</p>
                        <div className='buttons'> 
                              <button onClick={hideFunFact}>Back</button>
                              <button onClick={() => speechHandler(msg)}>Read To Me</button>
                        </div>

                        
                        </div>}
                  </div>
                  <button className='music' onClick={isMusicPlaying ? pause : play}>
                        <img src="images/audio.png"/>
                  </button>
                  <button className='music' onClick={showMusicBox}>
                        <img src="images/question.png"/>
                        
                  </button>
                  {helpBtnClicked && <div className='fun-fact-box'>
                        <p><b>How to navigate this storybook</b></p>
                        <div className='page-section'>
                              <img className="outline" src="images/chest.PNG"/>
                              <p>Click on images with a yellow outline to learn more about them!</p>
                        </div>
                        <div className='page-section'>
                              <img src="images/underline.png"/>
                              <p>If you want to learn more about a topic, just click an underlined word, and it'll go more in depth on that particular topic!</p>
                        </div>
                        <div className='page-section'>
                              <img src="images/readtome.png"/>
                              <p>If you don't feel like reading, you can click on the "Read To Me" button to have the computer read it out to you!</p>
                        </div>
                        <div className='page-section'>
                              <img src="images/navbar.png"/>
                              <p>There are also sounds and fun fact buttons on the upper right corner for you to play with!</p>
                        </div>
                        <div className='buttons'> 
                              <button onClick={hideMusicBox}>Back</button>
                              <button onClick={() => speechHandler(msg)}>Read To Me</button>
                        </div></div>}
            </div>
            
            
      </div>
      <div>
            <Clickable imgUrl="images/human.PNG" desc="A long time ago, around 12,000 years ago, the Nile River Valley in Egypt was a wild and untamed land. People lived in small groups near the river. They hunted animals like antelope and fished in the river for food. They also started to farm and raise animals like goats and sheep. Life was tough, but the people were clever and found ways to make things easier. 
And so, the story of ancient Egypt began, with people living by the Nile River creating one of the most interesting and important civilizations ever." learnmore={["Nile River Valley", "Nile River"]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="230" yOffset="390"/>
      <Clickable imgUrl="images/chest.PNG" desc="The pyramids were also filled with treasure and precious items. People believed that these items would help the kings and queens in the afterlife. The Old Kingdom was a time of great wealth and power for Egypt, and the pyramids were a symbol of their strength and unity.
" learnmore={["Old Kingdom"]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="900" yOffset="1565"/>
      <Clickable imgUrl="images/pyramid.PNG" desc="As more people moved to the Nile River Valley, they started to build big buildings like temples and pyramids. These pyramids were built for Ancient Egyptians to honour their kings and queens. Workers used special ramps to haul giant blocks of stone from quarries to the pyramid sites. They were built to be so big and strong that they would last forever. It was hard work, but the people were determined to honor their rulers in a big way. 
" learnmore={[]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="995" yOffset="1225"/>
      <Clickable imgUrl="images/sphinx.PNG" desc="The Great Sphinx is a giant statue in Egypt that was built around 4,500 years ago. It has the head of a person and the body of a lion, and it was meant to symbolize the pharaoh's power and strength. The Sphinx was also believed to be a protector of the pyramids and the people of Egypt. Workers had to carve the giant block of limestone into the shape of the Sphinx using special tools. Even though the Sphinx is very old, it still stands tall today and is a wonder of the ancient world.
" learnmore={[]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="820" yOffset="1690"/>
      <Clickable imgUrl="images/pharaoh.PNG" desc="Pharaohs were powerful rulers who had soldiers and priests to help them lead Egypt. They built grand temples and tombs, and the pharaohs would often be depicted in art as seated on thrones with their soldiers and priests surrounding them. These were important symbols of their power and leadership.
" learnmore={[]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="800" yOffset="2280"/>
      <Clickable imgUrl="images/battle.PNG" desc="During the New Kingdom in ancient Egypt, there were many battles fought between different kingdoms. One famous battle was the Battle of Megiddo, which happened around 3,500 years ago. The pharaohs led their armies into battle riding in chariots pulled by powerful horses. The soldiers fought with spears, shields, and bows and arrows. It was a fierce fight, but the Egyptian army emerged victorious. The pharaohs and their soldiers were celebrated as heroes and they continued to defend Egypt from its enemies for many years to come.
" learnmore={["New Kingdom", "Battle of Megiddo"]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="165" yOffset="2710"/>
      <Clickable imgUrl="images/scholars.PNG" desc="During the Greek and Roman Period in Egypt, the city of Alexandria became a center of learning and culture. Scholars from all over the world came to study at the famous Library of Alexandria, which was one of the largest libraries in the ancient world. The library had many books and scrolls, which were carefully copied by scribes. 
" learnmore={["Alexandria"]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="140" yOffset="3580"/>
      <Clickable imgUrl="images/ship.PNG" desc="Ships from different countries would dock at Alexandria's busy harbor, bringing new ideas and goods from faraway lands. Alexandria was a bustling city with people from different cultures living and working together. It was a place of great discovery and innovation, and it still inspires us today.
" learnmore={[]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="1120" yOffset="3460"/>
      <Clickable imgUrl="images/market.PNG" desc="During the Islamic Period in Egypt, the markets or bazaars were an essential part of everyday life. These were vibrant and colorful places, where people came to buy and sell goods from all over the world. The marketplaces were usually located in the heart of the city, and they were noisy and bustling, with vendors calling out to shoppers to come and take a look at their wares.
" learnmore={["Islamic Period in Egypt"]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="0" yOffset="4210"/>
      <Clickable imgUrl="images/jewel.PNG" desc="In the markets, people could find almost anything they needed or wanted, from exotic spices to fine silks and precious jewels. The goods were brought to Egypt by traders from all over the world, who sailed along the Red Sea and the Mediterranean Sea. Traders would travel from as far away as China, India, and Europe to buy and sell goods in the Egyptian markets.
" learnmore={["Red Sea", "Mediterranean Sea"]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="600" yOffset="4410"/>
      <Clickable imgUrl="images/steamship.PNG" desc="Look! A steamship is sailing down the Nile, and it's pulling a giant barge full of goods. See those tall factory buildings? They're making things like textiles, soap, and sugar. And over there are trains chugging along, carrying people and products all around Egypt. This is the time when Egypt started to become more modern, with new inventions and ways of doing things. Can you spot the steamship and the trains on this page?
" learnmore={[]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="980" yOffset="4580"/>
      <Clickable imgUrl="images/crowd.PNG" desc="In 1922, the people of Egypt wanted to be independent from the British, who had been in charge for many years. They didn't want to be ruled by someone else anymore. Many people gathered together to protest and ask for their freedom. They marched in the streets and chanted for their rights. 
" learnmore={[]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="0" yOffset="5230"/>
      <Clickable imgUrl="images/flag.PNG" desc="Finally, after a long time, they were successful and Egypt became its own country once again. The British flag was taken down and the Egyptian flag was raised up high, showing that Egypt was now free.  
" learnmore={[]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="865" yOffset="5230"/>
      <Clickable imgUrl="images/skyscraper.PNG" desc="Finally, after a long time, they were successful and Egypt became its own country once again. The British flag was taken down and the Egyptian flag was raised up high, showing that Egypt was now free.  
" learnmore={[]} isOneClicked={isOneClicked} setRestriction={setRestriction} xOffset="40" yOffset="6062"/>

      </div>
              
      </div>)}
      </>
    )
}

export default Demo;