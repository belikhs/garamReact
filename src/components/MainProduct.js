import React, { useEffect, useState } from "react";
import "./css/MainProduct.css";
import { useNavigate } from "react-router-dom";
import $ from 'jquery'

import favorite_inactive from "./img/favorite_inactive.png"
import favorite_active from "./img/favorite_active.png"

function Main_product(props) {
  // console.log(props)
  const navigate = useNavigate();

  // 물품 누르면 상세페이지로 이동
  const ProductClick = (e) => {
    if(props.list.productCategory === thisProductCategory){
      if (e.target.classList[1] === "productDetail"){
        navigate("/ProductDetailPage");
        localStorage.setItem("productCategory", props.list.productCategory);
        localStorage.setItem("productName", props.list.productName);
        localStorage.setItem("productOption", props.list.productOption);
        localStorage.setItem("productThumbnailUrl", props.list.productThumbnailUrl);
        localStorage.setItem("productExplanation", props.list.productExplanation);
      }
    }
  };

  // 현재 물품 카테고리
  let [thisProductCategory, setThisProductCategory] = useState("");
  useEffect(()=>{
    if(thisProductCategory === ""){
      setThisProductCategory(props.list.productCategory)
    }
  },[thisProductCategory])
  // 즐겨찾기 여부에 따라 아이콘 이미지 변경
  let [favoriteIcon, setFavoriteIcon] = useState(favorite_inactive);
  let [userEmail, setUserEmail] = useState("")
  useEffect(()=>{
    setUserEmail(localStorage.getItem("userEmail"))
  })
  useEffect(()=>{
    if(userEmail !== "" && userEmail !== null){
      // 즐겨찾기 리스트에 해당 물품 카테고리가 있으면 활성화 해줌
      if(localStorage.getItem("favoriteCategoryList").indexOf(thisProductCategory) !== -1){
        setFavoriteIcon(favorite_active)
      } else{
        setFavoriteIcon(favorite_inactive)
      }
    } else{
      setFavoriteIcon(favorite_inactive)
    }
  });
  let favoriteCategoryListSplit;
  const [favoriteCategoryListHandling, setFavoriteCategoryListHandling] = useState([]);
  useEffect(()=>{
    // 로컬스토리지에 넣어둔 즐겨찾기 리스트 문자열을 배열로 변환
    if(localStorage.getItem("favoriteCategoryList") !== ""){
      let categoryList = localStorage.getItem("favoriteCategoryList").split('!!');
      setFavoriteCategoryListHandling(categoryList)
    } 
  },[])

  const [favoriteCategoryAdd, setFavoriteCategoryAdd] = useState([])
  useEffect(()=>{
    setFavoriteCategoryAdd(favoriteCategoryListHandling)
  })
 
  // 즐겨찾기 누르면 추가&제거
  let favoriteIconClick = (e) => {
    if(userEmail !== "" && userEmail !== null){
      if(e.target.src === favorite_inactive){
        favoriteCategoryAdd.push(thisProductCategory);
        favoriteCategoryListSplit = favoriteCategoryAdd.join("!!");
        localStorage.setItem("favoriteCategoryList",favoriteCategoryListSplit)
        setFavoriteIcon(favorite_active)
      } else if(e.target.src === favorite_active){
        var thisProductCategoryNum = 0;
        for(let i = 0; i < favoriteCategoryAdd.length; i++){
          if(favoriteCategoryAdd[i] === thisProductCategory){
            thisProductCategoryNum = i;
          }
        }
        favoriteCategoryAdd.splice(thisProductCategoryNum,1);
        if(favoriteCategoryAdd.length !== 0){
          favoriteCategoryListSplit = favoriteCategoryAdd.join("!!");
          localStorage.setItem("favoriteCategoryList",favoriteCategoryListSplit)
        } else{
          setFavoriteCategoryAdd([])
          favoriteCategoryListSplit = "";
          localStorage.setItem("favoriteCategoryList",favoriteCategoryListSplit)
        }
        setFavoriteIcon(favorite_inactive)
      }
      console.log(favoriteCategoryListSplit)
      $.ajax({    
        type : 'post', // 타입 (get, post, put 등등)    
        url : 'http://garammarket.dothome.co.kr/php/update_user_favorites.php', // 요청할 서버url   
        data : {  // 보낼 데이터 (Object , String, Array)     
          "user_email" : userEmail,
          'user_favorite_category' : favoriteCategoryListSplit,
        },    
        success : function(result) { // 결과 성공 콜백함수        
          console.log(result)
        },    
        error : function(request, status, error) { // 결과 에러 콜백함수        
          console.log(error)    
        }
      })
      .then((response) => response.json())
      .then((data) => console.log(data));
    } else{
      $(".modalBackground").css("display","flex");
    }
  }

  return (
    <div className={'product_wrap ' + props.list.productCategory}>
        <div className="product_box productDetail" onClick={ProductClick}>
            <div className="product_thmbnail"><img className="product_thmbnail_img productDetail" src={props.list.productThumbnailUrl} alt="product_thmbnail" onClick={ProductClick}/></div>
            <div className="product_name productDetail" onClick={ProductClick}>{props.list.productName}</div>
            <div className="product_option productDetail" onClick={ProductClick}>{props.list.productOption}</div>
        </div>
        <div className="product_favorite">
            <img onClick={favoriteIconClick} src={favoriteIcon} alt="favorite_inactive" />
        </div>
    </div>
  );
}

export default Main_product;