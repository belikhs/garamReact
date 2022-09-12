import React, {useState, useEffect} from "react";
import "./css/FavoriteProduct.css";
import $ from 'jquery'

import favorite_inactive from "./img/favorite_inactive.png"
import favorite_active from "./img/favorite_active.png"

function FavoriteProduct(props) {
    
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
        window.location.reload();
        } else{
        $(".modalBackground").css("display","flex");
        }
    }

  return (
    <div className={'FavoriteWrap '+props.list.productCategory}>
        <div className="FavoriteProductBox">
            <div className="FavoriteProductThumbnail"><img src={props.list.productThumbnailUrl} alt="product thumbnaiul" /></div>
            <div className="FavoriteProductText">
                <div className="FavoriteProductName">{props.list.productName}</div>
                <div className="FavoriteProductOption">{props.list.productOption}</div>
            </div>
        </div>
        <div className="FavoriteProductIcon" onClick={favoriteIconClick}><img src={favoriteIcon} alt='favorite icon' /></div>
    </div>
  );
}

export default FavoriteProduct;