import React from "react";

type InfoCardProp = {
    info : string|undefined;
    header:string;
}


const InfoCardAdmin = ({info , header}:InfoCardProp)=>{
    return(
        <div className="text-center bg-white    rounded-md  w-36 h-28 lg:w-80  lg:h-44 m-1 " id="container">
             
             <div className="p-2 " id="başlık">
                <h1 className="text-sm lg:text-lg ">{header}</h1>
             </div>

             <div className="p-2  text-sm lg:text-lg  "id="veri">
                {info} 
             </div>


        </div>

    );
}

export default InfoCardAdmin;