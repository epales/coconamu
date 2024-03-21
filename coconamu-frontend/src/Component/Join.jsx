
import axios from "axios";
import { useState} from "react";

function Join() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [emailPage, setEmailPage] = useState("");
    const [gender, setGender] = useState("");
    
    async function HandleClick() {
        await axios("/api/signUp", {
            method: "POST",
            url: '/api/signUp',
            data: {
                id: id,
                password : password,
                email : email + "@" + emailPage,
                gender : gender
            },
            headers: {'Content-type': 'application/json'}
        }).then((response) =>{
            console.log(response.data);	    
        }).catch((error)=>{
            console.log(error);				//오류발생시 실행
        })
    };

    const idChange = (e) => {
        setId(e.target.value);
    }
    const passwordChange = (e) => {
        setPassword(e.target.value);
    }
    const confirmChange = (e) => {
        setConfirm(e.target.value);
    }
    const emailChange = (e) => {
        setEmail(e.target.value);
    }
    const emailPageChange = (e) => {
        setEmailPage(e.target.value);
    }
    const genderChange = (e) => {
        setGender(e.target.value);
    }


    return (
        <>
            <div>
                <div>
                    <input type="text" placeholder="아이디" name="id" value={id} onChange={idChange}/>
                </div>
                <div>
                    <input type="password" placeholder="비밀번호" name="password" value={password} onChange={passwordChange}/>
                </div>
                <div>
                    <input type="password" placeholder="비밀번호 확인" name="confirm" value={confirm} onChange={confirmChange} />
                </div>
                <div>
                    <input type="text" placeholder="이메일" name="email" value={email} onChange={emailChange}/>@
                    <input type="text" placeholder="직접 입력" name="emailPage" value={emailPage} onChange={emailPageChange}/>
                    <select> 
                        <option defaultValue={""} >직접 입력</option>
                        <option value={"naver.com"}>naver.com</option>
                        <option value={"daum.net"}>daum.net</option>
                        <option value={"nate.com"}>nate.com</option>
                    </select>
                </div>
                <div>
                    <button type="button" onClick={() => { HandleClick() }}>버튼</button>
                </div>
            </div>
        </>
    );
}

export default Join;