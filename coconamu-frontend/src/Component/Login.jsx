import { useNavigate } from "react-router";

function Login() {
    const navigate = useNavigate();
    return (
        <div>
            <p>로그인 화면입니다.</p>
            <div>
                <input type="text" placeholder="아이디" />
                <input type="text" placeholder="비밀번호" />
                
                <button type="button">로그인</button>
            </div>
            <div>
                <p>Hoxy..? 아이디가 없으신가요?<span onClick={() => { navigate("/join"); }}>(즉시생성)</span></p> 
            </div>
        </div>
    );
}

export default Login;