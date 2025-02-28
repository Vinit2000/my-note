import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Notes from './components/Notes';


function App() {
  const [dark, setDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  // dark mode function
  const toggleDarkMode = () => {
    setDark(prevDark => !prevDark);
    document.body.style.backgroundColor = dark ? "white" : "black";
    document.body.style.color = dark ? "black" : "green";
  };

  return (
    <div className={dark ? "dark-mode" : "light-mode"}>
      <Navbar dark={dark} toggleDarkMode={toggleDarkMode} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      
      <Notes searchTerm={searchTerm}/>
    </div>
  );
}

export default App;