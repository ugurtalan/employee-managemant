import Swal, { SweetAlertIcon } from "sweetalert2";

type Success ={
title:string;
text:string;
icon:SweetAlertIcon;
};



export const Warn =({ title,text, icon }: Success)=>{

    Swal.fire({
        title:title,
        text:text,
        icon:icon
    })        
}

type Delete ={
    text:string;
    icon:SweetAlertIcon;
    onDelete: ()=>void;
    };
    

export const  Delete = ({text,onDelete,icon}:Delete)=>{
    Swal.fire({
        text:text,
        icon:icon,
        showCancelButton:true,
        showConfirmButton:true,
        confirmButtonText:"Sil",
        confirmButtonColor:'red',
    }).then((result)=>
    {
        if(result.isConfirmed){
            onDelete();

        }
        else{
            
        }
    }
    
    )    
}
