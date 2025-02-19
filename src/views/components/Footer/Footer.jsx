import React from "react";

import './Footer.css';  

const Footer = () => {
    return (
        <>
        <div>
            <footer className="footer d-flex flex-wrap justify-content-between align-items-center my-4 border-top">
                <p className="col-md-4 mb-0 text-body-secondary">© 2024 Company, Inc</p>

                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item">
                        <a href="/" className="nav-link px-2 text-body-secondary">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="recipes" className="nav-link px-2 text-body-secondary">All recipes</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-body-secondary">About</a>
                    </li>
                </ul>
            </footer>
        </div>
        </>
    );
}

export default Footer;