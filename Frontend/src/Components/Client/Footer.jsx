import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Contact", path: "/contact" },
        { name: "About", path: "/about" },
    ];
    return (
        <div>
            <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full bg-primary/10">
                <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                    <div className="md:max-w-96">
                        <img
                            className="h-9"
                            src={assets.logo}
                            alt="logo"
                        />
                        <p className="mt-6 text-sm">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                    </div>
                    <div className="flex-1 flex items-start md:justify-end gap-20">
                        <div>
                            <h2 className="font-semibold mb-5 text-primary">Company</h2>
                            <div>
                                {navLinks.map((link) => (
                                    <Link key={link.path} to={link.path} className="text-gray-900 hover:text-primary-dull flex flex-col">
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="font-semibold mb-5 text-primary">Get in touch</h2>
                            <div className="text-sm space-y-2">
                                <p>+92 3148843821</p>
                                <p>Hbahi024@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="pt-4 text-center text-xs md:text-sm pb-5">
                    Copyright {new Date().getFullYear()} © Company Hamza Janzaib. All Right Reserved.
                </p>
            </footer>
        </div>
    );
};

export default Footer;
