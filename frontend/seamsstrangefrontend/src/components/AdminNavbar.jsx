import { Link } from "react-router-dom";
import "../styles/AdminNavBar.css"
import { useNavigate } from "react-router-dom";
import instance from "../api";

const AdminNavBar = ({appAuthHandler}) =>{

    const navigate = useNavigate();
    const handleLogout = () =>{
        instance.post('/api/logout/').then(()=>{ 
            appAuthHandler(false);
            navigate('/')
        }).catch((error) => {
            appAuthHandler(false);
            navigate('/admin')
        });}



    return(
    <div className="adminNavContainer">
        <h2 className="adminNavHeader1">Admin</h2>
        <h3 className="adminNavHeader2">Sections</h3>
        <nav className="adminNavigationBar">
            <ul className="adminNavigationList">
                <li><Link to="/admin/items/" className="adminNavLink">My Items</Link></li>
                <li><Link to="/admin/tags/" className="adminNavLink">My Tags</Link></li>
                <li><Link to="/admin/socials/" className="adminNavLink">My Socials</Link></li>
                <li className="adminLogout" onClick={handleLogout}>Logout</li>
            </ul>
        </nav>
    </div>
    );
}
export default AdminNavBar;