import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import ContactForm from './components/ContactForm';
import ImageModal from './components/ImageModal';
import './App.css';
import photo from "./assets/pexels-vika-glitter-392079-17985324.jpg"
const images = [
  { 
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    category: 'Nature',
    title: 'Misty Mountains',
    description: 'Captured at dawn, this ethereal landscape showcases the majestic mountains emerging from a sea of morning mist. The interplay of light and shadow creates a dramatic atmosphere that speaks to the raw beauty of nature.',
  },
  { 
    url: 'https://images.unsplash.com/photo-1501699169021-3759ee435d66',
    category: 'Portrait',
    title: 'Golden Hour Portrait',
    description: 'A candid portrait shot during the golden hour, where natural sunlight creates a warm, gentle glow that enhances the subject\'s features. The soft bokeh effect in the background adds depth to the composition.',
  },
  { 
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    category: 'Architecture',
    title: 'Urban Geometry',
    description: 'Modern architecture captured from a unique perspective, highlighting the geometric patterns and symmetry of contemporary urban design. The monochromatic treatment emphasizes the building\'s striking structural elements.',
  },
  { 
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
    category: 'Street',
    title: 'City Lights',
    description: 'A vibrant street scene photographed during the blue hour, when artificial lights begin to illuminate the city. The long exposure technique creates light trails from passing vehicles, adding dynamic energy to the urban landscape.',
  },
  { 
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    category: 'Landscape',
    title: 'Valley Vista',
    description: 'An expansive view of a pristine valley captured during autumn. The rich colors of changing foliage create a natural tapestry, while the dramatic clouds add depth and atmosphere to the scene.',
  },
  { 
    url: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b',
    category: 'People',
    title: 'Market Life',
    description: 'A slice of daily life at a local market, capturing genuine human interactions and emotions. The natural lighting and candid moment tell a story of community and tradition.',
  },
  { 
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
    category: 'Travel',
    title: 'Ancient Pathways',
    description: 'Discovered during a journey through remote villages, this ancient pathway tells stories of generations past. The weathered stones and surrounding vegetation create a timeless atmosphere.',
  },
  { 
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
    category: 'Urban',
    title: 'City Reflections',
    description: 'Urban architecture reflected in still waters, creating a mirror-like effect that doubles the visual impact. Shot during the quiet early morning hours when the city is just beginning to wake.',
  },
];

const categories = ['All', ...new Set(images.map(img => img.category))];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(null);

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  const pageTransition = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  };

  return (
    <div className="min-h-screen bg-[#faf8f6]">
      {/* Navigation */}
      <nav className="w-full bg-[#faf8f6]/90 backdrop-blur-lg shadow-sm z-50">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end h-16 items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12 ">
              {['home', 'about', 'gallery', 'contact'].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm uppercase tracking-wider transition-colors ${
                    activeSection === section 
                      ? 'text-[#2d3436] font-medium' 
                      : 'text-gray-500 hover:text-[#2d3436]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-2 space-y-1">
                {['home', 'about', 'gallery', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      setActiveSection(section);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm uppercase tracking-wider ${
                      activeSection === section
                        ? 'text-[#2d3436] font-medium bg-gray-100'
                        : 'text-gray-500 hover:text-[#2d3436] hover:bg-gray-50'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence mode="wait">
        {/* Hero Section */}
        {activeSection === 'home' && (
          <motion.section 
            key="home"
            {...pageTransition}
            className="min-h-screen pt-16 flex items-center justify-center px-4"
          >
            <div className="max-w-7xl mx-auto text-center">
              <motion.h2 
                className="text-6xl md:text-8xl font-light gradient-text mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
             
              >
                Through My Lens
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              
              >
                Capturing life's extraordinary moments in their purest form
              </motion.p>
            </div>
          </motion.section>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <motion.section 
            key="about"
            {...pageTransition}
            className="min-h-screen pt-24 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                 
                  className="relative aspect-[3/4] rounded-lg overflow-hidden"
                >
                  <img
                    src={photo}
                    alt="Photographer"
                    className="object-cover w-full h-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
            
                  className="space-y-6"
                >
                  <h2 className="text-4xl font-light gradient-text">Hello, I'm John</h2>
                  <p className="text-gray-600 leading-relaxed">
                    With over a decade of experience in photography, I've developed a passion for 
                    capturing the extraordinary in the ordinary. My journey began in the streets 
                    of New York, where I learned that every moment tells a unique story.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    My work spans across various genres, from intimate portraits to vast landscapes, 
                    each image crafted with attention to detail and emotion. I believe in creating 
                    photographs that not only capture moments but also tell stories that resonate.
                  </p>
                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-[#2d3436] text-white rounded-md hover:bg-[#636e72] transition-colors"
                      onClick={() => setActiveSection('contact')}
                    >
                      Work with me
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Gallery Section */}
        {activeSection === 'gallery' && (
          <motion.section 
            key="gallery"
            {...pageTransition}
            className="pt-24 px-4"
          >
            <div className="max-w-7xl mx-auto">
              {/* Category Filter */}
              <motion.div 
                className="flex flex-wrap gap-4 justify-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-[#2d3436] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>

              {/* Image Grid */}
              <Masonry
                breakpointCols={breakpointColumns}
                className="flex -ml-4 w-auto"
                columnClassName="pl-4 bg-clip-padding"
              >
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                   
                    className="mb-4 group relative overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <motion.img
                      src={image.url}
                      alt={image.title}
                      className="w-full rounded-lg transition-transform duration-500 group-hover:scale-105"
                      whileHover={{ scale: 1.02 }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
                        {image.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </Masonry>
            </div>
          </motion.section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <motion.section 
            key="contact"
            {...pageTransition}
            className="pt-24 px-4 pb-16"
          >
            <div className="max-w-3xl mx-auto">
              <motion.h2 
                className="text-4xl font-light text-center mb-12 gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Let's Create Together
              </motion.h2>
              <ContactForm />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}

export default App;