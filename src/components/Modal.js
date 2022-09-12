import React from "react";
import "./css/Modal.css";
import { useNavigate } from "react-router-dom";
import $ from 'jquery'

function Modal() {
    const navigate = useNavigate();
    let modalCancelClick = () =>{
        $(".modalBackground").css("display","none");
    }
    let modalAcceptClick = () =>{
        navigate("/login");
    }
  return (
    <div className="modalBackground" onClick={modalCancelClick}>
        <div className="modalArea">
            <div className="modalTextArea">
                <div className="modalText">로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?</div>
            </div>
            <div className="modalButtonArea">
                <div className="modalButton modalCancel" onClick={modalCancelClick}>취소</div>
                <div className="modalButton modalAccept" onClick={modalAcceptClick}>확인</div>
            </div>
        </div>
    </div>
  );
}

export default Modal;