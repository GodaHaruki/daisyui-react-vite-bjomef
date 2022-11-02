import { useState, useRef, useEffect } from "react";

function App() {
  const [num, setNum] = useState(100);
  const digit = useRef(1);
  const interval = useRef(10000);
  const isStart = useRef(false);
  const times = useRef(0);
  const currentTimes = useRef(0);
  const nums = useRef([]);

  let change = setInterval(() => {}, 1000);
  useEffect(() => {
    change = setInterval(() => {
      // console.log("interval!");
      if (isStart.current) {
        currentTimes.current += 1;
        if (times.current.value >= currentTimes.current) {
          const tempNum = random(digit.current.value);
          setNum(tempNum);
          nums.current.push(tempNum);
          console.log(tempNum);
          // setTimeout(() => setNum(" "), times.current /2);
          const t = performance.now();
          // setTimeout(() => setNum(" "), interval.current.value - 10);

          setTimeout(() => {
            setNum(" ");
            console.log(performance.now() - t);
          }, interval.current.value - 10);
          const t1 = performance.now();
          console.log(t1 - t);
        } else {
          const tempInputAns = prompt("Answer:");
          const inputAns = tempInputAns ? tempInputAns : "";
          if (inputAns == nums.current.reduce((a, b) => a + b)) {
            alert("正解です");
          } else {
            alert(
              `違います\nあなたが入力した答え: ${inputAns}\n正解: ${nums.current.reduce(
                (a, b) => a + b
              )}`
            );
          }
          setNum("- - -");
          nums.current = [];
          isStart.current = false;
        }
      } else {
        setNum("- - -");
        currentTimes.current = 0;
      }
    }, interval.current.value);
    return () => clearInterval(change);
  });

  // useEffect(() => setNum(null), [num]);

  return (
    <div className="App">
      <div className="flex justify-center px-2 py-2 text-9xl">{num}</div>
      <div className="py-4 px-4">
        <Config
          setNum={setNum}
          digit={digit}
          interval={interval}
          isStart={isStart}
          times={times}
          currentTimes={currentTimes}
        />
      </div>

      {/* <div className="set">
        桁数
        <input
          ref={digit}
          type="range"
          t
          min="1"
          max="5"
          step="1"
          className="range"
          onChange={() => {}}
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        秒数(ms)
        <input
          ref={interval}
          type="range"
          min="100"
          max="1000"
          value="500"
          step="100"
          className="range"
          onChange={() => {
            console.log(interval.current.value);
            clearInterval(change);
          }}
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>100</span>
          <span>200</span>
          <span>300</span>
          <span>400</span>
          <span>500</span>
        </div> */}
    </div>
  );
}

const random = (digit) => {
  const t_random = () => Math.floor(Math.random() * 10 ** digit);
  const min = 10 ** (digit - 1);

  while (true) {
    const num = t_random();
    if (num >= min) {
      return num;
    }
  }
};

const Config = (props) => {
  return (
    <>
      桁数
      <input
        ref={props.digit}
        type="range"
        min="1"
        max="5"
        step="1"
        className="range"
        onChange={() => {}}
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
      秒数(ms)
      <input
        ref={props.interval}
        type="range"
        min="100"
        max="500"
        step="50"
        className="range"
        onChange={() => {
          console.log(props.interval.current.value);
          // clearInterval(change);
        }}
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>100</span>
        <span>200</span>
        <span>300</span>
        <span>400</span>
        <span>500</span>
      </div>
      回数
      <input
        ref={props.times}
        type="range"
        min="0"
        max="20"
        step="1"
        className="range"
        onChange={() => {
          console.log(props.times.current.value);
          console.log(
            `props.times.current.value >= currentTimes.current : ${
              props.times.current.value == props.currentTimes.current
            }`
          );
          console.log(props.times.current.value);
          console.log(props.currentTimes.current);
        }}
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>0</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>20</span>
      </div>
      <div className="px-2 py-2">
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            props.isStart.current = true;
            console.log(props.isStart.current);
          }}
        >
          Start
        </button>
      </div>
    </>
  );
};
export default App;
