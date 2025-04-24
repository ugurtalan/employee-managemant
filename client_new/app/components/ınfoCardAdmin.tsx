import React from "react";

type InfoCardProp = {
    info : string|undefined;
    header:string;
}


const InfoCardAdmin = ({info , header}:InfoCardProp)=>{
    return(
        <div className="text-start bg-white border-l-4 border-r-4 border-[#112850]   p-2  rounded-md  w-36 h-28 lg:w-80  lg:h-44 m-1 " id="container">
             
             <div className="p-2 border-b-2 border-gray-200 " id="başlık">
                <h1 className="text-sm lg:text-lg font-bold">{header}</h1>
             </div>

             <div className="flex items-center justify-center p-2 text-sm lg:text-2xl  "id="veri">
                {info} 
             </div>


        </div>

    );
}

export default InfoCardAdmin;