
type ToggleButtonProps = {
    isOn: boolean;
  };

const ToggleButton = ({isOn}:ToggleButtonProps)=>{

return(
    
    <div  id="Toggle-swtich" className={`${isOn?'bg-green-500':'bg-red-600'} w-10 h-5 rounded-full cursor-pointer`}>
        

        <div id="switch-ball" className={`${isOn?'translate-x-5':'translate-x-0'} w-5 h-5 rounded-full border-1 border-gray-500 bg-white transition-transform duration-300`}>

        </div>

    </div>

);

}

export default ToggleButton;