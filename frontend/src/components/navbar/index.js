import "./styles.css";
import { useDispatch } from "react-redux";
import { appLogout } from "../../store/slices/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(appLogout());
    };

    return (
        <div className="navbar-container">
            <div className="navbar-left-items">
                <h2>Cloud Home</h2>
            </div>
            <div className="navbar-right-items" >
                <ul>
                
                </ul>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
