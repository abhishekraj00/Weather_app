import "./App.css";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
  return (
    <>
      <Home data-test={"my-component"} />
    </>
  );
};

export default App;
