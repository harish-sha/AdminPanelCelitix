import InputField from "@/whatsapp/components/InputField";

export const VariableManager = ({
  templateDetails,
  varList,
  setVarList,
  varLength,
  setInputVariables,
  inputVariables,
}) => {
  function handleInputVariable(data, index) {
    setInputVariables((prev) => ({
      ...prev,
      [index]: data,
    }));
  }

  return (
    <div className=" p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1">
      <h1>Variables</h1>
      <div className="flex gap-2 flex-col mt-2">
        {varList?.map((input, index) => (
          <InputField
            key={index}
            id={index}
            label={`Variable ${index + 1}`}
            name={`variable${index + 1}`}
            placeholder={`Enter variable ${index + 1}`}
            onChange={(e) => {
              handleInputVariable(e.target.value, index);
            }}
            sx={{
              width: "100%",
              marginBottom: "1rem",
            }}
          />
        ))}
      </div>
    </div>
  );
};
