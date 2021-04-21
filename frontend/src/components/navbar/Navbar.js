import "./navbar.css";

const Navbar = () => {
    
    return (
        <div className='navBar' >
            <header className="innerNav">
                <ul>
                    <li>
                        <h1>Just Go With Fit</h1>
                        </li>
                    <li className="logInBtns">
                        <ul role="list">
                            <li><a href={"#"}>Sign Up</a></li>
                            <li className="logIn"><a href={"#"}>Log In</a></li>
                        </ul>
                    </li>
                </ul>
            </header>
        </div>
    )
}



// CSS in JS
// const headingStyle = {
//     color: 'darkGrey
// }

export default Navbar
