import { useState } from "react"
import { ClipLoader } from "react-spinners"
import { LengthType } from "react-spinners/helpers/props";

type Callback = (...args: any[]) => Promise<void>
type ErrorCallback = (error: any | unknown) => void;

function useLoadingSpinner(callback: Callback, errorCallback: ErrorCallback){
  const [isLoading,setLoading] = useState(false)

  const callbackWithLoading = async (...args: any[]) => {
    try{
      setLoading(true)
      await callback(...args) 
    }
    catch(error: unknown){
      if(errorCallback)errorCallback(error)
    }
    finally{
      setLoading(false)
    }
  }
  
  const loadingSpinner = (size: LengthType) => {
    return isLoading ? <ClipLoader size={size} /> : null
  }

  return [loadingSpinner,callbackWithLoading,isLoading]
}

export default useLoadingSpinner