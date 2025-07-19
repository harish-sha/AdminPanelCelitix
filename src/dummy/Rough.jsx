import React, { useState } from "react";

const CLIENT_ID = "YOUR_INSTAGRAM_APP_CLIENT_ID";
const REDIRECT_URI = "https://yourwebsite.com/auth/instagram/callback"; // must match what you set in your Instagram App
const SCOPES = "user_profile,user_media"; // set scopes based on your needs
const AUTH_URL = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${SCOPES}&response_type=code`;

export default function InstagramConnect() {
  const [authCode, setAuthCode] = useState(null);
  const [error, setError] = useState(null);

  const handleConnect = () => {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // Open popup for Instagram login
    const authWindow = window.open(
      AUTH_URL,
      "InstagramLogin",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    // Listen for messages from the popup
    const checkPopup = setInterval(() => {
      try {
        // If the popup was closed
        if (!authWindow || authWindow.closed) {
          clearInterval(checkPopup);
          return;
        }

        // Check if the popup has redirected back to our redirect_uri
        if (authWindow.location.href.indexOf(REDIRECT_URI) !== -1) {
          const urlParams = new URL(authWindow.location.href).searchParams;
          const code = urlParams.get("code");
          const errorParam = urlParams.get("error");

          if (code) {
            setAuthCode(code);
          } else if (errorParam) {
            setError(errorParam);
          }

          // Close the popup and stop the check
          authWindow.close();
          clearInterval(checkPopup);
        }
      } catch (err) {
        // Ignore cross-origin errors until the redirect happens
      }
    }, 500);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold mb-3">Connect Instagram</h2>
      <p className="text-sm text-gray-500 mb-4">
        Click the button below to connect your Instagram account.
      </p>
      <button
        onClick={handleConnect}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Connect with Instagram
      </button>

      {authCode && (
        <p className="text-green-600 text-sm mt-4">
          Successfully received code: {authCode}
        </p>
      )}
      {error && (
        <p className="text-red-600 text-sm mt-4">
          Authentication failed: {error}
        </p>
      )}
    </div>
  );
}
