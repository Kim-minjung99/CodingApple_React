import { useDispatch } from "react-redux";
import { ItemType } from "../types/ItemType";
import { addCartItem } from "../store/store";
import { useState } from "react";


function Modal(props: any){

    // redux
    const dispatch = useDispatch();

    return(
        <div className="modal">
            모달입니다.
            <button onClick={()=>dispatch(addCartItem(props.modalItem))}></button>
        </div>
    );
}
export default Modal;