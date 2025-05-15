import React from 'react';

const AboutUs = () => {
    return (
        <section className=" py-16 px-4 md:px-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                {/* Left Text Content */}
                <div>
                    <h4 className="text-primary text-sm font-semibold mb-2">How It Started</h4>
                    <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                        Our Dream is <br />
                        Sustainable Shopping Transformation
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Green Cart was created by <strong>Hamza Janzaib</strong>, a passionate MERN stack developer from Pakistan.
                        This website was built as part of a classroom assignment with the goal of creating a user-friendly,
                        eco-conscious shopping experience.
                        <br /><br />
                        With a focus on clean design, modern technologies, and meaningful purpose, Hamza developed Green Cart —
                        a platform to inspire and support sustainable living. Whether you're a casual shopper or a green lifestyle enthusiast,
                        this site is designed to make your experience simple, informed, and environmentally friendly.
                    </p>

                    {/* Contact Info */}
                    <div className="mt-6 text-sm text-gray-600">
                        <p>Contact: <a href="mailto:hbah@gmail.com" className="text-blue-500 underline">hbah@gmail.com</a></p>
                        <p>
                            LinkedIn:
                            <a
                                href="https://www.linkedin.com/in/hamza-janzaib-6a6870318/?originalSubdomain=pk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline ml-1"
                            >
                                Hamza Janzaib
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Image & Stats */}
                <div className="space-y-6">
                    <div className="rounded-xl overflow-hidden">
                        <img
                            src="https://img.freepik.com/free-photo/cooperation-team-concept_1194-616991.jpg?semt=ais_hybrid&w=740"
                            alt="Green Cart Team"
                            className="w-full h-72 object-cover rounded-xl shadow-md"
                        />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <h3 className="text-2xl font-bold text-gray-900">Fresher</h3>
                            <p className="text-sm text-gray-600">Years Experience</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <h3 className="text-2xl font-bold text-gray-900">5</h3>
                            <p className="text-sm text-gray-600">Projects Built</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <h3 className="text-2xl font-bold text-gray-900">Coming Soon</h3>
                            <p className="text-sm text-gray-600">Happy Users</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <h3 className="text-2xl font-bold text-gray-900">100%</h3>
                            <p className="text-sm text-gray-600">Class Grade 😄</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
