import React, { useState, useEffect } from 'react';
import './index.css';
import Chatbot from './Chatbot';

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  }); 

  useEffect(() => {
    console.log('Initial isDark:', isDark); // Debug: Log initial state
    document.documentElement.classList.toggle('dark', isDark);
    console.log(`Document classList after mount: ${document.documentElement.className}`); // Debug: Log classList
  }, [isDark]);

  const toggleTheme = () => {
    console.log('toggleTheme called, current isDark:', isDark); // Debug: Confirm function runs
    setIsDark(prev => {
      const newTheme = !prev;
      console.log('New isDark state:', newTheme); // Debug: Log new state
      return newTheme;
    });
  };

  const scrollToSection = (sectionId) => {
    console.log('Scrolling to section:', sectionId); // Debug: Confirm scroll
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 via-purple-100 to-cyan-100 dark:from-gray-900 dark:via-purple-900 dark:to-cyan-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-xl border-b border-pink-300/20 dark:border-cyan-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-cyan-400 drop-shadow-lg"></span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="relative text-xl font-semibold text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-cyan-400 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-1 after:bg-pink-600 dark:after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-4"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 dark:from-lightpurple-500 dark:to-yellow-500 text-white hover:scale-110 transition-transform duration-300 shadow-neon z-60"
                aria-label="Toggle theme"
              >
                {isDark ? '🌙' : '☀️'}
              </button>
            </div>
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white hover:scale-110 transition-transform duration-300 shadow-neon z-60"
                aria-label="Toggle theme"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-pink-600 dark:hover:bg-cyan-500 transition-colors duration-300 z-60"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? '✖' : '☰'}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-md shadow-lg px-4 py-6 z-50">
            {['home', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left py-3 text-xl font-semibold text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-cyan-400 transition-colors duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpath fill=%22%23ff6b81%22 opacity=%220.1%22 d=%22M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zM50 80c-17.6 0-32-14.4-32-32S32.4 16 50 16s32 14.4 32 32-14.4 32-32 32z%22/%3E%3C/svg%23')] repeat opacity-20 animate-blob"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
              <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 dark:from-pink-400 dark:via-cyan-400 dark:to-blue-400 drop-shadow-xl animate-fade-in">Muhammad Saim Khan</h1>
              <h3 className="text-3xl md:text-4xl font-bold mt-4 text-gray-700 dark:text-gray-300">Passionate about AI and Neural Networks</h3>
              <p className="text-lg md:text-xl mt-6 max-w-lg mx-auto md:mx-0 text-gray-600 dark:text-gray-400 leading-relaxed">Transforming ideas into AI-powered magic, one line at a time. Let’s build the future together! 🌌</p>
              <div className="mt-8 flex space-x-4 justify-center md:justify-start">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white rounded-full font-semibold text-lg hover:bg-pink-700 dark:hover:bg-cyan-600 transition-all duration-300 shadow-lg hover:shadow-neon transform hover:-translate-y-1"
                >
                  Connect Now
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-pink-600 dark:text-cyan-400 border-2 border-pink-600 dark:border-cyan-400 rounded-full font-semibold text-lg hover:bg-pink-600 dark:hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-neon transform hover:-translate-y-1"
                >
                  View Projects
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center relative">
              <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-pink-400/30 to-cyan-400/30 dark:from-pink-600/30 dark:to-cyan-600/30 backdrop-blur-lg rounded-full shadow-2xl animate-float">
                <div className="absolute inset-4 flex items-center justify-center">
                  <span className="text-6xl md:text-7xl animate-spin-slow text-pink-600 dark:text-cyan-400 drop-shadow-md">🤖</span>
                </div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-300/20 dark:bg-pink-300/20 rounded-full blur-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-6 text-purple-600 dark:text-cyan-400 flex items-center">
                <span className="mr-3">💻</span> Languages
              </h3>
              <div className="space-y-6">
                {[
                  { name: 'Python', level: 90 },
                  { name: 'C++', level: 85 },
                  { name: 'HTML/CSS', level: 70 }
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-6 text-purple-600 dark:text-cyan-400 flex items-center">
                <span className="mr-3">🛠️</span> Tools/Platforms
              </h3>
              <div className="flex flex-wrap gap-3">
                {['VS Code', 'Visual Studio', 'Cisco Packet Tracer', 'Google Colab'].map((tool, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-200 dark:hover:bg-cyan-900 transition-all duration-300 transform hover:scale-105"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-6 text-purple-600 dark:text-cyan-400 flex items-center">
                <span className="mr-3">📊</span> Libraries/Frameworks
              </h3>
              <div className="flex flex-wrap gap-3">
                {['.NET Framework', 'Pandas', 'Scikit-learn', 'Seaborn', 'OpenCV', 'Tensorflow'].map((lib, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-cyan-100 to-purple-100 dark:from-cyan-900 dark:to-purple-900 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-cyan-200 dark:hover:bg-pink-900 transition-all duration-300 transform hover:scale-105"
                  >
                    {lib}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Console-Based Search Engine',
                description: 'A terminal-based search engine using trees and hash maps to process queries like a pro.',
                tags: ['C++', 'DSA', 'File Handling'],
                role: 'Built search logic, ranking algo, and file parsing.',
                icon: '🔍',
                bg: 'from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900',
                text: 'text-pink-600 dark:text-pink-400'
              },
              {
                title: 'Live Stock Price Prediction',
                description: 'Predictive model forecasting stock prices with real-time chart patterns.',
                tags: ['Python', 'Scikit-learn', 'Streamlit'],
                role: 'Designed preprocessing and ML algo for trend prediction.',
                icon: '📈',
                bg: 'from-cyan-100 to-blue-100 dark:from-blue-900 dark:to-blue-900',
                text: 'text-blue-600 dark:text-blue-400'
              },
              {
                title: 'Smoke Detection System',
                description: 'Smart IoT system to detect smoke and send alerts, simulated in Cisco.',
                tags: ['Cisco', 'IoT'],
                role: 'Configured network and built logic for sensor-triggered alarms.',
                icon: '🔥',
                bg: 'from-orange-200 to-yellow-200 dark:from-orange-900 dark:to-yellow-900',
                text: 'text-orange-600 dark:text-orange-400'
              },
              {
                title: 'Auto MPG Data Analysis',
                description: 'Performed EDA and regression models to predict car fuel efficiency.',
                tags: ['Python', 'Pandas', 'Seaborn'],
                role: 'Data cleaning, visualization, and model training.',
                icon: '🚗',
                bg: 'from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900',
                text: 'text-cyan-600 dark:text-cyan-400'
              }
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className={`bg-${project.bg} p-4 rounded-full mr-4`}>
                      <span className={`text-2xl ${project.text}`}>{project.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{project.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`bg-${project.bg} text-${project.text} text-xs px-3 py-1.5 rounded-full`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Role:</span> {project.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">Hit Me Up!</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-purple-600 dark:text-cyan-400">Connect with Me</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: '📧',
                      title: 'Email',
                      value: 'msaimkhan789@gmail.com',
                      link: 'mailto:msaimkhan789@gmail.com'
                    },
                    {
                      icon: '📍',
                      title: 'Location',
                      value: 'Islamabad, Pakistan | Multan, Pakistan'
                    },
                    {
                      icon: '🌐',
                      title: 'Connect',
                      value: [
                        { name: 'LinkedIn', link: 'https://www.linkedin.com/in/muhammad-saim-khan-a31721275' },
                        { name: 'GitHub', link: 'https://github.com/saimkhan789' }
                      ]
                    }
                  ].map((info, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-pink-500 dark:text-cyan-400 text-2xl mr-4">{info.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{info.title}</h4>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 transition-colors duration-300"
                          >
                            {info.value}
                          </a>
                        ) : Array.isArray(info.value) ? (
                          <div className="flex space-x-4 mt-2">
                            {info.value.map((v, i) => (
                              <a
                                key={i}
                                href={v.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 transition-colors duration-300"
                              >
                                {v.name}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-purple-600 dark:text-cyan-400">Drop a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-pink-400 dark:border-cyan-500 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-400 dark:focus:ring-cyan-400 transition-all duration-300 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 shadow-md"
                      placeholder="Your name ✨"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-cyan-400 dark:border-pink-500 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-400 dark:focus:ring-pink-400 transition-all duration-300 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 shadow-md"
                      placeholder="Your email 📩"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows="4" 
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-purple-400 dark:border-purple-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 dark:focus:ring-purple-600 transition-all duration-300 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 shadow-md"
                      placeholder="What's the vibe? 😎"
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Send Message 🚀
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-r from-gray-900 via-purple-900 to-cyan-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpath fill=%22%23ff6b81%22 opacity=%220.05%22 d=%22M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zM50 80c-17.6 0-32-14.4-32-32S32.4 16 50 16s32 14.4 32 32-14.4 32-32 32z%22/%3E%3C/svg%23')] animate-blob opacity-30"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <p className="text-lg font-medium">© 2025 Muhammad Saim Khan made with 💖 and code :)</p>
          <div className="flex space-x-6">
            <a href="mailto:msaimkhan789@gmail.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.simpleicons.org/gmail/D14836" alt="Gmail" className="w-8 h-8 hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://www.linkedin.com/in/muhammad-saim-khan-a31721275" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png" alt="LinkedIn" className="w-8 h-8 hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://github.com/saimkhan789" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.simpleicons.org/github/181717" alt="GitHub" className="w-8 h-8 hover:scale-110 transition-all duration-300" />
            </a>
          </div>
        </div>
      </footer>

      {/* Chatbot Component */}
      <Chatbot isDark={isDark} />
    </div>
  );
};

export default App;