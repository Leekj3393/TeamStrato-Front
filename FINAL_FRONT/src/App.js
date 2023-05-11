import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./Pages/Main";
import MyPage from "./Pages/MyPage";
import SubLayout from "./layouts/SubLayout";
import Document from "./Pages/Document";
import Calendar from "./Pages/calendar/Calendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />

          <Route path="/myPage" element={<SubLayout />}>
            <Route index element={<MyPage />} />
            <Route path="/myPage/Document" element={<Document />} />
          
          </Route>

          <Route path="/calendar" element={ <Calendar/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
