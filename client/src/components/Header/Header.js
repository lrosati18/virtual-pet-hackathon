import {Link} from "react-router-dom";
import "./Header.scss"
const Header=()=>{
    return (<header className="navbar">
    <div className="navbar__logo">PetsHome</div>
    <div className="site-intro">
    <h1 className="site-intro__title">Welcome to Pets Home!</h1>
    <p className="site-intro__text">
        Dive into the digital world of delightful dogs! Pick your paw friend, name them, dress them up, feed them, and have a pawsome time playing together - all online. Adopt your digital pet today and start the tail-wagging adventure!
    </p>
</div>
  </header>)
}
export default Header;

