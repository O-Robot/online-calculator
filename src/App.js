import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import "./App.css";

function App() {
  const [previousState, setPreviousState] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const number = (e) => {
    if (currentState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreviousState("");
    }

    currentState
      ? setCurrentState((pre) => pre + e.target.innerText)
      : setCurrentState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(currentState);
  }, [currentState]);

  useEffect(() => {
    setInput("0");
  }, []);

  const del = () => {
    const newState = currentState.slice(0, -1); 
    setCurrentState(newState)
  };

  const operatorBtn = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (currentState === "") return;
    if (previousState !== "") {
      equals();
    } else {
      setPreviousState(currentState);
      setCurrentState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }

    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(previousState) / parseFloat(currentState));
        break;

      case "+":
        cal = String(parseFloat(previousState) + parseFloat(currentState));
        break;

      case "-":
        cal = String(parseFloat(previousState) - parseFloat(currentState));
        break;

      case "x":
        cal = String(parseFloat(previousState) * parseFloat(currentState));
        break;

      default:
        break;
    }
    setInput("");
    setPreviousState(cal);
    setCurrentState("");
  };

  const plusMinus = () => {
    if (currentState.charAt(0) === "-") {
      setCurrentState(currentState.substring(1));
    } else {
      setCurrentState("-" + currentState);
    }
  };

  const prercentage = () => {
    previousState
      ? setCurrentState(
          String((parseFloat(currentState) / 100) * previousState)
        )
      : setCurrentState(String(parseFloat(currentState) / 100));
  };

  const reset = () => {
    setPreviousState("");
    setCurrentState("");
    setInput("0");
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {input !== "" || input === "0" ? (
            <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormat
              value={previousState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
          <div></div>
        </div>
        <div className="btn light-gray" onClick={reset}>
          AC
        </div>
        <div className="btn light-gray" onClick={prercentage}>
          %
        </div>
        <div className="btn light-gray" onClick={del}>
          ←
        </div>
        <div className="btn orange" onClick={operatorBtn}>
          /
        </div>
        <div className="btn" onClick={number}>
          7
        </div>
        <div className="btn" onClick={number}>
          8
        </div>
        <div className="btn" onClick={number}>
          9
        </div>
        <div
          className="btn orange"
          onClick={operatorBtn}
          // onClick={() => {
          //   number();
          //   operatorBtn();
          // }}
        >
          x
        </div>
        <div className="btn" onClick={number}>
          4
        </div>
        <div className="btn" onClick={number}>
          5
        </div>
        <div className="btn" onClick={number}>
          6
        </div>
        <div className="btn orange" onClick={operatorBtn}>
          +
        </div>
        <div className="btn" onClick={number}>
          1
        </div>
        <div className="btn" onClick={number}>
          2
        </div>
        <div className="btn" onClick={number}>
          3
        </div>
        <div className="btn orange" onClick={operatorBtn}>
          -
        </div>
        <div className="btn" onClick={plusMinus}>
          +/-
        </div>
        <div className="btn" onClick={number}>
          0
        </div>
        <div className="btn" onClick={number}>
          .
        </div>
        <div className="btn orange" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
