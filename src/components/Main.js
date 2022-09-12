import React, { useState } from "react";
import "./css/Main.css";
import $ from 'jquery';
import MainProduct from "./MainProduct";


import nav_arrow_back from "./img/nav_arrow_back.png"
import nav_arrow_forward from "./img/nav_arrow_forward.png"
// import { useEffect } from "react";

function Main(props) {
  // 내비 드래그랑 버튼 누르는거
  $(function (){
    const slider = document.querySelector('.main_nav_wrap');
    let isMouseDown = false;
    let startX, scrollLeft;
    slider.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isMouseDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isMouseDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1;
        slider.scrollLeft = scrollLeft - walk;
    });
  
    $('.nav_arrow_back').on("click", function(){
     var main_nav_div = $('.nav0').width();
     var main_nav_wrap = $('.main_nav_wrap').scrollLeft();
     $('.main_nav_wrap').scrollLeft(main_nav_wrap - main_nav_div);
    })
    $('.nav_arrow_forward').on("click", function(){
     var main_nav_div = $('.nav0').width();
     var main_nav_wrap = $('.main_nav_wrap').scrollLeft();
     $('.main_nav_wrap').scrollLeft(main_nav_wrap + main_nav_div);
    })
  })

  // 카테고리에서 숫자 빼오는거
  let [category, setCategory] = useState(0)
  const categoryFilter = (e) => {
    setCategory(Number(e.target.classList[0][3]))
  }

  const MainProductList = props.productList.map(List =>{
    if(category === 0){
      return <MainProduct list={List} key={List.productCategory} />
    } else if(category !== 0 && category === Number(List.productCategory.split("_")[0])){
      return <MainProduct list={List} key={List.productCategory} />
    }
  })

  return (
    <>
      <div className="main_nav_wrap">
        <div className="nav_arrow nav_arrow_back"><img src={nav_arrow_back} alt="arrow" /></div>
        <div className="nav_arrow nav_arrow_forward"><img src={nav_arrow_forward} alt="arrow" /></div>
        <div className="main_nav">
            <div className="nav0" onClick={categoryFilter}>전체</div>
            <div className="nav1" onClick={categoryFilter}>왁스류</div>
            <div className="nav2" onClick={categoryFilter}>세제류</div>
            <div className="nav3" onClick={categoryFilter}>작은세제류</div>
            <div className="nav4" onClick={categoryFilter}>장갑류</div>
            <div className="nav5" onClick={categoryFilter}>빗자루</div>
            <div className="nav6" onClick={categoryFilter}>쓰레받이류</div>
            <div className="nav7" onClick={categoryFilter}>걸레류</div>
            <div className="nav8" onClick={categoryFilter}>자루형</div>
            <div className="nav9" onClick={categoryFilter}>기타</div>
        </div>
      </div>
      <div className="product">
        {MainProductList}
      </div>
    </>
  );
}

export default Main;