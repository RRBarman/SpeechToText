import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/Header.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div id="main">
        <div>
          <Header />
          <Content />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
