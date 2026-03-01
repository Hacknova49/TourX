function Footer(){
    return(
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-top">

                    <div className="column1">
                        <h4>TOUR-X</h4>
                        <p>Your trusted travel partner for unforgettable journeys.</p>
                    </div>

                    <div className="coulmn2">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>

                    <div className="column3">
                        <h4>Contact</h4>
                        <p>Email: support@tourx.com</p>
                        <p>Phone: +1 (123) 456-7890</p>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Tour-X. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}
export default Footer;