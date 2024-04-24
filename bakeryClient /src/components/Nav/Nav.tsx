import useWindowDimensions from "../../hooks/UseWindowDimensions"
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

export default function Nav() {
    const { width } = useWindowDimensions();
    const widthBoundary = 768;
    return (
        width < widthBoundary 
            ?
            <NavMobile />
            :
            <NavDesktop />
    )
}