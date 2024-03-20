import { useNavigate } from "react-router-dom";
import HeaderCSS from "../CSS/Header.css";
function Header() {
    const navigate = useNavigate();
    return (
        <div>
            <div>
                {/* <img src =""/> 로고 이미지 추가할것 */}
            </div>
            <div>
                {/* 카테고리 */}    
            </div>
            <div>
                <input type="text" placeholder="검색어"></input>
            </div>
            <div className= {HeaderCSS.HeaderRightdiv}>
                <div>
                    <button onClick={() => { navigate("/login"); }}>
                        <p>로그인</p>
                    </button>
                </div>
                <div>
                    <button>
                        <p>회원가입</p>
                    </button>
                </div>
                <div>
                    <button>
                        <p>고객센터</p>
                    </button>
                </div>
                {/* 로그인 / 회원가입 / 고객센터 */} 
            </div>
            
        </div>
    );
}

export default Header;