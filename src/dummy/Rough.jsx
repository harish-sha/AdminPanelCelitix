import { FaWhatsapp } from "react-icons/fa";

const defaultWebsite = "wa.me"; // Default WhatsApp link if no website is available
const defaultNumber = "919251006460"; // Default number if no WABA number is available

const website =
    wabadetails?.websites?.length > 0
        ? wabadetails.websites[0].replace("https://", "").replace(/\/$/, "")
        : defaultWebsite;

const phoneNumber = selectedWaba?.wabaNumber || defaultNumber;

const whatsappLink = `https://${website}/${phoneNumber}`;
const whatsappLinkPreview = whatsappLink.replace("https://", "");

return (
    <div className="mt-4">
        <p className="font-semibold text-lg text-gray-800 flex items-center gap-2 mb-1">
            <FaWhatsapp className="text-green-500" />
            {phoneNumber}
        </p>
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm hover:underline"
        >
            {whatsappLinkPreview}
        </a>
    </div>
);
