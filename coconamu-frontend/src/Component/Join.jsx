
import axios from "axios";
import { useState , useRef } from "react";
import { useNavigate } from "react-router";
import JoinCSS from "../CSS/Join.module.css";
import lock from '../Img/icons8-lock-32.png';
import logo from "../Img/icons8-우편-48.png";
import coconamulogo from "../Img/icons8-coconamu.png";
function Join() {
    const [id, setId] = useState("");

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [emailVerifyCode, setEmailVerifyCode] = useState("");

    const [gender, setGender] = useState("");
    
    const [idError, setIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    
    const [idSign, setIdSign] = useState(false);
    const [pwSign, setPwSign] = useState(false);
    const [emailSign, setEmailSign] = useState(false);
    const [emailSendCheck, setEmailSendCheck] = useState(false);
    const [genderSign, setGenderSign] = useState(false);
    

    const navigate = useNavigate();
    const inputIdRef = useRef();
    const inputPwRef = useRef(); 
    const inputConfirmRef = useRef(); 
    const inputEmailRef = useRef(); 

    const idClickHandler=() => {
        inputIdRef.current.focus();
    }
    const pwClickHandler=() => {
        inputPwRef.current.focus();
    }
    const confirmClickHandler=() => {
        inputConfirmRef.current.focus();
    }
    const emailClickHandler=() => {
        inputEmailRef.current.focus();
    }


    // 가입 클릭 이벤트
    async function HandleClick() {
        // 가입 제약
        if (!idSign) {
            alert("아이디를 확인 해주세요.");
            return false;
        } else if (!pwSign) {
            alert("비밀번호를 확인 해주세요.");
            return false;
        } else if (!emailSign) {
            alert("이메일 인증을 완료 해주세요.");
            return false;
        } else if (!genderSign) {
            alert("성별 체크를 확인 해주세요.");
            return false;
        } 

        // 가입 버튼 Axios
        if (idSign) {
            await axios({
                method: "POST",
                url: '/api/signUp',
                data: {
                    id: id,
                    password : password,
                    email : email,
                    gender : gender
                },
                headers: {'Content-type': 'application/json'}
            }).then((response) => {
                alert("가입 완료! 로그인 해주세요.")
                navigate('/login');   
            }).catch((error)=>{
                console.log(error);
            })
        } else {
            alert("가입정보를 입력해주세요.")
        }
    };

    // 아이디 중복 체크 및 입력 체크
    async function idCheckHandler(id) {
        await axios({
            method: "GET",
            url: '/api/idCheck',
            params: {
                id: id
            }
        }).then((response) =>{
            if (response.data) {
                setIdSign(true);
                setIdError("");
            } else {
                setIdSign(false);
                setIdError("중복된 아이디입니다.");
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    // 아이디 입력
    const idChange = (e) => {
        if (id === "") {
            setIdSign(false);
        }
        setId(e.target.value);
        idCheckHandler(e.target.value);
        
    }

    // 이메일 인증코드 발송
    async function emailCheckHandler() {
        if (email !== "") {
            setEmailSendCheck(true);
            alert("인증코드 발송! 이메일 확인 후 인증 해주세요~");
            await axios({
                method: "POST",
                url: '/email',
                data: {
                    email: email,
                },
                headers: { 'Content-type': 'application/json' }
            }).then((response) => {
                console.log(response.data);
                setEmailVerifyCode(response.data);
            }).catch((error) => {
                console.log(error);
            })
        } else {
            alert("이메일을 입력해주세요!");
        }
    }
    // 이메일 체크
    const emailChange = (e) => {
        setEmail(e.target.value);
    }
    // 이메일 인증코드 입력
    const emailConfirmChange = (e) => {
        setEmailConfirm(e.target.value);
    }
    // 발송된 인증코드와 입력한 인증코드 대조
    const verifyEmailCode = () => {
        if (emailConfirm === emailVerifyCode) {
            setEmailSign(true);
            alert("이메일 인증 완료!");
        } else {
            alert("코드가 달라요! 현재 인증 코드는 :" + emailVerifyCode);
        }
    }
    // 성별 체크
    const genderChange = (e) => {
        setGender(e.target.value);
        setGenderSign(true);
    }
    // 비밀번호 체크
    const passwordChangeHandler = (e) => {
        const { name, value } = e.target

        if (name === 'password') {
            setPassword(value);
            passwordCheck(value, passwordConfirm);
        } else {
            setPasswordConfirm(e.target.value);
            passwordCheck(password, value)
        }
    }
    const passwordCheck = (password, passwordConfirm) => {
        const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
        if (password === '') {
            setPwSign(false);
            setPasswordError('비밀번호를 입력해 주세요.');
            return false;
        } else if (!passwordRegex.test(password)) {
            setPwSign(false);
            setPasswordError('비밀번호는 8~16 글자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
            return false;
        } else if (password !== passwordConfirm) {
            setPasswordError('');
            setPwSign(false);
            setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
            return false;
        } else {
            setPwSign(true);
            setPasswordError('');
            setPasswordConfirmError('');
            return true;
         }
    }

    return (
        <>
            <div className={`${JoinCSS.joinBody} ${JoinCSS.wrapper}`}>
                <div>
                    <img src={coconamulogo} alt="logo" className={JoinCSS.logo} onClick={()=> {navigate("/")}}/>
                </div>
                <div className={JoinCSS.joinBodyMain}>
                    <div className={`${JoinCSS.joinSize} ${JoinCSS.joinSizeSpace}`}>
                        <div className={JoinCSS.joinImgDiv} onClick={idClickHandler}>
                            <img src={logo} alt="logo" className={JoinCSS.joinImg} />
                        </div>
                        <div className={JoinCSS.joinInputDiv}>
                            <input type="text" className={JoinCSS.joinInput} placeholder="아이디" name="id" ref={inputIdRef} value={id} onInput={idChange} autoComplete="off" />
                        </div>
                        {
                            id !== "" ?
                                
                                <div>{ idError }</div>
                                :
                                null
                        }
                    </div>
                    <div className={`${JoinCSS.joinSize} ${JoinCSS.joinSizeSpace}`}>
                        <div className={JoinCSS.joinImgDiv} onClick={pwClickHandler}>
                            <img src={lock} alt="logo" className={JoinCSS.joinImg} />
                        </div>
                        <div className={JoinCSS.joinInputDiv}>
                            <input type="password" className={JoinCSS.joinInput} placeholder="비밀번호" name="password" ref={inputPwRef} value={password} onChange={passwordChangeHandler} autoComplete="off" />
                        </div>
                        {
                            password !== "" ?
                                <div>{ passwordError }</div>
                                :
                                null
                        }
                    </div>
                    <div className={`${JoinCSS.joinSize} ${JoinCSS.joinSizeSpace}`}>
                        <div className={JoinCSS.joinImgDiv} onClick={confirmClickHandler}>
                            <img src={lock} alt="logo" className={JoinCSS.joinImg} />
                        </div>
                        <div className={JoinCSS.joinInputDiv}>
                            <input type="password" className={JoinCSS.joinInput} placeholder="비밀번호 확인" name="passwordConfirm" ref={inputConfirmRef}value={passwordConfirm} onChange={passwordChangeHandler} autoComplete="off"/>
                        </div>
                        {
                            passwordConfirm !== "" ?
                                <div>{ passwordConfirmError }</div>
                                :
                                null
                        }
                    </div>
                    <div className={JoinCSS.joinSize}>
                        <div className={JoinCSS.joinImgDiv} onClick={emailClickHandler}>
                           <img src={logo} alt="logo" className={JoinCSS.joinImg} /> 
                        </div>
                        <div className={JoinCSS.joinInputDiv}>
                            <input type="text" className={JoinCSS.joinInput} placeholder="이메일" name="email" ref={inputEmailRef} value={email} onChange={emailChange} autoComplete="off" />
                        </div>
                           
                    </div>
                    <div className={JoinCSS.joinSize}>
                        <div className={JoinCSS.joinInputDiv}>
                            <button className={JoinCSS.joinButton} onClick={emailCheckHandler}>인증번호 발송</button>
                        </div> 
                    </div>
                        {
                        emailSendCheck === true ?
                            <> 
                                <div className={JoinCSS.joinSize}>
                                    <div className={JoinCSS.joinInputDiv}>
                                        <input type="text" className={JoinCSS.joinInput} placeholder="인증 코드 입력" name="emailConfirm" onChange={emailConfirmChange} autoComplete="off"/>
                                    </div>
                                </div>
                                <div className={`${JoinCSS.joinSize} ${JoinCSS.joinSizeSpace}`}>
                                    <div className={JoinCSS.joinInputDiv}>
                                        <button name="confirm" className={JoinCSS.joinButton} onClick={verifyEmailCode}>인증</button>
                                    </div>
                                </div>
                            </>
                            :
                            null
                        }
                    <div className={JoinCSS.joinGender}>
                        <input type="button" className={`${JoinCSS.joinButton} ${JoinCSS.borderLine} ${gender === "남성" ? JoinCSS.joinGenderMan : "" }`} name="gender" value={"남성"} onClick={genderChange}/>
                        <input type="button" className={`${JoinCSS.joinButton} ${JoinCSS.borderLine} ${gender === "여성" ? JoinCSS.joinGenderWoman : "" }`} name="gender" value={"여성"} onClick={genderChange}/>
                    </div>
                    <div>
                    <button className={`${JoinCSS.joinButton} ${JoinCSS.borderLine} `}  onClick={() => { HandleClick() }}>버튼</button>
                    </div>
                    </div>
            </div>
        </>
    );
}

export default Join;