export const extractVariable = ({ message }: { message: string }) => {
  const variable = message?.match(/{{(.+?)}}/g);
  const text = variable?.map((item) =>
    item.replace("{{", "").replace("}}", "")
  );

  if (Array.isArray(text)) return text[0];

  return "";
};
