import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import InputWithLabel from "../components/InputWithLabel";
import InputField from "../components/InputField";
import ColorPicker from '../components/colorPicker';
import RadioGroupFieldupdown from "../components/RadioGroupFieldupdown";
import UniversalTextArea from "../components/UniversalTextArea";
import UniversalButton from "../components/UniversalButton";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// import './chatWidget.css';

const WhatsappChatWidget = () => {
  // State for inputs and chat toggle
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [buttonBg, setButtonBg] = useState("#008000");
  const [ctaText, setCtaText] = useState("Chat With Us");
  const [brandName, setBrandName] = useState("Ram");
  const [brandSubtitle, setBrandSubtitle] = useState("Online");
  const [brandcolorBg, setBrandcolorBg] = useState("#008000");
  const [brandImage, setBrandImage] = useState("https://via.placeholder.com/50x50");
  const [widgetctaText, setWidgetctaText] = useState("Start Chat");
  const [prefilledMessage, setPrefilledMessage] = useState("Hello! How can I assist you today?");
  const [isOpen, setIsOpen] = useState(false);
  const [marginBottom, setMarginBottom] = useState(25);
  const [marginLeft, setMarginLeft] = useState(0);
  const [marginRight, setMarginRight] = useState(0);
  const [borderRadius, setBorderRadius] = useState(4);
  const [selectedOption, setSelectedOption] = useState("option2");
  const [selectedOpenWidget, setSelectedOpenWidget] = useState("option2");
  const [selectedreopenwidget, setSelectedReopenWidget] = useState("option2");
  const [chatButtonPosition, setChatButtonPosition] = useState("option1");
  // Toggle chat popup
  const toggleChat = () => setIsOpen(!isOpen);

  const fetchRadioOptions = () => [
    { value: "option1", label: "Bottom-Left" },
    { value: "option2", label: "Bottom-Right" },
  ];
  // Handler for radio button change
  const handlePositionChange = (event) => {
    setChatButtonPosition(event.target.value);
  };


  const openwidgetonmobile = [
    { value: "option1", label: "Yes" },
    { value: "option2", label: "No" },
  ];
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log("Selected Option:", event.target.value);
  };

  const openwidget = [
    { value: "option1", label: "Yes" },
    { value: "option2", label: "No" },
  ];
  const handleOptionChange2 = (event) => {
    setSelectedOpenWidget(event.target.value);
    console.log("Selected Option:", event.target.value);
  };

  const reopenwidget = [
    { value: "option1", label: "Yes" },
    { value: "option2", label: "No" },
  ];
  const handleOptionChange3 = (event) => {
    setSelectedReopenWidget(event.target.value);
    console.log("Selected Option:", event.target.value);
  };


  return (
    <Box sx={{ margin: "auto", padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2, position: "relative" }}>
      {/* Responsive Layout for 50-50 Split */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 3 }
        }}
      >
        {/* Left Section (Settings Panel) */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            backgroundColor: "#ffffff",
            padding: 2,
            borderRadius: 2,
            boxShadow: 1
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              backgroundColor: "#E6F4FF",
              color: "#000",
              fontWeight: "600",
              fontSize: "16px",
              padding: "3px",
              borderRadius: "5px",
              mb: 2
            }}
          >
            CHAT BUTTON SETTING
          </Typography>

          {/* Input Fields */}
          <InputWithLabel id="whatsappnumber" name="whatsappnumber" label="WhatsApp Phone No." placeholder="Enter number with Country Code" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />

          <ColorPicker label="Button Background" id="buttonbackground" name="buttonbackground" value={buttonBg} onChange={setButtonBg} />

          <InputWithLabel id="ctatext" name="ctatext" label="CTA Text:" placeholder="Enter CTA Text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />

          <Box display="flex" alignItems="center" gap={2} sx={{ mb: 1 }}>
            <InputField
              label="Margin Bottom "
              id='marginbottom'
              name='marginbottom'
              type="number"
              value={marginBottom}
              onChange={(e) => setMarginBottom(Number(e.target.value))}
            />
            <InputField
              label="Margin Left"
              id='marginleft'
              name='marginleft'
              type="number"
              value={marginLeft} onChange={(e) => setMarginLeft(Number(e.target.value))}
            />
            <InputField
              label="Margin Right"
              id='marginright'
              name='marginright'
              type="number"
              value={marginRight} onChange={(e) => setMarginRight(Number(e.target.value))} sx={{ width: "100%" }}
            />
            <InputField
              label="Border Radius"
              id='borderradius'
              name='borderradius'
              type="number"
              value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))}
            />
          </Box>


          <UniversalTextArea
            label="Default Pre-filled Message"
            name="defaultprefilledmessage"
            id="defaultprefilledmessage"
            placeholder="Hi, I need more information."
          />



          <RadioGroupFieldupdown
            label="Chat Button Position"
            id="chatbuttonposition"
            name="ChatButtonPosition"
            options={fetchRadioOptions()}
            value={chatButtonPosition}
            onChange={handlePositionChange}
          />

        </Box>

        {/* Right Section (Chat Popup Preview) */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            backgroundColor: "#ffffff",
            padding: 2,
            borderRadius: 2,
            boxShadow: 1
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              backgroundColor: "#E6F4FF",
              color: "#000",
              fontWeight: "600",
              fontSize: "16px",
              padding: "3px",
              borderRadius: "5px",
              mb: 2
            }}
          >
            Chat Widget
          </Typography>

          {/* Chat Popup */}
          <InputWithLabel id="brandname" name="brandname" label="Brand Name:" placeholder="Enter Brand Name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          <InputWithLabel id="brandsubtitle" name="brandsubtitle" label="Brand Subtitle:" placeholder="Enter Brand Subtitle" value={brandSubtitle} onChange={(e) => setBrandSubtitle(e.target.value)} />
          <ColorPicker label="Brand Color" id="brandcolor" name="brandcolor" value={brandcolorBg} onChange={setBrandcolorBg} />
          <Box display="flex" alignItems="center" gap={2} sx={{ mb: 1 }}>
            <InputField label="Brand Image Url" id="brandimage" name="brandimage" value={brandImage} onChange={(e) => setBrandImage(e.target.value)}
            />
            <InputField label="Widget CTA Text" id="widgetctatext" name="widgetctatext" value={widgetctaText} onChange={(e) => setWidgetctaText(e.target.value)}
            />
          </Box>
          <UniversalTextArea
            label="Default On-screen Message"
            name="defaultonscreenmessage"
            id="defaultonscreenmessage"
            placeholder="Hi, How can I help you?."
            value={prefilledMessage}
            onChange={(e) => setPrefilledMessage(e.target.value)}
          />
          <Box display="flex" alignItems="center" gap={2} sx={{ mb: 1 }}>
            <RadioGroupFieldupdown
              label="Open Widget Mobile"
              name="openwidgetonmobile"
              id="openwidgetonmobile"
              options={openwidgetonmobile}
              value={selectedOption}
              onChange={handleOptionChange}
            />
            <RadioGroupFieldupdown
              label="Open Widget"
              name="openwidget"
              id="openwidget"
              options={openwidget}
              value={selectedOpenWidget}
              onChange={handleOptionChange2}
            />

            {/* Re-open Widget (Hidden when 'No' is selected) */}
            {selectedOpenWidget === "option1" && (
              <div id="reopenwidget">
                <RadioGroupFieldupdown
                  label="Re-open Widget"
                  name="reopenwidget"
                  id="reopenwidget"
                  options={reopenwidget}
                  value={selectedreopenwidget}
                  onChange={handleOptionChange3}
                />
              </div>
            )}
          </Box>
        </Box>

      </Box>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "10px" }}>
        <UniversalButton
          label="Generate Snippet"
          id="generate"
          name="generate"
        />
      </div>


      {/* Absolute Positioned Chat Toggle Button */}
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            bottom: 40 + marginBottom,
            left: chatButtonPosition === "option1" ? `${marginLeft}px` : "auto",
            right: chatButtonPosition === "option2" ? `${marginRight}px` : "auto",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 2,
            width: "100%",
            maxWidth: "350px",
            // margin: "auto" 
          }}
        >
          {/* Header */}
          <Box sx={{ backgroundColor: brandcolorBg, color: "#fff", display: "flex", alignItems: "center", padding: "8px" }}>
            <img src={brandImage} alt="Profile" style={{ backgroundColor: "#fff", border: "0.5px solid #fff", width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{brandName}</Typography>
              <Typography variant="body2">{brandSubtitle}</Typography>
            </Box>
            <span style={{ marginLeft: "auto", cursor: "pointer", fontSize: "20px" }} onClick={toggleChat}>&times;</span>
          </Box>

          {/* Chat Body */}
          <Box sx={{ padding: 2, backgroundColor: "#f9f9f9", minHeight: "100px", textAlign: "center", }} className="whatsappChatWidgetBox ">
            <Typography
              variant="body2"
              sx={{
                width: "75%",
                margin: "15px",
                background: "white",
                // display: "inline-block",
                padding: "10px 15px",
                borderRadius: "0px 8px 8px 8px",
                fontSize: "14px",
                position: "relative",
                "&::before": {
                  content: '""',  // ✅ Correct way to add content for pseudo-element
                  position: "absolute",
                  top: 0,
                  left: 0,
                  marginLeft: "-8px",
                  width: 0,
                  height: 0,
                  borderBottom: "solid 10px transparent",
                  borderRight: "solid 8px white"
                }
              }}
            >
              {prefilledMessage}
            </Typography>

          </Box>

          {/* Chat Footer */}
          <Box sx={{ padding: 2, backgroundColor: "#fff", textAlign: "center" }}>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                textDecoration: "none",
                backgroundColor: "#008000",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            >
              {widgetctaText}
            </a>
            <Typography variant="caption" sx={{ display: "block", marginTop: "5px", color: "#666" }}>
              Powered by XYZ
            </Typography>
          </Box>
        </Box>
      )}

      <Button
        variant="contained"
        id="previewbtn"
        onClick={toggleChat}
        startIcon={<WhatsAppIcon
        />}
        // ctaText={!isOpen ? ctaText : null} 

        sx={{
          position: "absolute",
          bottom: marginBottom,
          left: chatButtonPosition === "option1" ? `${marginLeft}px` : "auto",
          right: chatButtonPosition === "option2" ? `${marginRight}px` : "auto",
          borderRadius: borderRadius,
          backgroundColor: buttonBg,
          color: "#fff",
          fontWeight: "bold",
          "&:hover": { backgroundColor: buttonBg },
          maxWidth: "max-content"
        }}
      >
        {!isOpen ? ctaText : null}
      </Button>
    </Box>
  );
};

export default WhatsappChatWidget;
