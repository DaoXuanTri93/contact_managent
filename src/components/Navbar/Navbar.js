import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>
                    <i className="fa fa-phone text-warning" ></i>
                    <span className="fw-bold text-primary mx-2">Contacts</span>
                    <span className="fw-bold text-danger">Manager</span>
                </Link>
                <Link className="navbar-brand" to={'/'}>
                    <span className="text-danger">Trí Đào</span>
                    <span className="text-dist ms-1">Log Out</span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;