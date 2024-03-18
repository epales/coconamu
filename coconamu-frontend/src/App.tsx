import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
function App() {
    const [message, setMessage] = useState("");

  useEffect(() => {
  // 우리가 만든 서버로 보내는 GET 요청
    axios.get("/api/hello")
        .then((response) => {
          setMessage(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          A message from Spring Boot : <code>{message}</code>
        </p>
      </header>
    </div>
  );
}

export default App;
