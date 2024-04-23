import emailSvg from "../../assets/email.svg"

export default function Nav(){
    return(
        <nav>
            <div className="upper-nav">

                <div>
                    <span>Контакт на този имейл</span>
                    <img src={emailSvg} alt="Email: "/>
                </div>
            </div>
            <div className="lower-nav">

            </div>
        </nav>
    )
}