import Select from 'react-select';
import iso6391 from 'iso-639-1';
import CustomTooltip from './CustomTooltip';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';

const LanguageSelect = ({
    value,
    onChange,
    label,
    tooltipContent = "",
    tooltipPlacement = "top",
}) => {
    // const languageOptions = iso6391.getAllNames().map((name) => ({
    //     value: iso6391.getCode(name),
    //     label: name,
    // }));
    const languageOptions = [
        { value: "af", label: "Afrikaans" },
        { value: "sq", label: "Albanian" },
        { value: "ar", label: "Arabic" },
        { value: "ar_EG", label: "Arabic (EGY)" },
        { value: "ar_AE", label: "Arabic (UAE)" },
        { value: "ar_LB", label: "Arabic (LBN)" },
        { value: "ar_MA", label: "Arabic (MAR)" },
        { value: "ar_QA", label: "Arabic (QAT)" },
        { value: "az", label: "Azerbaijani" },
        { value: "be_BY", label: "Belarusian" },
        { value: "bn", label: "Bengali" },
        { value: "bn_IN", label: "Bengali (IND)" },
        { value: "bg", label: "Bulgarian" },
        { value: "ca", label: "Catalan" },
        { value: "zh_CN", label: "Chinese (CHN)" },
        { value: "zh_HK", label: "Chinese (HKG)" },
        { value: "zh_TW", label: "Chinese (TAI)" },
        { value: "hr", label: "Croatian" },
        { value: "cs", label: "Czech" },
        { value: "da", label: "Danish" },
        { value: "prs_AF", label: "Dari" },
        { value: "nl", label: "Dutch" },
        { value: "nl_BE", label: "Dutch (BEL)" },
        { value: "en", label: "English" },
        { value: "en_GB", label: "English (UK)" },
        { value: "en_US", label: "English (US)" },
        { value: "en_AE", label: "English (UAE)" },
        { value: "en_AU", label: "English (AUS)" },
        { value: "en_CA", label: "English (CAN)" },
        { value: "en_GH", label: "English (GHA)" },
        { value: "en_IE", label: "English (IRL)" },
        { value: "en_IN", label: "English (IND)" },
        { value: "en_JM", label: "English (JAM)" },
        { value: "en_MY", label: "English (MYS)" },
        { value: "en_NZ", label: "English (NZL)" },
        { value: "en_QA", label: "English (QAT)" },
        { value: "en_SG", label: "English (SGP)" },
        { value: "en_UG", label: "English (UGA)" },
        { value: "en_ZA", label: "English (ZAF)" },
        { value: "et", label: "Estonian" },
        { value: "fil", label: "Filipino" },
        { value: "fi", label: "Finnish" },
        { value: "fr", label: "French" },
        { value: "fr_BE", label: "French (BEL)" },
        { value: "fr_CA", label: "French (CAN)" },
        { value: "fr_CH", label: "French (CHE)" },
        { value: "fr_CI", label: "French (CIV)" },
        { value: "fr_MA", label: "French (MAR)" },
        { value: "ka", label: "Georgian" },
        { value: "de", label: "German" },
        { value: "de_AT", label: "German (AUT)" },
        { value: "de_CH", label: "German (CHE)" },
        { value: "el", label: "Greek" },
        { value: "gu", label: "Gujarati" },
        { value: "ha", label: "Hausa" },
        { value: "he", label: "Hebrew" },
        { value: "hi", label: "Hindi" },
        { value: "hu", label: "Hungarian" },
        { value: "id", label: "Indonesian" },
        { value: "ga", label: "Irish" },
        { value: "it", label: "Italian" },
        { value: "ja", label: "Japanese" },
        { value: "kn", label: "Kannada" },
        { value: "kk", label: "Kazakh" },
        { value: "rw_RW", label: "Kinyarwanda" },
        { value: "ko", label: "Korean" },
        { value: "ky_KG", label: "Kyrgyz (Kyrgyzstan)" },
        { value: "lo", label: "Lao" },
        { value: "lv", label: "Latvian" },
        { value: "lt", label: "Lithuanian" },
        { value: "mk", label: "Macedonian" },
        { value: "ms", label: "Malay" },
        { value: "ml", label: "Malayalam" },
        { value: "mr", label: "Marathi" },
        { value: "nb", label: "Norwegian" },
        { value: "ps_AF", label: "Pashto" },
        { value: "fa", label: "Persian" },
        { value: "pl", label: "Polish" },
        { value: "pt_BR", label: "Portuguese (BR)" },
        { value: "pt_PT", label: "Portuguese (POR)" },
        { value: "pa", label: "Punjabi" },
        { value: "ro", label: "Romanian" },
        { value: "ru", label: "Russian" },
        { value: "sr", label: "Serbian" },
        { value: "si_LK", label: "Sinhala" },
        { value: "sk", label: "Slovak" },
        { value: "sl", label: "Slovenian" },
        { value: "es", label: "Spanish" },
        { value: "es_AR", label: "Spanish (ARG)" },
        { value: "es_CL", label: "Spanish (CHL)" },
        { value: "es_CO", label: "Spanish (COL)" },
        { value: "es_CR", label: "Spanish (CRI)" },
        { value: "es_DO", label: "Spanish (DOM)" },
        { value: "es_EC", label: "Spanish (ECU)" },
        { value: "es_HN", label: "Spanish (HND)" },
        { value: "es_MX", label: "Spanish (MEX)" },
        { value: "es_PA", label: "Spanish (PAN)" },
        { value: "es_PE", label: "Spanish (PER)" },
        { value: "es_ES", label: "Spanish (SPA)" },
        { value: "es_UY", label: "Spanish (URY)" },
        { value: "sw", label: "Swahili" },
        { value: "sv", label: "Swedish" },
        { value: "ta", label: "Tamil" },
        { value: "te", label: "Telugu" },
        { value: "th", label: "Thai" },
        { value: "tr", label: "Turkish" },
        { value: "uk", label: "Ukrainian" },
        { value: "ur", label: "Urdu" },
        { value: "uz", label: "Uzbek" },
        { value: "vi", label: "Vietnamese" },
        { value: "zu", label: "Zulu" }
    ];



    return (
        <div className="w-full">
            {label && (
                <div className="flex items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    {tooltipContent && (
                        <CustomTooltip
                            title={tooltipContent}
                            placement={tooltipPlacement}
                            arrow
                        >
                            <span className="ml-2">
                                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
                            </span>
                        </CustomTooltip>
                    )}
                </div>
            )}
            <Select
                options={languageOptions}
                value={languageOptions.find(option => option.value === value && <BsCheck className="text-indigo-600 text-xl" />)}
                onChange={onChange}
                placeholder="Select Language"
                isSearchable
                styles={{
                    control: (provided) => ({
                        ...provided,
                        outline: 'none',
                        backgroundColor: 'white',
                        color: 'white',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        fontSize: "14px",
                    }),
                    menu: (provided) => ({
                        ...provided,
                        fontSize: '14px'
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? 'rgb(224 231 255)' : 'white',
                        color: state.isSelected ? 'black' : 'black',
                    }),
                }}
            />
        </div>
    );
};

export default LanguageSelect;