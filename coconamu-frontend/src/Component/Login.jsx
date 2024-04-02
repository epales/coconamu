import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import LoginCSS from "../CSS/Login.module.css";
import delImg from "../Img/icons8-cancel-48.png"
import IdImg from "../Img/icons8-우편-48.png" 
import PwImg from "../Img/icons8-자물쇠-48.png"
import coconamulogo from "../Img/icons8-coconamu.png";
import {setCookie} from "../Util/Cookie";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [isId, setId] = useState("");
    const [isPw, setPw] = useState("");
    const inputIdRef = useRef();
    const inputPwRef = useRef(); 
    
    async function login() {
        await axios({
                method: "POST",
                url: '/sign-in',
                data: {
                    username: isId,
                    password: isPw
                },
                headers: { 'Content-type': 'application/json' }
            }).then((response) => {
                console.log(response.data);
                setCookie("accessToken",response.data.accessToken);
                navigate("/");
            }).catch((error) => {
                console.log(error);
                alert("로그인 실패! 아이디 혹은 비밀번호를 확인해 주세요.");
            })
        
    }
    const idChangeHandler = (e) => {
        setId(e.target.value)
    }
    const pwChangeHandler = (e) => {
        setPw(e.target.value)
    }
    const idClear = () => {
        setId("");
        inputIdRef.current.focus();
    }
    const pwClear = () => {
        setPw("");
        inputPwRef.current.focus();
    }
    const idClickHandler=() => {
        inputIdRef.current.focus();
    }
    const pwClickHandler=() => {
        inputPwRef.current.focus();
    }
    return (
        <div className={`${LoginCSS.LoginBody} ${LoginCSS.wrapper}`}>
            <div>
                    <img src={coconamulogo} alt="logo" className={LoginCSS.logo} onClick={()=> {navigate("/")}}/>
            </div>
            <div className={LoginCSS.LoginBodyMain}>
                <div className={`${LoginCSS.LoginSize} ${LoginCSS.LoginSizeSpace}`}>
                    <div className={LoginCSS.LoginImgDiv} onClick={idClickHandler}> 
                        <img src={IdImg} alt="id" className={LoginCSS.LoginImg}/>
                    </div>
                    <div className={LoginCSS.LoginInputDiv}>
                        <input type="text" className={LoginCSS.LoginInput} name="id" ref={inputIdRef} value={isId} onChange={idChangeHandler} placeholder="아이디" autoComplete="off" />
                        {
                            isId !== ""
                            ?
                                <img src={delImg} alt="delete" className={LoginCSS.LoginDelImg} onClick={idClear}/>
                                :
                                null
                        }
                        
                    </div>
                </div>
                <div className={`${LoginCSS.LoginSize} ${LoginCSS.LoginSizeSpace}`}>
                    <div className={LoginCSS.LoginImgDiv} onClick={pwClickHandler}>
                        <img src={PwImg} alt="pw" className={LoginCSS.LoginImg}/>
                    </div>
                    <div className={LoginCSS.LoginInputDiv}>
                        <input type="password" className={LoginCSS.LoginInput} name="pw" ref={inputPwRef} value={isPw} onChange={pwChangeHandler} placeholder="비밀번호" autoComplete="off" />
                        {
                            isPw !== ""
                                ?
                                <img src={delImg} alt="delete" className={LoginCSS.LoginDelImg} onClick={pwClear}/>
                                :
                                null
                        }
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