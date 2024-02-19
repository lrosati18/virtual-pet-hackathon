import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import PetPage from "./pages/PetPage/PetPage";
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/:id" element={<PetPage />} />
        <Route path="/:id/feed" element={<PetPage />} />
        <Route path="/:id/clothes" element={<PetPage />} />
        <Route path="/:id/play" element={<PetPage />} />
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
