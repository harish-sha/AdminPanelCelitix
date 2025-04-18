// import React from 'react'

// const DummyApi = () => {
//   return (
//     <div>
//     </div>
//   )
// }

// export default DummyApi

import React, { useEffect, useState } from "react";
import { Link, Element } from "react-scroll";

const sections = [
    { id: "intro", title: "Introduction" },
    { id: "auth", title: "Authentication" },
    { id: "endpoints", title: "API Endpoints" },
    { id: "errors", title: "Error Handling" },
];

const DummyApi = () => {
    const [activeSection, setActiveSection] = useState("intro");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -55% 0px", // triggers when center of section enters
                threshold: 0,
            }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar TOC */}
            <aside className="w-64 bg-gray-100 p-6 overflow-y-auto sticky top-0 h-screen border-r">
                <ul className="space-y-4">
                    {sections.map((section) => (
                        <li key={section.id} className="flex items-center gap-2">
                            <span
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === section.id ? "bg-blue-600 scale-110" : "bg-gray-400"
                                    }`}
                            ></span>
                            <Link
                                to={section.id}
                                smooth={true}
                                duration={500}
                                offset={-20}
                                className={`cursor-pointer ${activeSection === section.id ? "text-blue-600 font-semibold" : "text-gray-700"
                                    }`}
                            >
                                {section.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-scroll p-10 space-y-32 h-screen">
                {sections.map((section) => (
                    <Element name={section.id} key={section.id}>
                        <section id={section.id}> {/* 👈 make sure ID and name match */}
                            <h2 className="text-4xl font-bold mb-6">{section.title}</h2>
                            <p className="text-lg text-gray-700 leading-8">
                                {Array(30)
                                    .fill(
                                        `This is the ${section.title} section. It contains detailed API documentation with examples and instructions. `
                                    )
                                    .join(" ")}
                            </p>
                        </section>
                    </Element>

                ))}
            </main>
        </div>
    );
};

export default DummyApi;
