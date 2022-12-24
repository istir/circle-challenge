import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

type Circle = {
  x: number;
  y: number;
};

function App() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [poppedCircles, setPoppedCircles] = useState<Circle[]>([]);

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const calculatePercentages = (circle: Circle) => { 
      const percentageX = circle.x*100 / window.innerWidth
      const percentageY = circle.y*100 / window.innerHeight
      return {x:Math.round(percentageX),y:Math.round(percentageY)}
    }
    pushCircle(calculatePercentages({ x: e.clientX, y: e.clientY }));
  };

  const pushCircle = (circle: Circle) => {
    setCircles((prevCircles) => [...prevCircles, circle]);
    setPoppedCircles([])
  };

  const popCircle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    if(!circles.length) return
    setPoppedCircles(prevPoppedCircles => [...prevPoppedCircles, circles[circles.length - 1]])
    setCircles(prevCircles=>prevCircles.slice(0,-1))
  };

  const redoCircle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!poppedCircles.length) return
    setCircles(prevCircles => [...prevCircles, poppedCircles[poppedCircles.length - 1]])
    setPoppedCircles(prevPoppedCircles=>prevPoppedCircles.slice(0,-1))
  };

  const renderCircle = (circle:Circle,index:number) => {
    const style = { '--circleX': `${circle.x}%`, '--circleY': `${circle.y}%` } as React.CSSProperties
    return <span className="circle" key={index} style={style}></span>

  } 

  return (
    <div className="App" onClick={onClickHandler}>
      <button disabled={!circles.length} onClick={popCircle}>undo</button>
      <button  disabled={!poppedCircles.length} onClick={redoCircle}>redo</button>

      {circles.map((circle, index) => renderCircle(circle,index))}

      <table>
        <tbody>
          <tr>
            <th>X</th>
            <th>Y</th>
          </tr>
          {circles.map((circle, index) => (
            <tr key={index}>
              <td>{circle.x}%</td>
              <td>{circle.y}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <th>X</th>
            <th>Y</th>
          </tr>
          {poppedCircles.map((circle, index) => (
            <tr key={index}>
              <td>{circle.x}%</td>
              <td>{circle.y}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
