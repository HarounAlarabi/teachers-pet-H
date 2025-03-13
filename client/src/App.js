import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="header--title">
            <span className="title-gradient">Teacher's P.E.T.</span>
            <div className="title-underline"></div>
          </h1>
          <p className="header--text">
            <span className="text-decor">Pupil Evaluation Tool</span>
          </p>
        </div>
      </header>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
