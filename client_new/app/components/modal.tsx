import React from "react";

type ModalProps = {
    isOpen : boolean;
    children:React.ReactNode;
}
const Modal = ({isOpen,children}:ModalProps)=>{
     if(isOpen){
        return(
            <div className="fixed  inset-0 bg-[rgba(78,78,35,0.50)]  flex justify-center items-center  z-50 ">
                    <div className=" bg-amber-50 p-10  relative rounded-md">
                        {children}
                    </div>
            </div>

        );
     }
     else{
     }


}

export default Modal; 