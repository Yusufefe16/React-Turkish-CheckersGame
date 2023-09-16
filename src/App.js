import "./App.css";
import ChessBoard from "./components/ChessBoard";
import WhiteResult from "./components/WhiteResult";
import BlackResult from "./components/BlackResult";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <WhiteResult/>
      <ChessBoard/>
      <BlackResult/>
      <Footer/>

    </div>
  );
}

export default App;
