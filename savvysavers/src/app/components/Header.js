import Link from 'next/link';
import './Header.css';
import Image from 'next/image';

const Header = () => {
    return (
        <div className="header">
            <h1 className="logo"> <Image
              src="/logo.png"  
              alt = "Company logo"
              width={150}       
              height={150}       
              className="logo"  
            /></h1>
            <div className="links">
                <Link href="/">HOME</Link>
                <Link href="/fininfo">FINANCIAL INFORMATION</Link>
                <Link href="/faqs">SAVING + SPENDING TIPS</Link>
            </div>
        </div>
    );
}

export default Header;
