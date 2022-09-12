import React, { useEffect, useState } from "react";
import "./css/Favorite.css";
import FavoriteProduct from "./FavoriteProduct";
import $ from 'jquery'

function Favorite(props) {
  let [productAll, setProductAll] = useState([]);
  let [favoriteList, setFavoriteList] = useState("");
  useEffect(()=>{
    if(props.productList.length !== 0){
      setProductAll([...props.productList])
    }
    if(localStorage.getItem("favoriteCategoryList") !== "" && localStorage.getItem("favoriteCategoryList") !== null){
      setFavoriteList(localStorage.getItem("favoriteCategoryList"))
    }
  },[localStorage.getItem("favoriteCategoryList"), props])

  
  let [CategoryControl, setCategoryControl] = useState(0)
  let NavChangeHandle = (e) => {
    localStorage.setItem("FavoriteNavValue",e.target.value);
    setCategoryControl(Number(e.target.value));
  }

  let FavoriteProductList = productAll.map(List =>{
    if(favoriteList.indexOf(List.productCategory) !== -1){
      if(parseInt(List.productCategory) == CategoryControl){
        return <FavoriteProduct list={List} key={List.productCategory} />
      } else if(CategoryControl == 0){
        return <FavoriteProduct list={List} key={List.productCategory} />
      }
    } 
  })

  return (
    <>
      <div className="favoriteTitle">
        <div>즐겨찾기</div>
      </div>
      <div className="favoriteNavWrap">
          <div className="favoriteNav">
              <div className="favoriteNavItem favoriteNav0">
                  <div>전체</div>
                  <div className="favoriteNum favoriteNum0">0</div>
              </div>
              <div className="favoriteNavItem favoriteNav1">
                  <div>왁스류</div>
                  <div className="favoriteNum favoriteNum1">0</div>
              </div>
              <div className="favoriteNavItem favoriteNav2">
                  <div>세제류</div>
                  <div className="favoriteNum favoriteNum2">0</div>
              </div>
              <div className="favoriteNavItem favoriteNav3">
                  <div>작은세제류</div>
                  <div className="favoriteNum favoriteNum3">0</div>
              </div>
              <div className="favoriteNavItem favoriteNav4">
                  <div>장갑류</div>
                  <div className="favoriteNum favoriteNum4">0</div>
              </div>
              <div className="favoriteNavItem favoriteNav5">
                  <div>빗자루</div>
                  <div className="favoriteNum favoriteNum5">0</div>
              </div>
              <div className="favoriteNavItem favoriteNav6">
                  <div>쓰레받이류</div>
                  <div className="favoriteNum favoriteNum6">0</div>
              </div>
              <div className="favoriteNavItem favoriteNav7">
                  <div>걸레류</div>
                  <div className="favoriteNum favoriteNum7">0</div>
              </div>
              <div className="favoriteNavItem favoriteNav8">
                  <div>자루형</div>
                  <div className="favoriteNum favoriteNum8">0</div>
              </div>
              <div className="favoriteNavItem favoriteNav9">
                  <div>기타</div>
                  <div className="favoriteNum favoriteNum9">0</div>
              </div>
          </div>
      </div>
      <div className="favoriteNavMobileWrap">
          <div className="selectDiv">
              <select name="favoriteNavMobile" className="favoriteNavMobile" onChange={NavChangeHandle} defaultValue="0">
                  <option value="0">전체</option>
                  <option value="1">왁스류</option>
                  <option value="2">세제류</option>
                  <option value="3">작은세제류</option>
                  <option value="4">장갑류</option>
                  <option value="5">빗자루</option>
                  <option value="6">쓰레받이류</option>
                  <option value="7">걸레류</option>
                  <option value="8">자루형</option>
                  <option value="9">기타</option>
              </select>
          </div>
      </div>
      <div className="favoriteProductWrapper">
        <div className="FavoriteProduct">
          {FavoriteProductList}
        </div>
      </div>
    </>
  );
}

export default Favorite;