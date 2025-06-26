import React, { useState } from 'react';
import axios from 'axios';

const GptConfiguration = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [mainPurpose, setMainPurpose] = useState('');
  const [services, setServices] = useState([]);

  // Handle URL fetch and GPT analysis
  const handleUrlSubmit = async () => {
    if (!url) {
      setMessage('Please enter a valid URL.');
      return;
    }
    setMessage('Fetching content and analyzing main purpose and services...');
    try {
      const res = await fetch(url);
      const text = await res.text();

      // Ask GPT for main purpose and services offered
      const analysisRes = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are an assistant that extracts the main work and services from website content.' },
            {
              role: 'user',
              content: `Please read the following website content and provide:
1) A single sentence describing the website's main work or purpose.
2) A bullet list of the core services or products offered by this website.

Website Content Start:\n${text.slice(0, 2000)}\nWebsite Content End.`
            }
          ],
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const reply = analysisRes.data.choices[0].message.content;
      const lines = reply.split('\n').map(l => l.trim()).filter(Boolean);

      // First line is purpose, rest are services
      setMainPurpose(lines[0]);
      const serviceLines = lines.slice(1).map(l => l.replace(/^[-*\d\.]+\s*/, '').trim());
      setServices(serviceLines);
      setMessage('Analysis complete.');
    } catch (err) {
      console.error(err);
      setMessage('Failed to analyze content.');
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 bg-gradient-to-r from-blue-50 to-white">
      <section className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Website Analyzer</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={handleUrlSubmit}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Analyze Website
          </button>
        </div>
        {message && <p className="mt-3 text-gray-700">{message}</p>}

        {mainPurpose && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">Main Purpose:</h3>
            <p className="whitespace-pre-line text-gray-800">{mainPurpose}</p>
          </div>
        )}

        {services.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">Services Offered:</h3>
            <ul className="list-disc list-inside text-gray-800">
              {services.map((svc, idx) => (
                <li key={idx}>{svc}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default GptConfiguration;
