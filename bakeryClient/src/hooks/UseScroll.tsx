/**
 * A custom React hook that tracks the vertical scroll position of the window.
 * 
 * @returns {[number, React.Dispatch<React.SetStateAction<number>>]} An array containing:
 *   - `verticalOffset` (number): The current vertical scroll position of the window.
 *   - `setVerticalOffset` (React.Dispatch<React.SetStateAction<number>>): 
 *          A function to manually set the vertical scroll position.
 * 
 * @example
 * // Usage in a functional component:
 * import React from 'react';
 * import UseScroll from './UseScroll';
 * 
 * function ScrollComponent() {
 *     const [verticalOffset, setVerticalOffset] = UseScroll();
 * 
 *     return (
 *         <>
 *             <p>Current scroll position: {verticalOffset}px</p>
 *             <button onClick={() => setVerticalOffset(0)}>Reset Scroll</button>
 *         </>
 *     );
 * }
 */

import { useEffect, useState } from "react";

export default function UseScroll(): [number, React.Dispatch<React.SetStateAction<number>>]
{
    const [verticalOffset, setVerticalOffset] = useState(0);
    function handleScroll()
    {
        const position = window.scrollY;
        setVerticalOffset(position);
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => {window.removeEventListener("scroll", handleScroll);};
    }, []);
    return [verticalOffset, setVerticalOffset];
}