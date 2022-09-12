import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import $ from 'jquery';

import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';
import Favorite from './components/Favorite';
import ShoppingBasket from './components/ShoppingBasket';
import ProductDetailPage from './components/ProductDetailPage';
import Modal from './components/Modal';

function App() {
  const [productListAll, setProductListAll] = useState([]);

  useEffect(()=>{
      $.ajax({    
        type : 'post',           // 타입 (get, post, put 등등)    
        url : 'http://garammarket.dothome.co.kr/php/product_list.php', // 요청할 서버url    
        async : true,            // 비동기화 여부 (default : true)    
        headers : {              // Http header      
          "Content-Type" : "application/json",      
          "X-HTTP-Method-Override" : "POST"    
        },    
        dataType : 'text',       // 데이터 타입 (html, xml, json, text 등등)    
        data : JSON.stringify({  // 보낼 데이터 (Object , String, Array)      
        }),    
        success : function(result) { // 결과 성공 콜백함수     
            var productData = result; 
            var productData1 = productData.split("(start)");
            var productData2 = [];
            for(let i = 0; i < productData1.length; i++){
              if(productData1[i] !== null && productData1[i] !== ""){
                productData2.push(productData1[i])
              }
            }
            let productList = new Array(productData2.length);
            for(let i = 0; i < productData2.length; i++){
              productList[i] = {};
              var productSplit = productData2[i].split("~~");
              productList[i].productCategory = productSplit[0];
              productList[i].productName = productSplit[1];
              productList[i].productOption = productSplit[2];
              productList[i].productThumbnailUrl = productSplit[3];
              productList[i].productExplanation = productSplit[4];
              productList[i].productSaleCount = productSplit[5];
            }
            return setProductListAll([...productList]);
          },    
          error : function(request, status, error) { // 결과 에러 콜백함수        
            console.log(error)    
          }
        })
      }, [])
  
  let [favoriteData, setFavoriteData] = useState("");
  useEffect(()=>{
    if(localStorage.getItem("userEmail") !== "" && localStorage.getItem("userEmail") !== null){
      let userEmail = localStorage.getItem("userEmail");
      $.ajax({    
        type : 'post', // 타입 (get, post, put 등등)    
        url : 'http://garammarket.dothome.co.kr/php/get_user_favorites.php', // 요청할 서버url   
        data : {  // 보낼 데이터 (Object , String, Array)     
          "user_email" : userEmail,
        },    
        success : function(result) { // 결과 성공 콜백함수     
          if(result !== "X"){
            setFavoriteData(result);
          }
        },    
        error : function(request, status, error) { // 결과 에러 콜백함수        
          console.log(error)    
        }
      })
      localStorage.setItem("favoriteCategoryList",favoriteData) 
    } else{
      localStorage.setItem("favoriteCategoryList","")
    }
  });
  


  return (
    <BrowserRouter basename="/GaramReactVer">
      <Header productList={productListAll}/>
      <Routes>
        <Route path="/" element={<Main productList={productListAll} />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/favorite" element={<Favorite productList={productListAll} />} />
        <Route path="/shoppingbasket" element={<ShoppingBasket />} />
        <Route path="/ProductDetailPage" element={<ProductDetailPage />} />
      </Routes>
      <Modal />
    </BrowserRouter>
  );
}

export default App;