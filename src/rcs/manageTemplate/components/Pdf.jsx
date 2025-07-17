import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";

export const Pdf = ({ pdfTemplateState, setPdfTemplateState, pdfRef }) => {
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        setPdfTemplateState({
          ...pdfTemplateState,
          pdfBase64: base64,
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  }
  return (
    <div className="flex gap-4 mb-2">
      <InputField
        id="fileName"
        name="fileName"
        placeholder="Enter File Name"
        label="File Name"
        onChange={(e) => {
          setPdfTemplateState({
            ...pdfTemplateState,
            documentFileName: e.target.value,
          });
        }}
        value={pdfTemplateState.documentFileName}
      />
      <AnimatedDropdown
        id="messageOrder"
        name="messageOrder"
        label="Message Order"
        placeholder="Select Message Order"
        onChange={(e) => {
          setPdfTemplateState({
            ...pdfTemplateState,
            messageOrder: e,
          });
        }}
        value={pdfTemplateState.messageOrder}
        options={[
          {
            label: "Text Message at Top",
            value: "text_message_at_top",
          },
          {
            label: "Text Message at Bottom",
            value: "text_message_at_bottom",
          },
        ]}
      />
      <InputField
        id="pdfBase64"
        name="pdfBase64"
        label="Uplaod PDF"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={pdfRef}
      />
    </div>
  );
};