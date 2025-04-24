import React, { useEffect, useState } from "react";

type ModalProps = {
    isOpen : boolean;
    children:React.ReactNode;
}
const Modal = ({isOpen,children}:ModalProps)=>{
    const [animate,setAnimate] = useState<boolean>(false);
    useEffect(()=>{
        console.log(animate);
},[animate]);
    if(isOpen){
            setTimeout(() => {
                setAnimate(true);
            }, 100);

           
        return(
            <div className={` fixed  inset-0 bg-[rgba(78,78,35,0.50)]  flex justify-center items-center z-10 `}>
                    <div className={` bg-white p-5 mb-44 relative rounded-md ${animate?'scale-100':'scale-0'} duration-300 transition-all`}>
                        {children}
                    </div>
            </div>

        );
     }
     else{
        if(animate){
            setAnimate(false);
        }
     }


}

export default Modal; 