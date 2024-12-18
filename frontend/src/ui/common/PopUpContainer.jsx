import React from 'react'
import { usePopUp } from "../../store/usePopUp";
import { PopUps } from '../../lib/helper';
const PopUpContainer = () => {
    const CurrentPopUp = usePopUp( state => state.currentPopUp);
    if(!CurrentPopUp) return null;
  return (
    <div className='absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center'>
        <CurrentPopUp/>
    </div>
  )
}

export default PopUpContainer