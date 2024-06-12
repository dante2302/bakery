/**
 * A custom React hook that combines loading state management with a loading spinner component.
 * 
 * @param callback The asynchronous callback function to execute when loading.
 * @param errorCallback An optional error callback function to handle errors.
 * @returns {[LoadingSpinner, Callback, boolean]} An array containing:
 *   - `LoadingSpinner` (function): A function component that renders a loading spinner.
 *   - `callbackWithLoading` (function): A wrapped version of the original callback function that handles loading state.
 *   - `isLoading` (boolean): A state variable indicating whether the operation is in progress.
 * 
 * @example
 * // Usage in a functional component:
 * import React from 'react';
 * import useLoadingSpinner from './useLoadingSpinner';
 * 
 * function ExampleComponent() {
 *     function fetchData(){
 *        ...do something async
 *     }
 * 
 *     const [LoadingSpinner, fetchDataWithLoading, isLoading] = useLoadingSpinner(fetchData, handleFetchError);
 *     
 *     const handleButtonClick = () => {
 *         fetchDataWithLoading();
 *     };
 * 
 *     return (
 *         <div>
 *             <button onClick={handleButtonClick} disabled={isLoading}>Fetch Data</button>
 *             {isLoading && <LoadingSpinner color="#000" size={50} />} 
 *         </div>
 *     );
 * }
 */

import { useState } from "react"
import { ClipLoader } from "react-spinners"
import { LoaderSizeMarginProps, LoaderSizeProps } from "react-spinners/helpers/props";

type Callback = (...args: any[]) => Promise<void>
type ErrorCallback = (error: any | unknown) => void;
type LoadingSpinner = ({ color, size }: LoaderSizeProps) => JSX.Element;

function useLoadingSpinner(callback: Callback, errorCallback?: ErrorCallback): [LoadingSpinner, Callback, boolean]
{
  const [isLoading,setLoading] = useState(false)

  const callbackWithLoading = async (...args: any[]) => {
    try{
      setLoading(true);
      await callback(...args);
    }
    catch(error: unknown){
      if(errorCallback)errorCallback(error)
    }
    finally{
      setLoading(false);
    }
  }
  
  const LoadingSpinner = (props: LoaderSizeMarginProps) => {
    return <ClipLoader {...props}/> 
  }

  return [LoadingSpinner, callbackWithLoading, isLoading]
}

export default useLoadingSpinner