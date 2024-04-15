import React, {useState, useEffect} from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(" ");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((previousMessages) => [...previousMessages, message]);
    });
  }, []);

  const handleMessageSend = () => {
    if(input.trim() !==" ") {
      socket.emit("message", input);
      setInput(" ");
    }
  };
  
  return (
    <div>
      <h1>Hangout</h1>
      <div>
        {messages.map((message,index) => {
          <div key = {index}> {message}</div>
        })}
      </div>
      <input type = "text" value = {input} onChange ={(e) => setInput(e.target.value)} />
      <button onClick = {handleMessageSend}>Send</button>
    </div>
  );
}
export default App;