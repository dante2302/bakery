import desktopImg from "../../assets/404.png";
import mobileImg from "../../assets/404-mobile.jpg";
import useWindowDimensions from "../../hooks/UseWindowDimensions";
import "./styles/Page404.scss";

export default function Page404(){
    const widthBoundary = 768;
    const {width} =  useWindowDimensions();
    return(
        <img 
            className={`${width < widthBoundary ? "width100" : "width80"} img404`} 
            src={width < widthBoundary ? mobileImg : desktopImg}
        />
    )
}