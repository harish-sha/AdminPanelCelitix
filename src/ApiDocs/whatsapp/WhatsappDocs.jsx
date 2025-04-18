// import React from 'react'

// const WhatsappDocs = () => {
//   return (
//     <div>WhatsappDocs</div>
//   )
// }

// export default WhatsappDocs

// App.jsx
import React from "react";
import Scrollspy from "react-scrollspy";
import { Link, Element } from "react-scroll";
import "./whatsapp.css"; // for indicator styling

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "auth", title: "Authentication" },
  { id: "endpoints", title: "API Endpoints" },
  { id: "errors", title: "Error Handling" },
];

export default function WhatsappDocs() {
  return (
    <div className="flex min-h-screen">
      {/* Table of Contents */}
      <aside className="w-60 p-6 sticky top-0 h-screen bg-gray-100 shadow-md">
        <Scrollspy
          items={sections.map((s) => s.id)}
          currentClassName="active"
          className="flex flex-col gap-4 toc"
        >
          {sections.map((section) => (
            <li key={section.id} className="flex items-center gap-2">
              <span className="dot" />
              <Link
                to={section.id}
                smooth={true}
                duration={500}
                offset={-60} // adjust if you have fixed header
              >
                {section.title}
              </Link>
            </li>
          ))}
        </Scrollspy>
      </aside>

      {/* Content Area */}
      <main className="flex-1 px-10 py-20 space-y-32">
        {sections.map((section) => (
          <Element name={section.id} key={section.id} id={section.id}>
            <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
            <p className="text-gray-700 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              vitae turpis nec lacus volutpat dictum. Cras laoreet lacus nec
              orci volutpat convallis. Nulla facilisi. Proin ut nunc id purus
              fermentum consequat.
            </p>
          </Element>
        ))}
      </main>
    </div>
  );
}
