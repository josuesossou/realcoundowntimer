import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import { Main, SidePanel, TimeEditor } from './components/components'

const AppStyles = styled.div.attrs({
  className: "w-screen h-screen bg-red-500 p-2"
})``;

function App() {
  return (
    <div className="grid grid-col-5 grid-row-4 h-screen w-screen">
      <div className="col-span-1 row-span-4">
        <SidePanel />
      </div>
      <div className="col-start-2 col-span-4 row-span-3">
        <Main days={1} hours={0} minutes={1} seconds={10}/>
      </div>
      <div className="col-start-2 col-span-4 row-start-4">
        <TimeEditor />
      </div>
    </div>
  );
}

export default App;
