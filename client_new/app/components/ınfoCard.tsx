import React from "react";

type InfoCardProp = {
    info : string|undefined;
    header:string;
}


const InfoCard = ({info , header}:InfoCardProp)=>{
    return(
        <div className="text-start bg-white border-t-4 border-b-4 lg:border-l-4 lg:border-r-4 lg:border-t-0 lg:border-b-0 border-[#112850] w-fit min-w-54 p-3 h-fit rounded-md min-h-40  lg:min-w-72 lg:min-h-40 " id="container">
             
             <div className="py-3 lg:py-2  border-b-2 border-gray-200" id="başlık">
                <h1 className="text-lg font-bold ">{header}</h1>
             </div>

             <div className="py-3 lg:py-2   font-light text-2xl" id="veri">
                {info} 
             </div>


        </div>

    );
}

export default InfoCard;