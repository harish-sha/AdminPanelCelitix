import React, { useState } from "react";
import QRCode from "qrcode";
import InputField from "../components/InputField";
import UniversalTextArea from "../components/UniversalTextArea";
import UniversalButton from "../components/UniversalButton";
import qrPlaceholder from "../../assets/images/QRcode.png";
import userPng from "../../assets/images/user.png";

const WhatsappQrCode = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [qrImage, setQrImage] = useState(qrPlaceholder);
  const [qrLink, setQrLink] = useState("https://wa.me/xxxxx?text=hello");

  const sendMessage = () => {
    if (message.trim()) {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }
  };

  const generateQRCode = async () => {
    if (phone) {
      const formattedMessage = encodeURIComponent(message);
      const url = `https://wa.me/${phone}?text=${formattedMessage}`;
      setQrLink(url);
      QRCode.toDataURL(url, (err, url) => {
        if (!err) {
          setQrImage(url);
        }
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrLink);
    alert("Copied to clipboard!");
  };

  return (
    <div style={{
      background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", width: "auto", display: "flex", gap: "15px"
    }}>
      <div className="w-4/12" style={{
        background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", gap: "15px"
      }}>
        <InputField
          label="WhatsApp QR Code Generator"
          id="whatsAppqrCodeGenerator"
          name="whatsAppQrCodeGenerator"
          placeholder="Ex.: 919876543210"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <UniversalTextArea
          label="Prefilled Message"
          id="PrefilledMessage"
          name="PrefilledMessage"
          placeholder="Ex.: Hello World!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          row="10"
        />
        <UniversalButton
          id="generateQrCodeBtn"
          name="generateQrCodeBtn"
          label="Generate QR Code"
          onClick={generateQRCode}
        />
      </div>
      <div className="w-4/12" style={{
        background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", gap: "15px"
      }}>
        <div style={{
          width: "100%", height: "100%", background: "#e5ddd5", borderRadius: "10px", padding: "10px", fontFamily: "Arial, sans-serif", position: "relative"
        }}>
          <div style={{
            display: "flex", alignItems: "center", background: "#075e54", padding: "10px", borderRadius: "8px 8px 0 0", color: "white"
          }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "white" }}>
              <img src={userPng} alt="User" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
            </div>
            <p style={{ margin: 0, paddingLeft: 10, fontSize: 14 }}>
              {phone ? `${phone}` : "919876543210"}
            </p>
            <div style={{ marginLeft: "auto", cursor: "pointer" }}>
              <i className="bi bi-three-dots-vertical"></i>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 px-2 " style={{ width: "100%" }}>
            <UniversalTextArea
              placeholder="Ex.: Hello World!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              readOnly="true"
            />
          </div>
        </div>
      </div>
      <div className="w-4/12" style={{
        background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", gap: "15px"
      }}>
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", border: "1px solid #ddd", padding: "0px" }}>
          {/* <QRCode value={qrLink} size={100} /> */}
          {qrImage && <img src={qrImage} alt="WhatsApp QR Code" className="w-full" />}
        </div>
        <InputField
          label="Your WhatsApp Click-To-Chat Link"
          id="whatsappclicktochatlink"
          name="whatsappclicktochatlink"
          placeholder="https://wa.me/xxxxx?text=hello"
          value={qrLink}
          readOnly="true"
        />
        <UniversalButton
          id="copytoclipboard"
          name="copytoclipboard"
          label="Copy to clipboard"
          onClick={copyToClipboard}
        />
        <UniversalButton
          id="openinwhatsapp"
          name="openinwhatsapp"
          label="Open in WhatsApp"
          onClick={() => window.open(qrLink, "_blank")}
        />
      </div>
    </div>
  );
};

export default WhatsappQrCode;


