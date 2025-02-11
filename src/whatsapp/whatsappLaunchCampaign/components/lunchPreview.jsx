import { WhatsApp } from '@mui/icons-material';
import { FaReply } from 'react-icons/fa6';
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaLinkSlash } from "react-icons/fa6";
import { useEffect, useState } from 'react';
// import '../../index.css'

const TemplateRenderer = ({
  scrollContainerRef,
  header,
  format,
  footer,
  imageUrl,
  videoUrl,
  documentUrl,
  locationUrl,
  phoneTitle,
  urlTitle,
  quickReplies,
  variables, // Pass variables from parent
}) => {

  const extractCoordinates = (url) => {
    let regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    let match = url.match(regex);
    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }

    regex = /place\/.*\/@(-?\d+\.\d+),(-?\d+\.\d+)/;
    match = url.match(regex);
    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }

    regex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    match = url.match(regex);
    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }

    return null;
  };

  const [scrollOffset, setScrollOffset] = useState(206); // Default top position

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef?.current) {
        const containerScrollY = scrollContainerRef.current.scrollTop;
        const offset = Math.max(100, 190 - containerScrollY); // Adjust based on scroll
        setScrollOffset(offset);
      }
    };

    const container = scrollContainerRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [scrollContainerRef]);

  // Function to replace placeholders with variable values
  const renderWithVariables = (template) => {
    if (!variables || variables.length === 0) return template;

    return template.replace(/{#(.*?)#}/g, (match, id) => {
      const variable = variables.find((v) => v.id === id);
      return variable ? `[${variable.value || 'empty'}]` : match;
    });
  };


  return (

    <div className="p-4 border border-gray-300 rounded-md shadow-lg bg-gray-100 transition-all duration-300 w-125"
    >
      <div className='flex items-center justify-between bg-green-500 text-white px-4 py-2 rounded-t-md'>
        <h2 className='text-lg font-semibold'>Template Preview</h2>
        <p className='text-sm'>
          <WhatsApp />
        </p>
      </div>

      <div className='bg-white rounded-b-md p-4 shadow-inner'>
        {header && (
          <div className='mb-4 bg-green-100 px-3 py-2 rounded-md text-sm text-gray-900 w-full max-h-20 break-words'>
            <strong className='font-semibold text-lg'>{header}</strong>
          </div>
        )}

        {/* {imageUrl && (
          <div className='mb-4'>
            <img
              src={imageUrl}
              alt='Template Preview'
              className='w-full h-48 object-cover rounded-md'
            />
          </div>
        )} */}

        {imageUrl ? (
          <div className="mb-4">
            <img src={imageUrl} alt="Template Preview" className="w-full h-48 object-cover rounded-md" />
          </div>
        ) : (
          <div className="mb-4 bg-gray-200 text-center text-sm py-2 rounded-md">No Image Uploaded</div>
        )}

        {videoUrl && (
          <div className='mb-4'>
            <video controls className='w-full h-48 rounded-md'>
              <source src={videoUrl} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {documentUrl && (
          <div className='mb-4'>
            <a
              href={documentUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              View Document
            </a>
          </div>
        )}

        {locationUrl && (
          <div className='mb-4'>
            {(() => {
              const coordinates = extractCoordinates(locationUrl);
              if (coordinates) {
                return (
                  <iframe
                    src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&output=embed`}
                    width='100%'
                    height='200'
                    allowFullScreen
                    loading='eager'
                    className='rounded-md'
                  ></iframe>
                );
              } else {
                return (
                  <div className='mb-4 bg-gray-100 px-3 py-2 rounded-md text-gray-800 flex justify-center' >
                    <span className='mr-3' >
                      <FaLinkSlash
                        size={19}
                        className='p-0'
                      />
                    </span>
                    <span className='text-md' >
                      Invalid Maps URL
                    </span>
                  </div>
                )
              }
            })()}
          </div>
        )}

        {format && (
          <div className='mb-4 bg-gray-100 px-3 py-2 rounded-md text-gray-800 text-sm overflow-auto w-full max-h-40 break-words'>
            {renderWithVariables(format)}
          </div>
        )}

        {footer && (
          <div className='mt-4 text-center text-xs text-gray-500 max-h-16 overflow-auto break-words'>{footer}</div>
        )}
        <div className='flex flex-col gap-2 mt-4'>
          {phoneTitle && (
            <button className='flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md'>
              <BsTelephoneFill className='mr-2' />
              {phoneTitle}
            </button>
          )}
          {urlTitle && (
            <button className='flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md'>
              <FaExternalLinkAlt className='mr-2' />
              {urlTitle}
            </button>
          )}
        </div>

        {quickReplies && quickReplies.length > 0 && (
          <div className='mt-4'>
            <div className='flex flex-col gap-2'>
              {quickReplies.map(
                (reply, index) =>
                  reply && (
                    <button
                      key={index}
                      className='flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm w-full'
                    >
                      <FaReply className='mr-2' />
                      {reply}
                    </button>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateRenderer;
