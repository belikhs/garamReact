import React, { useState, useEffect } from "react";
import "./css/ProductDetailPage.css";


function ProductDetailPage() {
    let [productCategory, setProductCategory] = useState("")
    let [productName, setProductName] = useState("")
    let [productOption, setProductOption] = useState("")
    let [productThumbnailUrl, setProductThumbnailUrl] = useState("")
    let [productExplanation, setProductExplanation] = useState("")
    let [productCount, setProductCount] = useState(1)

    useEffect(()=>{
        if(localStorage.getItem("productCategory") !== ""){
            setProductCategory(localStorage.getItem("productCategory"))
            setProductName(localStorage.getItem("productName"))
            setProductOption(localStorage.getItem("productOption"))
            setProductThumbnailUrl(localStorage.getItem("productThumbnailUrl"))
            setProductExplanation(localStorage.getItem("productExplanation"))
        }
    },[]);

    const productCountAS = (e) => {
        if(e.target.classList[0] === "quantitySubtract" && productCount !== 0){
            setProductCount(productCount - 1)
        }
        if(e.target.classList[0] === "quantityAdd"){
            setProductCount(productCount + 1)
        }
        
    }
  return (
    <div className="productWrapper">
        <div className="productWrap">
            <div className="productImg">
                <img src={productThumbnailUrl} alt={productCategory} />
            </div>
            <div className="productText">
                <div className="productName">{productName}</div>
                <div className="productOption">{productOption}</div>
                <div className="productExplanation">{productExplanation}</div>
                <div className="productQuantity">
                    <div className="quantitySubtract" onClick={productCountAS}>-</div>
                    <div className="productCount">{productCount}</div>
                    <div className="quantityAdd" onClick={productCountAS}>+</div>
                </div>
            </div>
        </div>
        <div className="buttonWrap">
            <div className="buttonStyle favoriteButton">즐겨찾기</div>
            <div className="buttonStyle shoppingBasketButton">장바구니</div>
        </div>
    </div>
  );
}

export default ProductDetailPage;