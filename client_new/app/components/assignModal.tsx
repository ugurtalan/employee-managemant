import { useState, useEffect } from "react";


type Props = {
    children : React.ReactNode;
    isOpen : boolean;
}
const  AssignModal : React.FC<Props> = ({children,isOpen})=>{
    const [animate,setAnimate] = useState<boolean>(false);
        useEffect(()=>{
            console.log(animate);
    },[animate]);
        if(isOpen){
                setTimeout(() => {
                    setAnimate(true);
                }, 100);
    
               
            return(
                <div className={` fixed  inset-0 bg-[rgba(78,78,35,0.50)]  flex justify-center items-center z-50  `}>
                        <div className={` bg-white p-5 mb-50 relative rounded-md ${animate?'scale-100':'scale-0'} duration-300 transition-all`}>
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


export default AssignModal;