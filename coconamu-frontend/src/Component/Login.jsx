import { useNavigate } from "react-router";
import LoginCSS from "../CSS/Login.module.css";
function Login() {
    const navigate = useNavigate();
    return (
        <div className={`${LoginCSS.LoginBody} ${LoginCSS.wrapper}`}>
            <p>로그인 화면입니다.</p>
            <div>
                <div className={LoginCSS.LoginSize}>
                    <input type="text" className={LoginCSS.LoginInput} name = "id" placeholder="아이디" />
                </div>
                <div className={LoginCSS.LoginSize}>
                    <input type="text" className={LoginCSS.LoginInput} name = "pw" placeholder="비밀번호" />
                </div>
                <div className={LoginCSS.LoginSize}>
                    <button type="button" className={LoginCSS.LoginButton} >로그인</button>
                </div>
            </div>
            <div>
                <p>Hoxy..? 아이디가 없으신가요?<span onClick={() => { navigate("/join"); }}>( 지금 바로 생성 )</span></p> 
            </div>
        </div>
    );
}

export default Login;