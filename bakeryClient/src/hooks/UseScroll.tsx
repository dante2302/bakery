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