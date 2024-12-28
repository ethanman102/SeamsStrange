import { Link } from "react-router-dom";
import "../styles/NavBar.css"

const NavBar = () =>{

    return(
        <nav className="navigationBar">
            <ul className="navigationList">
                <li><Link to="/" className="navLink">Seams Strange</Link></li>
                <li><Link to="/items/" className="navLink">Items</Link></li>
                <li><Link to="/contact/" className="navLink">Contact</Link></li>
                <li><Link to="/admin/" className="navLink">Admin</Link></li>
            </ul>
        </nav>

    );
}
export default NavBar;