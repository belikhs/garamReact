import React, { useState, useEffect } from "react";
import "./css/Header.css";
import { useNavigate } from "react-router-dom";
import $ from 'jquery'

import garam_logo from "./img/garam_logo.png";
import garam_search from "./img/garam_search.png";
import mobile_icon1 from "./img/mobile_icon1.png";
import mobile_icon2 from "./img/mobile_icon2.png";
import mobile_icon3 from "./img/mobile_icon3.png";
import mobile_icon4 from "./img/mobile_icon4.png";


function Header(props) {
    const navigate = useNavigate();

    let [loginNout, setLoginNout] = useState("로그인")
    let [userNickname, setUserNickname] = useState("");
    useEffect(()=>{
        if(localStorage.getItem("userNickname") !== "" && localStorage.getItem("userNickname") !== null){
            setUserNickname(localStorage.getItem("userNickname"))
            document.querySelector('.login_user_name').style.display = 'block';
            setLoginNout("로그아웃")
        } else {
            document.querySelector('.login_user_name').style.display = 'none';
            localStorage.setItem("favoriteCategoryList","")
            localStorage.setItem("userNickname","")
            localStorage.setItem("userEmail","")
            setLoginNout("로그인")
        }
    })

    const GetClick = (e) => {
        if (e.target.classList[1] === "menu1") navigate("/");
        if (e.target.classList[1] === "menu3") {
            localStorage.setItem("FavoriteNavValue","0")
            navigate("/favorite");
        }
        if (e.target.classList[1] === "menu4") navigate("/shoppingbasket");
        if (e.target.classList[1] === "menu6") navigate("/");
        if (e.target.classList[1] === "menu7") {
            localStorage.setItem("FavoriteNavValue","0")
            navigate("/favorite")
        };
        if (e.target.classList[1] === "menu8") navigate("/shoppingbasket");
        if (e.target.classList[1] === "menu2"){
            if(localStorage.getItem("userNickname") !== "" && localStorage.getItem("userNickname") !== null){
                localStorage.setItem("userNickname","");
                window.location.reload();
            }else{
                navigate("/login");
            }
        }
      };

    let searchInputFunction = (e) => {
        for(let i = 0; props.productList.length; i++){
            if(props.productList[i].productName.search(e.target.value) != -1){
                $("."+props.productList[i].productCategory).css("display","block")
            } else{
                $("."+props.productList[i].productCategory).css("display","none")
            }
        }
    }
  return (
    <header className="original_header">
      <div className="header_content">
        <div className="header_logo_search">
          <div className="header_logo"><img className="logo_img menu1" onClick={GetClick} src={garam_logo} alt="logo" /></div>
          <div className="header_search">
              <input className="search_input" type="text" onChange={searchInputFunction}/>
              <div className="search_button"><img src={garam_search} alt="search_icon" /></div>
          </div>
        </div>
        <div className="header_nav_area">
            <div className="login_user_name">{userNickname}님 반갑습니다.</div>
            <div className="header_nav_menu menu2" onClick={GetClick}>
                {loginNout}
            </div>
            <div className="header_nav_menu menu3 header_pc_none" onClick={GetClick}>
                즐겨찾기
            </div>
            <div className="header_nav_menu menu4 header_pc_none" onClick={GetClick}>
                장바구니
            </div>
            <div className="header_nav_menu menu5 header_pc_none">
                마이페이지
            </div>
        </div>
        <div className="header_nav_area_mobile">
                <div className="home_mobile">
                    <div><img className="home_mobile_img menu6" onClick={GetClick} src={mobile_icon1} alt="icon1" /></div>
                    <div className="home_mobile_text menu6" onClick={GetClick}>홈</div>
                </div>
                <div className="favorite_mobile">
                    <div><img className="favorite_mobile_img menu7" onClick={GetClick} src={mobile_icon2} alt="icon2" /></div>
                    <div className="favorite_mobile_text menu7" onClick={GetClick}>즐겨찾기</div>
                </div>
                <div className="shopping_basket_mobile">
                    <div><img className="shopping_basket_mobile_img menu8" onClick={GetClick} src={mobile_icon3} alt="icon3" /></div>
                    <div className="shopping_basket_mobiletext menu8" onClick={GetClick}>장바구니</div>
                </div>
                <div className="my_page_mobile menu9">
                    <div><img src={mobile_icon4} alt="icon4" /></div>
                    <div>마이페이지</div>
                </div>
            </div>
      </div>
    </header>
  );
}

export default Header;