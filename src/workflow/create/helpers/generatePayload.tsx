export const generatePayload = (payload: any) => {
  const payloadString = JSON.stringify(payload, null, 2);
  return payloadString;
};
