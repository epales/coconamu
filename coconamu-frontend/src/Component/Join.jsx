
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import JoinCSS from "../CSS/Join.module.css"
function Join() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [gender, setGender] = useState("");
    
    const [idError, setIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");
    
    const [idSign, setIdSign] = useState(false);
    const [pwSign, setPwSign] = useState(false);
    const [emailSign, setEmailSign] = useState(false);
    const [genderSign, setGenderSign] = useState(false);
    
    const navigate = useNavigate();

    // 가입 클릭 이벤트
    async function HandleClick() {
        if (!idSign) {
            alert("아이디를 확인 해주세요.");
            return false;
        } else if (!pwSign) {
            alert("비밀번호를 확인 해주세요.");
            return false;
        } else if (!emailSign) {
            alert("이메일을 확인 해주세요.");
            return false;
        } else if (!genderSign) {
            alert("성별체크를 확인 해주세요.");
            return false;
        } 

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
    async function idCheckHandler() {
        await axios({
            method: "GET",
            url: '/api/idCheck',
            params: {
                id: id
            }
        }).then((response) =>{
            if (response) {
                setIdSign(true);
            } else {
                setIdError("중복된 아이디입니다.");
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    const idChange = (e) => {
        if (id === "") {
            setIdSign(false);
        }
        setId(e.target.value);
        idCheckHandler();
    }

    async function emailCheckHandler() { 
        await axios({
                method: "POST",
                url: '/email',
                data: {
                    email : email,
                },
                headers: {'Content-type': 'application/json'}
            }).then((response) => {
                setEmailConfirm(response);
            }).catch((error)=>{
                console.log(error);
            })
    }
    // 이메일 체크
    const emailChange = (e) => {
        setEmail(e.target.value);
        setEmailSign(true);
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
            passwordCheck(value, confirm);
        } else {
            setConfirm(e.target.value);
            passwordCheck(password, value)
        }
    }
    const passwordCheck = (password, confirm) => {
        const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
        if (password === '') {
            setPwSign(false);
            setPasswordError('비밀번호를 입력해 주세요.');
            return false;
        } else if (!passwordRegex.test(password)) {
            setPwSign(false);
            setPasswordError('비밀번호는 8~16 글자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
            return false;
        } else if (password !== confirm) {
            setPasswordError('');
            setPwSign(false);
            setConfirmError('비밀번호가 일치하지 않습니다.');
            return false;
        } else {
            setPwSign(true);
            setPasswordError('');
            setConfirmError('');
            return true;
         }
    }

    return (
        <>
            <div>
                <div>
                    <input type="text" placeholder="아이디" name="id" value={id} onChange={idChange} autoComplete="off"/>
                    {idError}
                </div>
                <div>
                    <input type="password" placeholder="비밀번호" name="password" value={password} onChange={passwordChangeHandler} autoComplete="off"/>
                    {passwordError}
                </div>
                <div>
                    <input type="password" placeholder="비밀번호 확인" name="confirm" value={confirm} onChange={passwordChangeHandler} autoComplete="off"/>
                    {confirmError}
                </div>
                <div className={JoinCSS.displayFlex}>
                    <input type="text" placeholder="이메일" name="email" value={email} onChange={emailChange} autoComplete="off" />
                    <button onClick={emailCheckHandler}>인증번호 발송</button>
                </div>
                    {
                    email !== "" ?
                        <div>
                            <input type="text" placeholder="인증 코드 입력" name="emailConfirm" />
                        </div>
                        :
                        null
                    }
                <div className={JoinCSS.displayFlex}>
                    <input type="radio" name="gender" value={"남성"} onChange={genderChange}/><p>남자</p>
                    <input type="radio" name="gender" value={"여성"} onChange={genderChange}/><p>여자</p>
                </div>
                <div>
                    <button className={JoinCSS.signUpButton} type="button" onClick={() => { HandleClick() }}>버튼</button>
                </div>
            </div>
        </>
    );
}

export default Join;