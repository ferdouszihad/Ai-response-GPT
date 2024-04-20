import { useState } from "react";

import "./App.css";
import UserQuestion from "./components/UserQuestion";

function App() {
  const [messages, setMessages] = useState([]);
  console.log(messages);
  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = e.target.prompt.value;
    fetch("http://localhost:5000/generate-text", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newMsg = {
          question: prompt,
          answer: data?.response,
        };
        setMessages([...messages, newMsg]);
      });
  };

  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className="min-h-[calc(100vh-120px)]">
          <h1 className="text-4xl font-bold text-center py-10 border-b-2">
            My-GPT
          </h1>
          <div>
            {messages.map((message) => (
              <UserQuestion key={prompt} message={message}></UserQuestion>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <p>Ask me Anything</p>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea name="prompt" className="border-2 flex-1 p-5"></textarea>
            <button className="btn-primary btn"> send</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
