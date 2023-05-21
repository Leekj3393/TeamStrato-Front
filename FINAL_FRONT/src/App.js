import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import MyPage from "./pages/myPage/MyPage";
import SubLayout from "./layouts/SubLayout";
import Document from "./pages/myPage/Document";
import PartNotice from "./pages/myPage/PartNotice";
import NoticeSubLayout from "./layouts/NoticeSubLayout";
import Notice from "./pages/notice/Notice";
import NoticeManage from "./pages/notice/manage/NoticeManage";
import ApprovalSubLayout from "./layouts/ApprovalSubLayout";
import Approval from "./pages/approval/Approval";
import ApprovalRegist from "./pages/approval/ApprovalRegist";
import ApprovalWait from "./pages/approval/ApprovalWait";
import ApprovalInProgress from "./pages/approval/ApprovalInProgress";
import ApprovalAccessed from "./pages/approval/ApprovalAccessed";
import ApprovalReturned from "./pages/approval/ApprovalReturned";
import Calendar from "./pages/calendar/Calendar";
import AllSch from "./pages/calendar/AllSch";
import SchSubLayout from "./layouts/SchSubLayout";
import WorkCheck from "./pages/calendar/WorkCheck";
import HolidayCheck from "./pages/calendar/HolidayCheck";
import Login from "./pages/login/Login";
import LoginLayout from "./layouts/LoginLayout";
import LoginBackground from "./components/login/LoginBackground";
import MemberSubLayout from "./layouts/MemberSubLayout";
import Member from "./pages/member/Member";
import EquipmentSubLayout from "./layouts/EquipmentSubLayout";
import Equipment from "./pages/equipment/Equipment";
import ApprovalLineRegist from "./pages/approval/ApprovalLineRegist";
import MemberDetail from "./pages/member/MemberDetail";
import MemberReigst from "./pages/member/MemberRegist";
import FindId from "./pages/login/FindId";
import EquipmentDetail from "./pages/equipment/EquipmentDetail";
import FindPwd from "./pages/login/FindPwd";
import MemberModify from "./pages/member/MemberModify";
import EquipmentRegist from "./pages/equipment/EquipmentRegist";
import UpdatePwd from "./pages/login/UpdatePwd";
import ApprovalDetail from "./pages/approval/ApprovalDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginLayout/>}>
          <Route index element={<Login/>}/>
          <Route path="/login/findid" element={<FindId/>}/>
          <Route path="/login/findPwd" element={<FindPwd/>}/>
          <Route path="/login/updatePwd" element={<UpdatePwd/>}/>
          
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/myPage" element={<SubLayout />}>
            <Route index element={<MyPage />} />
            <Route path="/myPage/Document" element={<Document />} />
            <Route path="/myPage/PartNotice" element={<PartNotice />} />
          </Route>
          <Route path="/notice" element={<NoticeSubLayout />}>
            <Route index element={<Notice />} />
          </Route>
          <Route path="/notice-manage" element={<NoticeSubLayout />}>
            <Route index element={<NoticeManage />} />
          </Route>
          <Route path="/approval" element={<ApprovalSubLayout />}>
            <Route index element={<Approval />} />
            <Route path="/approval/regist" element={<ApprovalRegist />} />
            <Route path="/approval/appline" element={<ApprovalLineRegist />} />
            <Route path="/approval/wait" element={<ApprovalWait />} />
            <Route path="/approval/inProgress" element={<ApprovalInProgress />} />            
            <Route path="/approval/accessed" element={<ApprovalAccessed />} />
            <Route path="/approval/returned" element={<ApprovalReturned />} />
            <Route path="/approval/:appCode" element={<ApprovalDetail />} />
          </Route>
          <Route path="/calendar" element={<SchSubLayout/>}>
            <Route index element={<Calendar/>}/>
            <Route path="/calendar/allSch" element={<AllSch/>}/>
            <Route path="/calendar/workCheck" element={<WorkCheck/>}/>
            <Route path="/calendar/holidayCheck" element={<HolidayCheck/>}/>
          </Route>
          <Route path="/equipment" element={<EquipmentSubLayout/>}>
            <Route index element={<Equipment/>} />
            <Route path="detail/:categoryCode" element={<EquipmentDetail/>} />
            <Route path="regist" element={<EquipmentRegist/>} />
          </Route>
          <Route path="/member" element={<MemberSubLayout/>}>
            <Route index element={<Member/>}/>
            <Route path="/member/names/:memberName" element={<Member/>}/>
            <Route path="/member/codes/:memberCode" element={<Member/>}/>
            <Route path="/member/department/:deptName" element={<Member/>}/>
            <Route path="/member/job/:jobName" element={<Member/>}/> 
            <Route path="/member/:memberCode" element={<MemberDetail/>}/>
            <Route path="/member/regist" element={<MemberReigst/>}/>
            <Route path="/member/modify/:memberCode" element={<MemberModify/>}/>
          </Route>
          <Route path="/calendar" element={<Calendar/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;