import React from "react";

type InfoCardProp = {
    info : string|undefined;
    header:string;
}


const InfoCardAdmin = ({info , header}:InfoCardProp)=>{
    return(
        <div className="text-center  bg-gradient-to-r from-amber-50 to-amber-200  p-5 h-fit rounded-md min-h-44 w-48 lg:w-60" id="container">
             
             <div className="py-3 " id="başlık">
                <h1 className="text-lg ">{header}</h1>
             </div>

             <div className="py-3  text-lg  "id="veri">
                {info} 
             </div>


        </div>

    );
}

export default InfoCardAdmin;