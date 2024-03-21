
import axios from "axios";
import { useState} from "react";

function Join() {
    const [user, setUser] = useState({ id: "아이디", password: "1234" })
    

    async function HandleClick() {
        await axios("/api/signUp", {
            method: "POST",
            url: '/api/signUp',
            data: {
                id: user.id,
                password : user.password
            },
            headers: {'Content-type': 'application/json'}
        }).then((response) =>{
            console.log(response.data);	    
        }).catch((error)=>{
            console.log(error);				//오류발생시 실행
        })
    }

    return (
        <>
            <div>
                <div>
                    <input type="text" placeholder="아이디" name="id"/>
                </div>
                <div>
                    <input type="password" placeholder="비밀번호"/>
                </div>
                <div>
                    <input type="password" placeholder="비밀번호 확인" />
                </div>
                <div>
                    <input type="text" placeholder="이메일" />@
                    <input type="text" placeholder="직접 입력" />
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