import logo from './logo.svg';
import './App.css';
import styled from "styled-components";

const AppStyles = styled.div.attrs({
  className: "w-screen h-screen bg-red-500 p-2"
})``;

function App() {
  return (
    <AppStyles>
      <p>hello world</p>
      </AppStyles>
  );
}

export default App;
