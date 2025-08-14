import React from "react";
import { useTheme } from "./context/ThemeContext";

const Quickstart = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={` ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-[#eeeeee] text-black"
      } `}
    >
      <div className="max-w-4xl mx-auto">
        <div>
          <h1 className="text-center text-3xl font-bold ">
            Developer platform
          </h1>
        </div>

<div className="p-6">
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-md p-6 mb-12`}
        >
          <div >
            <h2 className="text-2xl font-semibold mb-2">
              Developer quickstart
            </h2>
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-4`}
            >
              Set up your environment and make your first API request in minutes
            </p>
          </div>

          <div>
            <div className="bg-gray-700 rounded p-4 text-gray-200 font-mono text-sm overflow-x-auto flex items-center justify-center flex-col">
              <div className="mb-2">
                <span className="text-white">API_URL</span> ={" "}
                <span className="text-white">
                  "https://api.example.com/data"
                </span>
              </div>
              <div className="mb-2">
                <span className="text-white">API_KEY</span> ={" "}
                <span className="text-white">"your_api_key"</span>
              </div>
              <div className="mb-4">
                <span>api_send_get_request():</span>
                <div className="pl-4">
                  <span>headers = &#123;</span>
                  <div className="pl-4">
                    <div>"Authorization": f"Bearer &#123;API_KEY&#125;",</div>
                    <div>"Content-Type": "application/json"</div>
                  </div>
                  <span>&#125;</span>
                </div>
              </div>
              <div>
                <span>
                  response = requests.get(f"&#123;API_URL&#125;",
                  headers=headers)
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Meet the models
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            <div className="bg-gray-600 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Whatsapp</h3>
              <p className="text-sm">
                Our high intelligence flagship model for complex, multi-step
                tasks.
              </p>
            </div>

            <div className="bg-gray-600 text-white p-4 rounded">
              <h3 className="font-bold mb-2">SMS</h3>
              <p className="text-sm">
                Our affordable small model for basic, lightweight tasks.
              </p>
            </div>

            <div className="bg-gray-600 text-white p-4 rounded">
              <h3 className="font-bold mb-2">RCS</h3>
              <p className="text-sm">
                A new preview series for advanced reasoning.
              </p>
            </div>

            <div className="bg-gray-600 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Click 2 Call</h3>
              <p className="text-sm">
                Quick insights into emerging model capabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Start building */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Start building
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            <div className="bg-green-600 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Distillation</h3>
              <p className="text-sm">
                Evaluate and fine-tune models using production logs.
              </p>
            </div>

            <div className="bg-yellow-500 text-black p-4 rounded">
              <h3 className="font-bold mb-2">Realtime</h3>
              <p className="text-sm">
                Build low-latency applications with real-time performance.
              </p>
            </div>

            <div className="bg-blue-400 text-black p-4 rounded">
              <h3 className="font-bold mb-2">Structured Outputs</h3>
              <p className="text-sm">
                Ensure model responses adhere to your supplied JSON schema.
              </p>
            </div>

            <div className="bg-red-500 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Fine-tuning</h3>
              <p className="text-sm">
                Adapt models to your specific use case with your data.
              </p>
            </div>
          </div>
        </div>

        {/* Explore our guides */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Explore our guides
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            <div className="bg-gray-700 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Prompt engineering</h3>
              <p className="text-sm">Get better results from LLMs.</p>
            </div>

            <div className="bg-gray-700 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Production best practices</h3>
              <p className="text-sm">
                Transition from prototype to production.
              </p>
            </div>

            <div className="bg-gray-700 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Safety best practices</h3>
              <p className="text-sm">Make sure your application is safe.</p>
            </div>

            <div className="bg-gray-700 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Latency optimization</h3>
              <p className="text-sm">
                Improve latency across multiple use cases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quickstart;
