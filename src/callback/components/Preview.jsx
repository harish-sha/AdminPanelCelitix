export const Preview = () => {
    const code = `[
    {
        "senderid": "QDXXXX",
        "errorstatus": "DELIVRD",
        "deliverytime": "2021-07-13 12:12:00",
        "clientsmsid": "1363798292",
        "errorcode": "000",
        "messageid": "401950327",
        "errorreason": "Delivered",
        "mobileno": "+9177XXXXXXXX"
    }
]`;
    return (
        <div className="w-1/3 border p-2 space-y-2 rounded-lg shadow-md space-x-2 mt-0 md:mt-15">
            <div>
                <span className="font-semibold">Note:</span> Use the below callback
                parameters either in the API URL (In case of GET request), or the
                request body. They'll be replaced with actual values.
            </div>
            <div className="bg-gray-200 p-2 border rounded-md">
                <pre className="text-sm">{code}</pre>
            </div>
        </div>
    );
};