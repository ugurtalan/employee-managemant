import React from "react";

type InfoCardProp = {
    info : string|undefined;
    header:string;
}


const InfoCard = ({info , header}:InfoCardProp)=>{
    return(
        <div className="text-center shadow-md shadow-amber-100 bg-gradient-to-r from-amber-100 to-amber-200 w-fit p-4 h-fit rounded-md min-h-56 lg:min-w-72 lg:min-h-40 " id="container">
             
             <div className="py-3 lg:py-2 " id="başlık">
                <h1 className="text-lg">{header}</h1>
             </div>

             <div className="py-3 lg:py-2  text-lg" id="veri">
                {info} 
             </div>


        </div>

    );
}

export default InfoCard;