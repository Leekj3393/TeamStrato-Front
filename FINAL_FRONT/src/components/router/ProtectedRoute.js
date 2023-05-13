import { Navigate } from "react-router-dom";
import { isAdmin, isLogin } from "../../utils/TokenUtils";

function ProtectedRoute({ loginCheck, authCheck, children }) {

    if(authCheck) {
        // 권한 없이 접근 불가 기능 -> props로 authCheck 값을 true로 전달
        return isAdmin() ? children : <Navigate to="/"/>
    }

    if(loginCheck) {
        // 로그인 해야만 볼 수 있는 기능 -> props로 loginCheck값을 true로 전달
        return isLogin() ? children : <Navigate to="/login"/>
    } else {
        // 로그인 시 접근 불가 기능 (ex. 로그인, 회원가입) -> props로 loginCheck값을 false로 전달
        return !isLogin() ? children : <Navigate to="/"/>
    }

}

export default ProtectedRoute;