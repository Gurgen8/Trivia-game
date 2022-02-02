import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import data from "./questensions/Data"
import Modal from 'react-modal';

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");
  const [piramid, setPiramid] = useState(true)

  console.log(earned)

  const openPiramid = () => {
    setPiramid(!piramid)
  }
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  const customStylesImg = {
    content: {
      overflowY: "scroll",
      top: '50%',
      left: '50%',
      right: '10%',
      bottom: '0%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "white",
      zIndex:999

    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.91)',


    }
  };
  return (
    <div className="app">
      {earned === "$ 100" ?
        <Modal
          isOpen={earned === "$ 100"}
          onRequestClose={earned === "$ 100" ? false : null}

          style={customStylesImg} >
          <div className="modal_div">
            <h1>JackPot!!!</h1>
            <p>congratulations you slid <mark> 1000000 $ </mark>
              Journal your personal information to get the money</p>
              <form>
                <input className="email" placeholder="email" type="email"  /> <br />
                <input className="phone" placeholder="phone number"  type="number" /> <br />
                <button className="confirm" onSubmit={()=>window.location.reload()}>Confirm</button>
              </form>
          </div>

        </Modal>
        : null}
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <button id="btn" onClick={openPiramid} className='statics'>{piramid ? "GO GAME" : "SHOW STATICS"}</button ><buton onClick={() => {
            window.location.replace('/')
          }} className='back'>&#8592;</buton>

          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          {piramid ? <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div> : null}
        </>
      )}
    </div>
  );
}

export default App;
