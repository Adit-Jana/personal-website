import React, { useState, useEffect } from 'react';
import { Menu, X, User, Briefcase, Eye, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter, ChevronRight, Star, Award, Download } from 'lucide-react';

const PersonalWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Download Resume Button handler
  const handleResumeDownload = () => {
    // Create a new anchor element
    const link = document.createElement('a');

    // Set href to resume file in the public folder
    link.href = '/RenderCV_EngineeringResumes_Theme (1).pdf'; // Make sure the file is placed inside /public

    // Define a custom filename
    link.download = 'Adit_Jana_Java_SpringBoot_Kafka_6yrs_Resume.pdf';

    // Append to the DOM and trigger click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: Eye },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const services = [
    {
      title: 'Web Development',
      description: 'Creating responsive, modern websites and web applications using latest technologies.',
      icon: '🌐',
      features: ['React & Next.js', 'Node.js Backend', 'Database Integration', 'API Development']
    },
    {
      title: 'Mobile Development',
      description: 'Building cross-platform mobile applications for iOS and Android.',
      icon: '📱',
      features: ['React Native', 'Flutter', 'iOS Development', 'Android Development']
    },
    {
      title: 'UI/UX Design',
      description: 'Designing intuitive and beautiful user interfaces with great user experience.',
      icon: '🎨',
      features: ['Figma Design', 'Prototyping', 'User Research', 'Design Systems']
    },
    {
      title: 'Consulting',
      description: 'Providing technical consultation and project management services.',
      icon: '💡',
      features: ['Architecture Planning', 'Code Review', 'Performance Optimization', 'Team Mentoring']
    }
  ];

  const portfolioItems = [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      tech: ['React Native', 'Firebase'],
      link: '#'
    },
    {
      title: 'SaaS Dashboard',
      description: 'Analytics dashboard for business intelligence',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      tech: ['Vue.js', 'D3.js', 'Python'],
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900">
      {/* Sidebar Navigation */}
      <nav className={`fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 transform transition-transform duration-300 z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-xl font-bold">Portfolio</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="lg:hidden text-white hover:text-blue-400"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="space-y-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    <IconComponent size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 left-6 z-40 lg:hidden bg-black/20 backdrop-blur-lg p-3 rounded-lg text-white hover:bg-white/10 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img
                src="/Red Modern Formal Facebook Profile Picture Update 1.gif"
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-500 shadow-2xl"
              />
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Adit <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Jana</span>
              </h1>
              <p className="text-2xl md:text-3xl text-blue-300 mb-6">Java Microservices Developer</p>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Passionate about creating innovative digital solutions and turning ideas into reality through code
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Eye size={20} />
                  <span>View My Work</span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-blue-500 text-blue-400 px-8 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Mail size={20} />
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop"
                  alt="About me"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  With over 5 years of experience in software development, I specialize in creating
                  robust web applications and mobile solutions. My passion lies in solving complex
                  problems and delivering exceptional user experiences.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I work with modern technologies including React, Node.js, Python, and cloud platforms
                  to build scalable applications. I believe in writing clean, maintainable code and
                  following best practices.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10">
                    <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                    <div className="text-gray-300">Projects Completed</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10">
                    <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
                    <div className="text-gray-300">Years Experience</div>
                  </div>
                </div>

                {/* download resume button */}
                <button
                  onClick={handleResumeDownload}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Download size={20} />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-teal-300 text-sm flex items-center">
                        <ChevronRight size={16} className="mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Portfolio</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <a href={item.link} className="text-white hover:text-blue-400">
                        <ExternalLink size={24} />
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((tech, idx) => (
                        <span key={idx} className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let's Work Together</h3>
                <p className="text-gray-300 mb-8">
                  Have a project in mind? Let's discuss how we can bring your ideas to life.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-gray-300">
                    <Mail size={20} className="text-blue-400" />
                    <span>john.doe@email.com</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <Phone size={20} className="text-blue-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <MapPin size={20} className="text-blue-400" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="text-green-400 text-center">Message sent successfully!</div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-center">Failed to send message. Please try again.</div>
                )}

                <button
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
            </div>
            <div className="text-gray-400 mb-4">
              <p>&copy; 2025 John Doe. All rights reserved.</p>
            </div>
            <div className="text-gray-500 text-sm">
              <p>Built with React & Tailwind CSS</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PersonalWebsite;