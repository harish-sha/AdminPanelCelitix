import {useState,useRef} from 'react'


const FILTERS = [
  { name: 'Normal', style: '' },
  { name: 'Clarendon', style: 'contrast(1.2) saturate(1.25)' },
  { name: 'Gingham', style: 'grayscale(0.5) contrast(1.1)' },
  { name: 'Lark', style: 'brightness(1.1) saturate(1.15)' },
  { name: 'Juno', style: 'contrast(1.15) saturate(1.3)' },
  { name: 'Crema', style: 'contrast(0.9) brightness(1.1)' },
  { name: 'Aden', style: 'hue-rotate(20deg) brightness(1.1)' },
];

const InstaCreatePost = () => {
  const [step, setStep] = useState(0);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [hueRotate, setHueRotate] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [adjustmentTab, setAdjustmentTab] = useState('filters');
  const [aspectRatio, setAspectRatio] = useState('original');
  const fileInputRef = useRef(null);


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages(urls);
    setStep(1);
  };

  const filteredStyle = {
    transform: `scale(${zoom})`,
    filter: `
      ${selectedFilter}
      brightness(${brightness}%)
      contrast(${contrast}%)
      hue-rotate(${hueRotate}deg)
      grayscale(${grayscale}%)
    `,
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  };

  const aspectRatioOptions = [
    { label: 'Original', value: 'original' },
    { label: '1:1', value: '1/1' },
    { label: '4:5', value: '4/5' },
    { label: '16:9', value: '16/9' },
  ];

  const getImageContainerStyle = () => {
    if (aspectRatio === 'original') {
      return { overflow: 'hidden' };
    }
    return {
      aspectRatio,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };

  return (
 <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl h-[500px] bg-white rounded-xl shadow-xl flex overflow-hidden transition-all duration-300">
        {step === 0 && (
          <div className="flex-1 flex flex-col justify-center items-center">
            <p className="text-xl font-semibold mb-4">Create new post</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 rounded-md transition bg-blue-500 text-white hover:bg-blue-600"
            >
              Select from computer
            </button>
          </div>
        )}

        {step > 0 && (
          <>
            <div className="flex-1 bg-black relative" style={getImageContainerStyle()}>
              {images.length > 0 && (
                <img
                  src={images[activeIndex]}
                  alt="Preview"
                  className="object-contain"
                  style={filteredStyle}
                />
              )}
            </div>

            <div className="w-[300px] bg-white overflow-y-auto border-l border-gray-200">
              {/* Top Bar */}
              {step === 3 ? (
                <div className="flex justify-between items-center px-4 py-2 border-b text-sm font-medium">
                  <button onClick={() => setStep(2)}>←</button>
                  <span>Create new post</span>
                  <button className="text-blue-600" onClick={() => alert("Post shared!")}>Share</button>
                </div>
              ) : (
                <div className="flex justify-between items-center border-b px-4 py-2">
                  {step > 1 && <button onClick={() => setStep((prev) => prev - 1)}>←</button>}
                  <p className="font-medium">
                    {step === 1 ? 'Crop & Zoom' : step === 2 && adjustmentTab === 'filters' ? 'Filters' : 'Adjustments'}
                  </p>
                  <button
                    onClick={() => setStep((prev) => prev + 1)}
                    className="px-4 py-2 rounded-md transition border border-blue-500 text-blue-500 hover:bg-blue-100"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Step 1: Zoom and Aspect Ratio */}
              {step === 1 && (
                <div className="p-4 space-y-4">
                  <div>
                    <p className="text-sm">Zoom</p>
                    <input
                      type="range"
                      min={1}
                      max={2}
                      step={0.01}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                  <div>
                    <p className="text-sm">Aspect Ratio</p>
                    <div className="flex space-x-2 mt-2">
                      {aspectRatioOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setAspectRatio(option.value)}
                          className={`px-3 py-1 rounded-md text-sm transition ${
                            aspectRatio === option.value
                              ? 'bg-blue-500 text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Filters / Adjustments */}
              {step === 2 && (
                <div className="p-4">
                  {/* Toggle Tabs */}
                  <div className="flex space-x-4 mb-4">
                    <button
                      className={`font-semibold ${adjustmentTab === 'filters' ? 'border-b-2 border-black' : 'text-gray-500'}`}
                      onClick={() => setAdjustmentTab('filters')}
                    >
                      Filters
                    </button>
                    <button
                      className={`font-semibold ${adjustmentTab === 'adjustments' ? 'border-b-2 border-black' : 'text-gray-500'}`}
                      onClick={() => setAdjustmentTab('adjustments')}
                    >
                      Adjustments
                    </button>
                  </div>

                  {/* Filters Grid */}
                  {adjustmentTab === 'filters' && (
                    <div className="grid grid-cols-3 gap-2">
                      {FILTERS.map((filter) => (
                        <div key={filter.name} className="text-center cursor-pointer" onClick={() => setSelectedFilter(filter.style)}>
                          <img
                            src={images[activeIndex]}
                            alt={filter.name}
                            className="w-full h-20 object-cover rounded"
                            style={{ filter: filter.style }}
                          />
                          <p className="text-xs mt-1">{filter.name}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Adjustments Sliders */}
                  {adjustmentTab === 'adjustments' && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm block mb-1">Brightness</label>
                        <input
                          type="range"
                          min={50}
                          max={150}
                          step={1}
                          value={brightness}
                          onChange={(e) => setBrightness(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm block mb-1">Contrast</label>
                        <input
                          type="range"
                          min={50}
                          max={150}
                          step={1}
                          value={contrast}
                          onChange={(e) => setContrast(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm block mb-1">Hue Rotate</label>
                        <input
                          type="range"
                          min={0}
                          max={360}
                          step={1}
                          value={hueRotate}
                          onChange={(e) => setHueRotate(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm block mb-1">Grayscale</label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          value={grayscale}
                          onChange={(e) => setGrayscale(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Caption */}
              {step === 3 && (
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Caption</label>
                    <textarea
                      className="w-full border rounded-md p-2 text-sm resize-none h-24"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Location</label>
                    <input
                      className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Add location"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default InstaCreatePost
