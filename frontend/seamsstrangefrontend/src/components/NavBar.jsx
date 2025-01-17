import { Link } from "react-router-dom";
import "../styles/NavBar.css"

const NavBar = () =>{

    return(
        <nav className="navigationBar">
            <ul className="navigationList">
                <li><Link to="/" className="navLink homepageNav">Seams <br/><span className="strangeNavText">Strange</span></Link></li>
                <li><Link to="/items/" className="navLink">Shop</Link></li>
                <li><Link to="/contact/" className="navLink">Contact</Link></li>
                <li><Link to="/admin/" className="navLink">Admin</Link></li>
            </ul>
        </nav>

    );
}
export default NavBar;