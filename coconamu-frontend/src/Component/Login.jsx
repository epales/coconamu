import { useNavigate } from "react-router";
import { useState } from "react";
import LoginCSS from "../CSS/Login.module.css";
import delImg from "../Img/icons8-cancel-48.png"
import IdImg from "../Img/icons8-우편-48.png" 
import PwImg from "../Img/icons8-자물쇠-48.png"
import coconamulogo from "../Img/icons8-coconamu.png";

function Login() {
    const navigate = useNavigate();

    const [isId, setId] = useState("");
    const [isPw, setPw] = useState("");

    function login() {
        navigate("/");
    }
    const idChangeHandler = (e) => {
        setId(e.target.value)
    }
    const pwChangeHandler = (e) => {
        setPw(e.target.value)
    }
    return (
        <div className={`${LoginCSS.LoginBody} ${LoginCSS.wrapper}`}>
            <div>
                    <img src={coconamulogo} alt="logo" className={LoginCSS.logo} onClick={()=> {navigate("/")}}/>
            </div>
            <div className={LoginCSS.LoginBodyMain}>
                <div className={`${LoginCSS.LoginSize} ${LoginCSS.LoginSizeSpace}`}>
                    <div className={LoginCSS.LoginImgDiv}>
                        <img src={IdImg} alt="id" className={LoginCSS.LoginImg}/>
                    </div>
                    <div className={LoginCSS.LoginInputDiv}>
                        <input type="text" className={LoginCSS.LoginInput} name="id" value={isId} onChange={idChangeHandler} placeholder="아이디" autoComplete="off" />
                        <img src={delImg} alt="delete" className={LoginCSS.LoginDelImg}/>
                    </div>
                </div>
                <div className={`${LoginCSS.LoginSize} ${LoginCSS.LoginSizeSpace}`}>
                    <div className={LoginCSS.LoginImgDiv}>
                        <img src={PwImg} alt="pw" className={LoginCSS.LoginImg}/>
                    </div>
                    <div className={LoginCSS.LoginInputDiv}>
                        <input type="text" className={LoginCSS.LoginInput} name="pw" value={isPw} onChange={pwChangeHandler} placeholder="비밀번호" autoComplete="off" />
                        <img src={delImg} alt="delete" className={LoginCSS.LoginDelImg}/>
                    </div>
                </div>
                <div className={LoginCSS.LoginSize}>
                    <button type="button" className={LoginCSS.LoginButton} onClick={() => { login(); }} >로그인</button>
                </div>
            </div>
            <div>
                <p>Hoxy..? 아이디가 없으신가요?<span onClick={() => { navigate("/join"); }}>( 지금 바로 생성 )</span></p> 
            </div>
        </div>
    );
}

export default Login;