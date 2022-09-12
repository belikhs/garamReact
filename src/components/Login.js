import React from "react";
import "./css/Login.css";
import { useNavigate } from "react-router-dom";
import NaverLogin from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';

import NaverLoginImg from './img/naverLogin.png';
import KakaoLoginImg from './img/kakaoLogin.png';


function Login() {
  const navigate = useNavigate();

  const _clickSnsLoginKakao = (e) => {
    let kakaoid = e.profile.id; // 카카오에서 제공한 ID
    let kakaoemail = e.profile.kakao_account.email; // 카카오에서 제공한 EMAIL
    let kakaonickname = e.profile.kakao_account.profile.nickname; // 카카오에서 제공한 nickname
    localStorage.setItem("userEmail", kakaoemail);
    localStorage.setItem("userNickname", kakaonickname);
    navigate("/")
    window.location.reload();
  };
  const _clickSnsLoginNaver = (e) => {
    let naverid = e.id; // 네이버에서 제공한 ID
    console.log(naverid)
  };


  return (
    <div className="loginWrap">
      <NaverLogin
        clientId={'0wmrSu3cU9QtYt2r7aEy'}
        callbackUrl="http://localhost:3000/"
        render={renderProps => (
          <div className="loginImgDiv" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <img src={NaverLoginImg} alt="login img" resizeMode={'contain'} />
          </div>
        )}
        onSuccess={(e) => _clickSnsLoginNaver(e)}
        onFailure={(result) => console.error(result)}
      />
      <KakaoLogin
        token={'aeccca468c9c38fcb07b4a6c4a15fbb3'}
        render={renderProps => (
          <div className="loginImgDiv" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <img src={KakaoLoginImg} alt="login img" resizeMode={'contain'} />
          </div>
        )}
        onSuccess={(e) => _clickSnsLoginKakao(e)}
        onFail={console.error}
        onLogout={console.info}
      />
    </div>
  );
}

export default Login;