import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/components/layout/InputField";

const WhatsappFlows = () => {
  const [flowName, setFlowName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/wflowcreation", { state: { flowName } });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[80vh] w-full"
    >
      <h1 className="text-4xl font-semibold text-gray-700">
        Create Chat Flow
      </h1>
      <form
        className="mt-4 flex flex-col space-y-4 items-center justify-center w-100 mb-8 text-center text-gray-600"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Flow Name"
          value={flowName}
          onChange={(e) => setFlowName(e.target.value)}
          required
          placeholder="Enter Flow Name"
        />
        <UniversalButton
          label="Create Flow"
          type="submit"
          variant="contained"
        >
          Create Flow
        </UniversalButton>
      </form>
    </div>
  );
};

export default WhatsappFlows;
