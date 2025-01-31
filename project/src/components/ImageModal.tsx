import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ImageModalProps {
  image: {
    url: string;
    title: string;
    description: string;
    category: string;
  } | null;
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: ImageModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!image) return null;

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-lg overflow-hidden max-w-7xl mx-auto ${
            isFullscreen ? 'fixed inset-0' : 'relative'
          }`}
        >
          <div className="flex flex-col md:flex-row h-full">
            {/* Image Section */}
            <div className={`relative ${isFullscreen ? 'w-full' : 'md:w-2/3'}`}>
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 left-4 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  {isFullscreen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9V4.5M9 9H4.5M15 9V4.5M15 9H19.5M9 15V19.5M9 15H4.5M15 15V19.5M15 15H19.5"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                  )}
                </svg>
              </button>
              <img
                src={image.url}
                alt={image.title}
                className={`w-full ${
                  isFullscreen
                    ? 'h-full object-contain'
                    : 'h-[300px] md:h-[600px] object-cover'
                }`}
              />
            </div>

            {/* Description Section */}
            {!isFullscreen && (
              <div className="md:w-1/3 p-6 md:p-8 space-y-4">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div>
                  <h3 className="text-2xl font-light gradient-text mb-2">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{image.category}</p>
                  <p className="text-gray-600 leading-relaxed">
                    {image.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;