import { useEffect, useState } from "react";
import { FaLocationCrosshairs, FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { TbLocationShare } from "react-icons/tb";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Preview = ({
    variables = [],
    messageContent,
    btnData = [],
    cardData,
    cardWidth,
    cardOrientation,
    templateType,
    caraousalData,
    selectedIndex,
    handleNextIndex,
    handlePreviousIndex,
    setSelectedCardIndex,
}) => {
    const [pree, setPree] = useState();

    useEffect(() => {
        const filteredBtnData = [];
        // let updatedSuggestions = caraousalData;

        Object.values(btnData).map((item) => {
            if (item.type) {
                filteredBtnData.push(item);
                return item;
            }
        });

        const updatedCData = caraousalData?.map((item) => ({
            ...item,
            suggestions: item?.suggestions
                ? Object.values(item.suggestions).filter(({ type }) => type)
                : [],
        }));

        const fileType = cardData?.filePath?.type?.split("/")[0];

        setPree({
            variables,
            messageContent:
                messageContent ||
                "As vibrant hues fill the canvas of life, may this festival of colors bring immense joy, success and prosperity to your corporate endeavors🎇💻\n\nLet's continue to paint the digital landscape with creativity, innovation and strategic brilliance!✨✨\n\nHere's to a colorful journey ahead!🎉🎊\n\nBest Regards,🎊 \n[Team Proactive]",
            filteredBtnData:
                filteredBtnData.length > 0
                    ? filteredBtnData
                    : [
                        {
                            type: "Url Action",
                            value: "#",
                            title: "Visit Us",
                        },
                        {
                            type: "Dialer Action",
                            value: "+91XXXXXXXXXX",
                            title: "Call Us",
                        },
                    ],
            cardData,
            cardWidth,
            cardOrientation,
            templateType,
            caraousalData,
            selectedIndex,
            updatedCData,
            fileType,
        });
    }, [
        variables,
        messageContent,
        btnData,
        cardData,
        cardWidth,
        cardOrientation,
        templateType,
        caraousalData,
        selectedIndex,
    ]);

    const getBtnStyle = (type) => {
        switch (type) {
            case "Reply":
                return "bg-gray-200 text-gray-800";
            case "Url Action":
                return "bg-green-500 text-white";
            case "Dialer Action":
                return "bg-blue-500 text-white";
            case "View Location":
                return "bg-yellow-500";
            case "Share Location":
                return "bg-red-500";
            default:
                return "";
        }
    };

    const getBtnIcon = (type) => {
        switch (type) {
            case "Reply":
                return <FaReply />;
            case "Url Action":
                return <FaExternalLinkAlt />;
            case "Dialer Action":
                return <BsTelephoneFill />;
            case "View Location":
                return <FaLocationCrosshairs />;
            case "Share Location":
                return <TbLocationShare />;
            default:
                return "";
        }
    };


    return (
        <div className="smartphone">
            <div className="smartphone-content">
                <p>Template Preview</p>
                {templateType != "carousel" ? (
                    <>
                        <div className="mb-4">{pree?.cardData?.title}</div>

                        {pree?.cardData?.file && (
                            <div className="mb-3">
                                {pree?.fileType === "image" ? (
                                    <img src={pree.cardData.file} alt="Uploaded content" />
                                ) : (
                                    // Uncomment and define the type if you plan to use <embed>
                                    <embed
                                        src={pree.cardData.file}
                                        type="your-file-type"
                                        className="w-[70%] overflow-x-hidden"
                                    />
                                )}
                            </div>
                        )}

                        <div className="flex flex-col justify-between gap-4">
                            {pree?.messageContent && (
                                <div className="overflow-y-scroll max-h-[250px] max-w-[525px] p-2 break-words whitespace-pre-wrap rounded-md border min-h-[50px]">
                                    <pre className="p-2 break-words whitespace-pre-wrap rounded-md">
                                        {pree?.messageContent}
                                    </pre>
                                </div>
                            )}

                            {pree?.filteredBtnData?.length > 0 && (
                                <div className="flex flex-wrap gap-2 w-full max-w-[500px]">
                                    {pree?.filteredBtnData?.map((item, index) => (
                                        <button
                                            key={index}
                                            title={item.value}
                                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
                                                item.type
                                            )}`}
                                        >
                                            {getBtnIcon(item.type)}
                                            <p className="ml-2">{item.title}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            infiniteLoop
                            useKeyboardArrows
                            renderArrowPrev={() => null}
                            renderArrowNext={() => null}
                            selectedItem={pree?.selectedIndex}
                            renderIndicator={(onClickHandler, isSelected, index) => {
                                const indicatorClass = isSelected
                                    ? "bg-[#212529] w-3 h-3 rounded-full mx-1 cursor-pointer"
                                    : "bg-[#7E7F80] w-3 h-3 rounded-full mx-1 cursor-pointer";

                                return (
                                    <li
                                        id="carousel-indicator"
                                        name="carousel-indicator"
                                        key={index}
                                        className={`inline-block ${indicatorClass}`}
                                        onClick={() => {
                                            onClickHandler();
                                            setSelectedCardIndex(index);
                                            console.log("Selected Card Index:", index);
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Slide ${index + 1}`}
                                    />
                                );
                            }}
                        >
                            {pree?.updatedCData.map((item, index) => (
                                <>
                                    <div key={index}>
                                        <p>{item.cardTitle}</p>
                                        <div className="overflow-y-scroll max-h-[250px] max-w-[525px] p-2 break-words whitespace-pre-wrap rounded-md border min-h-[50px]">
                                            <pre className="p-2 break-words whitespace-pre-wrap rounded-md">
                                                {item.cardDescription}
                                            </pre>
                                        </div>
                                        {item.fileTempPath && (
                                            <img
                                                src={URL.createObjectURL(item.fileTempPath)}
                                                alt={item.cardTitle}
                                            />
                                        )}
                                    </div>
                                    {/* {JSON.stringify(pree?.updatedCData, null, 2)} */}

                                    {item.suggestions && (
                                        <div className="flex flex-wrap gap-2 w-full max-w-[500px] mt-5">
                                            {item.suggestions?.map((item, index) => (
                                                <button
                                                    key={index}
                                                    title={item.value}
                                                    className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
                                                        item.type
                                                    )}`}
                                                >
                                                    {getBtnIcon(item.type)}
                                                    <p className="ml-2">{item.title}</p>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ))}
                        </Carousel>
                    </>
                )}
            </div>
        </div>
    );
};