import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { useEffect, useRef, useState } from 'react';
import runChat from './openai';

function App() {
  const endMsg = useRef(null);

  const [input, setInput] = useState(" ");
  const [messages, setMessages] = useState([
    {
      text: "I am a large language model, trained by Google. ",
      isBot: true,
    }
  ]);

  useEffect(() => {
    endMsg.current.scrollIntoView()
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput(' ');
    setMessages([
      ...messages,
      {
        text, isBot: false,
      }
    ])
    const res = await runChat(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  }

  const handleEnter =async (e) =>{
    if(e.key === 'Enter') await handleSend();
  }

  const handleQuery = async(e)=>{
    const text = e.target.value;
    setMessages([
      ...messages,
      {
        text, isBot: false,
      }
    ])
    const res = await runChat(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  }

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" /><span className="brand">ChatGPT</span></div>
          <button className="midBtn"><img src={addBtn} alt="" className="addBtn" onClick={()=>window.location.reload()}/> New Chat</button>
          <div className="upperSideBottom">
            <button className="query"onClick={handleQuery} value={"What is Programming?"}><img src={msgIcon} alt="Query" />What is Programming?</button>
            <button className="query" onClick={handleQuery} value={"How to use an API?"}><img src={msgIcon} alt="Query" />How to use an API?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="Upgrade" className="listItemsImg" />Upgrade to Pro</div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {messages.map((message, i) =>
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img src={message.isBot ? gptImgLogo : userIcon} alt="" className='chatImg' /><p className="txt">{message.text}</p>
              <div ref={endMsg} />
            </div>
          )}
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e) => (setInput(e.target.value))} /><button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>ChatGPT may produce incorrect result</p>
        </div>
      </div>
    </div>
  );
}

export default App;
