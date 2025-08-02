import React, { useState } from "react";
import QRCode from "qrcode"; // npm install qrcode
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/whatsapp/components/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import { TfiReload } from "react-icons/tfi";
import toast from "react-hot-toast";
import UniversalInstaButton from "@/instagram/components/UniversalInstaButton";

const IgMe = () => {
  const [username, setUsername] = useState("");
  const [referral, setReferral] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [finalUrl, setFinalUrl] = useState("");

  // Generate QR and URL
  const handleGenerateQR = async () => {
    if (!username.trim()) {
      toast.error("Please enter a valid username");
      return;
    }
    let url = `https://ig.me/${username}`;
    if (referral.trim()) {
      url += `?ref=${encodeURIComponent(referral.trim())}`;
    }

    setFinalUrl(url);
    try {
      const qr = await QRCode.toDataURL(url);
      setQrCodeUrl(qr);
    } catch (error) {
      console.error("QR generation failed", error);
    }
  };

  // Copy link
  const handleCopy = () => {
    if (!finalUrl) return toast.error("No link to copy");
    navigator.clipboard.writeText(finalUrl);
    toast.success("Link copied to clipboard!");
  };

  // Download QR
  const handleDownload = () => {
    if (!qrCodeUrl) return toast.error("No QR to download");
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      {/* Left Side Input Section */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-6 space-y-6 flex flex-col">
        <h2 className="text-xl font-semibold">Generate Instagram Short Link</h2>
        <InputField
          label="Instagram userName"
          placeholder="@username..."
          maxLength={20}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <UniversalTextArea
          label="Referral Parameter"
          placeholder="enter referral parameter"
          value={referral}
          onChange={(e) => setReferral(e.target.value)}
        />
        {/* <UniversalButton label="Generate Link" onClick={handleGenerateQR} /> */}
        <UniversalInstaButton onClick={handleGenerateQR} label="Generate Link" />
      </div>

      {/* Instagram Short Link Card */}
      <div className="w-full md:w-1/2  bg-white rounded-lg shadow-lg border p-6 text-center space-y-4">
        <h2 className="text-lg font-semibold">
          Here is your Instagram short link
        </h2>
        <button
          onClick={() => {
            setFinalUrl(""); // Clears the generated link
            setQrCodeUrl(""); // Clears the QR code
          }}
          className="absolute right-5 top-5 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          <TfiReload className="text-gray-600 text-lg" />
        </button>
        <p className="text-sm text-gray-600">
          Copy and share it on your social media, website, emails or anywhere
          you want to be contacted instantly by your customers.
        </p>

        {/* Instagram Link */}
        {finalUrl ? (
          <a
            href={finalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-medium text-lg"
          >
            {finalUrl.replace("https://", "")}
          </a>
        ) : (
          <p className="text-gray-400">No Link Yet</p>
        )}

        {/* QR Code */}
        <div className="flex justify-center">
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="QR Code" className="w-70 h-70 " />
          ) : (
            <div className="w-70 h-70 bg-gray-100 flex items-center justify-center rounded-md">
              <span className="text-gray-400 text-sm">No QR Generated</span>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500">
          FREE !! - Track links & much more,{" "}
          <span className="text-blue-500 cursor-pointer">Sign Up</span> now
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <UniversalButton label="Copy URL" onClick={handleCopy} />
          <UniversalButton label="Download QR" onClick={handleDownload} />
        </div>
      </div>
    </div>
  );
};

export default IgMe;
