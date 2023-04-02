import logo from './logo.svg';
import './App.css';
import Clickable from './components/Clickable';
import { useState } from 'react';

function App() {
  const [isOneClicked, setOneClicked] = useState(false);

  const setRestriction = (state) => {
    setOneClicked(state);
  }

  return (
    <div className="App">
      <div>
      <Clickable imgUrl="/images/star-test.png" desc="A long time ago, around 12,000 years ago, the Nile River Valley in Egypt was a wild and untamed land. People lived in small groups near the river. They hunted animals like antelope and fished in the river for food. They also started to farm and raise animals like goats and sheep. Life was tough, but the people were clever and found ways to make things easier. 
And so, the story of ancient Egypt began, with people living by the Nile River creating one of the most interesting and important civilizations ever." learnmore={["Nile River Valley", "Nile River"]} isOneClicked={isOneClicked} setRestriction={setRestriction}/>
      </div>
      <div>
      <Clickable imgUrl="/images/hexagon-test.png" desc="A hexagon is a polygon with six sides and six angles. It is one of the most common shapes in nature, appearing in honeycombs, snowflakes, flowers and many other places. Hexagons are also used extensively in architecture for decorative purposes as well as to create strong structures such as bridges and buildings." learnmore={["Nile River Valley", "Nile River"]} isOneClicked={isOneClicked} setRestriction={setRestriction}/>
      </div>
      <Clickable imgUrl="/images/star-test.png" desc="A star is a luminous sphere of plasma held together by its own gravity. The nearest star to Earth is the Sun, which is the source of most of the energy on Earth. Other stars are visible in the night sky from Earth due to their immense distance from us. Stars come in many sizes and colors, ranging from blue-white giants to faint red dwarfs. They also vary greatly in age and composition." learnmore={["Nile River Valley", "Nile River"]} isOneClicked={isOneClicked} setRestriction={setRestriction}/>
    </div>
  );
}

export default App;
