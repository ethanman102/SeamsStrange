import { Link } from "react-router-dom";
import "../styles/AdminNavbar.css"

const AdminNavBar = () =>{


    return(
    <div className="adminNavContainer">
        <h2 className="adminNavHeader1">Admin</h2>
        <h3 className="adminNavHeader2">Sections</h3>
        <nav className="adminNavigationBar">
            <ul className="adminNavigationList">
                <li><Link to="/admin/items/" className="adminNavLink">My Items</Link></li>
                <li><Link to="/admin/tags/" className="adminNavLink">My Tags</Link></li>
            </ul>
        </nav>
    </div>
    );
}
export default AdminNavBar;