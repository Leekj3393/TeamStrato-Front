import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./Pages/Main";
import MyPage from "./Pages/MyPage";
import SubLayout from "./layouts/SubLayout";
import MyToDoList from "./Pages/myPage/MyToDoList";
import Notice from "./Pages/notice/Notice";
import NoticeSubLayout from "./layouts/NoticeSubLayout";
import NoticePart from "./Pages/notice/NoticePart";
import NoticeStatus from "./Pages/notice/NoticeStatus";
import NoticeManage from "./Pages/notice/manage/NoticeManage";
import NoticePartManage from "./Pages/notice/manage/NoticePartManage";
import NoticeStatusManage from "./Pages/notice/manage/NoticeStatusManage";
import Approval from "./Pages/approval/Approval";
import ApprovalSubLayout from "./layouts/ApprovalSubLayout";
import ApprovalRegist from "./Pages/approval/ApprovalRegist";
import ApprovalWait from "./Pages/approval/ApprovalInProgress";
import ApprovalInProgress from "./Pages/approval/ApprovalInProgress";
import ApprovalAccessed from "./Pages/approval/ApprovalAccessed";
import ApprovalReturned from "./Pages/approval/ApprovalReturned";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />

          <Route path="/myPage" element={<SubLayout />}>
            <Route index element={<MyPage />} />
            <Route path="/myPage/myToDoList" element={<MyToDoList />} />
          </Route>


          <Route path="/notice" element={<NoticeSubLayout />}>
            <Route index element={<Notice />} />
            <Route path="/notice/part" element={<NoticePart />} />
            <Route path="/notice/status" element={<NoticeStatus />} />
          </Route>

          <Route path="/notice-manage" element={<NoticeSubLayout />}>
            <Route index element={<NoticeManage />} />
            <Route path="/notice-manage/part" element={<NoticePartManage />} />
            <Route path="/notice-manage/status" element={<NoticeStatusManage />} />
          </Route>

          
          <Route path="/approval" element={<ApprovalSubLayout />}>
            <Route index element={<Approval />} />
            <Route path="/approval/regist" element={<ApprovalRegist />} />
            <Route path="/approval/wait" element={<ApprovalWait />} />
            <Route path="/approval/inProgress" element={<ApprovalInProgress />} />
            <Route path="/approval/accessed" element={<ApprovalAccessed />} />
            <Route path="/approval/returned" element={<ApprovalReturned />} />
          </Route>

          


        </Route>    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
