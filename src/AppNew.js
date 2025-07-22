import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components';
import { HiMenu, HiX } from 'react-icons/hi';
import wallpaper from './assets/icon-images/canada.jpg';
import ExperienceCarousel, { NavButton } from './Experience';
import PersonalCarousel from './Personal';

// Global styles for fonts
const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300;400;500;600;700&display=swap');
  
  * {
    font-family: 'Host Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  }
`;

const isLightMode = true;

// Breakpoints
const breakpoints = {
  mobile: '809px',
  tablet: '1439px'
};

const devBorders = false;

const AppNew = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openContactModal = () => {
    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const mailtoLink = `mailto:mitchellgsides@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;
    
    // Try to open mailto link
    window.location.href = mailtoLink;
    
    // Close modal
    closeContactModal();
  };


  useEffect(() => {
    const handleScroll = () => {
    //   const heroSection = document.getElementById('hero');
      const experienceSection = document.getElementById('experience');
      const personalSection = document.getElementById('personal');
      const bottomHeroSection = document.getElementById('bottom-hero');
      const contactSection = document.getElementById('contact');
      
      const scrollPosition = window.scrollY + 100;
      setScrollY(window.scrollY);

      if (scrollPosition < experienceSection.offsetTop) {
        setActiveSection('hero');
      } else if (scrollPosition < personalSection.offsetTop) {
        setActiveSection('experience');
      } else if (scrollPosition < bottomHeroSection.offsetTop) {
        setActiveSection('personal');
      } else if (scrollPosition < contactSection.offsetTop) {
        setActiveSection('bottom-hero');
      } else {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
    closeMobileMenu();
  };

  return (
    <Container>
      <GlobalFonts />
      <FloatingHeader activeSection={activeSection} scrollY={scrollY}>
        <HeaderContent>
          <Logo scrollY={scrollY} onClick={() => scrollToSection('hero')}>Mitchell G Sides</Logo>
          
          {/* Desktop Navigation */}
          <Nav>
            <NavItem 
              scrollY={scrollY}
              active={activeSection === 'experience'}
              onClick={() => scrollToSection('experience')}
            >
              Experience
            </NavItem>
            <NavItem 
              scrollY={scrollY}
              active={activeSection === 'personal'}
              onClick={() => scrollToSection('personal')}
            >
              Personal
            </NavItem>
            <NavItem 
              scrollY={scrollY}
              active={activeSection === 'bottom-hero'}
              onClick={() => scrollToSection('bottom-hero')}
            >
              Contact
            </NavItem>
          </Nav>

          {/* Mobile Menu Button */}
          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </MobileMenuButton>
        </HeaderContent>

        {/* Mobile Menu Dropdown */}
        <MobileMenuDropdown isOpen={mobileMenuOpen}>
          <MobileNavItem 
            active={activeSection === 'experience'}
            onClick={() => scrollToSection('experience')}
          >
            Experience
          </MobileNavItem>
          <MobileNavItem 
            active={activeSection === 'personal'}
            onClick={() => scrollToSection('personal')}
          >
            Personal
          </MobileNavItem>
          <MobileNavItem 
            active={activeSection === 'bottom-hero'}
            onClick={() => scrollToSection('bottom-hero')}
          >
            Contact
          </MobileNavItem>
        </MobileMenuDropdown>
      </FloatingHeader>

      <HeroSection id="hero">
        <HeroContent>
          <MainTitle>Mitchell G Sides</MainTitle>
          <SubTitle>Welcome to my resume</SubTitle>
        </HeroContent>
      </HeroSection>

      <ExperienceCarousel />
      <PersonalCarousel />

      {/* Bottom Contact Hero for style */}
      <BottomHeroSection id="bottom-hero">
        <HeroContent>
            <MainTitle>Contact</MainTitle>
            <HeroContactLink 
              onClick={openContactModal}
            >
              Get in Touch
            </HeroContactLink>
        </HeroContent>
      </BottomHeroSection>

      {/* Contact Modal */}
      {contactModalOpen && (
        <ContactModal onClick={closeContactModal}>
          <ContactModalContent onClick={(e) => e.stopPropagation()}>
            <ContactModalHeader>
              <ContactModalTitle>Get in Touch</ContactModalTitle>
              <CloseButton onClick={closeContactModal}>&times;</CloseButton>
            </ContactModalHeader>
            
            <ContactForm onSubmit={handleFormSubmit}>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Subject</FormLabel>
                <FormInput
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Message</FormLabel>
                <FormTextarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows="5"
                  required
                />
              </FormGroup>
              
              <SubmitButton type="submit">Send Message</SubmitButton>
            </ContactForm>
          </ContactModalContent>
        </ContactModal>
      )}

      <ContactSection id="contact">
  <ContactContainer>
    <ContactGrid>
      <ContactColumn>
        <ContactTitle>Links</ContactTitle>
        <ContactList>
          <ContactLink href="https://linkedin.com/in/mitchell-sides" target="_blank">LinkedIn</ContactLink>
          <ContactLink href="https://github.com/mitchellgsides" target="_blank">GitHub</ContactLink>
          <ContactLink href="mailto:mitchellgsides@gmail.com">Email</ContactLink>
        </ContactList>
      </ContactColumn>
      
      <ContactColumn>
        <ContactTitle>Location</ContactTitle>
        <ContactAddress>
          <ContactText>The Woodlands, TX, USA</ContactText>
          <ContactText>United States</ContactText>
        </ContactAddress>
      
        <ContactTitle>Contact</ContactTitle>
        <ContactInfo>
          <ContactText>+1 (832) 244-4599</ContactText>
          <ContactText>mitchellgsides@gmail.com</ContactText>
        </ContactInfo>
      </ContactColumn>
    </ContactGrid>
    
    <ContactFooter>
      <FooterText>© 2025 Mitchell G Sides. All rights reserved.</FooterText>
      <FooterCredit>Designed by Mitchell Sides</FooterCredit>
    </ContactFooter>
  </ContactContainer>
</ContactSection>
      
    </Container>
  )
}

export default AppNew;

// Floating Header
const FloatingHeader = styled.header.withConfig({
  displayName: 'FloatingHeader'
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 4px;
  transition: all 0.3s ease;
  background: ${props => {
    const maxScroll = 500;
    const opacity = Math.min(props.scrollY / maxScroll, 0.8);
    return isLightMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`;
  }};
  backdrop-filter: ${props => {
    const isMobile = window.innerWidth <= 809;
    if (isMobile && props.scrollY > 50) {
      return 'blur(10px)';
    }
    return 'none';
  }};
  

  /* Responsive */
  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px;
  }
`;

const HeaderContent = styled.div.withConfig({
  displayName: 'HeaderContent'
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
`;

const Nav = styled.nav.withConfig({
  displayName: 'Nav'
})`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  z-index: 1000;
  position: relative;
  
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const NavItem = styled.button.withConfig({
  displayName: 'NavItem'
})`
  background: none;
  border: none;
  color: ${props => {
    const maxScroll = 500;
    const opacity = Math.min(props.scrollY / maxScroll, 0.8);
    // Start light, transition to dark as background opacity increases
    if (isLightMode) {
      return `rgba(${255 - (255 * opacity)}, ${255 - (255 * opacity)}, ${255 - (255 * opacity)}, 1)`;
    } else {
      // Start dark, transition to light as background opacity increases
      return `rgba(${255 * opacity}, ${255 * opacity}, ${255 * opacity}, 1)`;
    }
  }};
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '500'};
  font-family: 'Host Grotesk', sans-serif;
  border-bottom: ${props => props.active ? (isLightMode ? '1px solid #000' : '1px solid #fff') : 'none'};
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
  letter-spacing: -0.01em;
  
  &:hover {
    color: ${isLightMode ? '#000' : '#fff'};
    transform: scale(1.1);
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const Logo = styled(NavButton).withConfig({
  displayName: 'Logo'
})`
  font-size: 24px;
  width: 100%;
  color: ${props => {
    const maxScroll = 500;
    const opacity = Math.min(props.scrollY / maxScroll, 0.8);
    // Start light, transition to dark as background opacity increases
    if (isLightMode) {
      return `rgba(${255 - (255 * opacity)}, ${255 - (255 * opacity)}, ${255 - (255 * opacity)}, ${opacity})`;
    } else {
      return `rgba(${255 * opacity}, ${255 * opacity}, ${255 * opacity}, ${opacity})`;
    }
  }};
  font-weight: 600;
  font-family: 'Host Grotesk', sans-serif;
`;

// Mobile Menu Components
const MobileMenuButton = styled.button.withConfig({
  displayName: 'MobileMenuButton'
})`
  display: none;
  background: none;
  border: none;
  color: ${isLightMode ? '#000' : '#fff'};
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${isLightMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;

const MobileMenuDropdown = styled.div.withConfig({
  displayName: 'MobileMenuDropdown'
})`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${isLightMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(26, 26, 26, 0.95)'};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${isLightMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 997;
  
  @media (min-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const MobileNavItem = styled.button.withConfig({
  displayName: 'MobileNavItem'
})`
  background: none;
  border: none;
  color: ${props => props.active ? (isLightMode ? '#000' : '#fff') : (isLightMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)')};
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '500'};
  font-family: 'Host Grotesk', sans-serif;
  cursor: pointer;
  padding: 16px 20px;
  transition: all 0.3s ease;
  text-align: left;
  letter-spacing: -0.01em;
  border-bottom: 1px solid ${isLightMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: ${isLightMode ? '#000' : '#fff'};
    background: ${isLightMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
  }
  
  ${props => props.active && `
    background: ${isLightMode ? 'rgba(10, 10, 10, 0.05)' : 'rgba(245, 245, 245, 0.05)'};
    border-left: 1px solid ${isLightMode ? '#000' : '#fff'};
  `}
`;

// Hero Section
const HeroSection = styled.section.withConfig({
  displayName: 'HeroSection'
})`
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.7) 100%), url(${wallpaper});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroContent = styled.div.withConfig({
  displayName: 'HeroContent'
})`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    text-align: left;
    color: #fff;
`;

const MainTitle = styled.h1.withConfig({
  displayName: 'MainTitle'
})`
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 1rem;
  font-family: 'Host Grotesk', sans-serif;
  letter-spacing: -0.02em;
  
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 3rem;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled.p.withConfig({
  displayName: 'SubTitle'
})`
  font-size: 1.5rem;
  font-weight: 300;
  font-family: 'Host Grotesk', sans-serif;
  letter-spacing: -0.01em;
  
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.3rem;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

// Bottom Hero Section
const BottomHeroSection = styled(HeroSection).withConfig({
    displayName: 'BottomHero'
})`
    height: 40vh;
    min-height: 400px;
`;

// Contact Section
const ContactSection = styled.section.withConfig({
  displayName: 'ContactSection'
})`
  background-color: ${isLightMode ? '#f8f9fa' : '#000'};
  color: ${isLightMode ? '#000' : '#fff'};
  min-height: 60vh;
  padding: 80px 0 40px 0;
  ${devBorders && 'border: 1px solid green;'}
`;

const ContactContainer = styled.div.withConfig({
  displayName: 'ContactContainer'
})`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 20px;
    gap: 40px;
  }
`;

const ContactGrid = styled.div.withConfig({
  displayName: 'ContactGrid'
})`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;  
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactColumn = styled.div.withConfig({
  displayName: 'ContactColumn'
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  ${devBorders && 'border: 1px solid green;'}
`;

const ContactTitle = styled.h2.withConfig({
  displayName: 'ContactTitle'
})`
  font-weight: 600;
  font-family: 'Host Grotesk', sans-serif;
  color: ${isLightMode ? '#000' : '#fff'};
  text-align: left;
`;

const ContactList = styled.div.withConfig({
  displayName: 'ContactList'
})`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const ContactLink = styled.a.withConfig({
  displayName: 'ContactLink'
})`
  color: ${isLightMode ? '#666' : '#999'};
  text-decoration: none;
  font-size: 1rem;
  font-family: 'Host Grotesk', sans-serif;
  font-weight: 400;
  transition: color 0.3s ease;
  padding: 0px;
  &:hover {
    color: ${isLightMode ? '#000' : '#fff'};
  }
`;

const ContactAddress = styled.div.withConfig({
  displayName: 'ContactAddress'
})`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 30px;
`;

const ContactInfo = styled.div.withConfig({
  displayName: 'ContactInfo'
})`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
`;

const ContactText = styled.p.withConfig({
  displayName: 'ContactText'
})`
  color: ${isLightMode ? '#666' : '#999'};
  font-size: 1rem;
  font-family: 'Host Grotesk', sans-serif;
  font-weight: 400;
  margin: 0;
  line-height: 1.5;
`;

const ContactFooter = styled.div.withConfig({
  displayName: 'ContactFooter'
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 40px;
  border-top: 1px solid ${isLightMode ? '#e0e0e0' : '#333'};
  gap: 20px;
  
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 16px;
  }
`;

const FooterText = styled.p.withConfig({
  displayName: 'FooterText'
})`
  color: ${isLightMode ? '#999' : '#666'};
  font-size: 0.9rem;
  font-family: 'Host Grotesk', sans-serif;
  margin: 0;
`;

const FooterCredit = styled.p.withConfig({
  displayName: 'FooterCredit'
})`
  color: ${isLightMode ? '#999' : '#666'};
  font-size: 0.9rem;
  font-family: 'Host Grotesk', sans-serif;
  margin: 0;
  text-align: right;
  
  @media (max-width: ${breakpoints.tablet}) {
    text-align: center;
  }
`;

// Contact Link for Hero Section
const HeroContactLink = styled.button.withConfig({
  displayName: 'HeroContactLink'
})`
  background: none;
  border: 1px solid #fff;
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 300;
  font-family: 'Host Grotesk', sans-serif;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 12px 24px;
  border-radius: 4px;
  
  &:hover {
    background: #fff;
    color: #000;
    transform: scale(1.02);
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.3rem;
    padding: 10px 20px;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
    padding: 8px 16px;
  }
`;

// Modal Components
const ContactModal = styled.div.withConfig({
  displayName: 'ContactModal'
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ContactModalContent = styled.div.withConfig({
  displayName: 'ContactModalContent'
})`
  background: ${isLightMode ? '#fff' : '#1a1a1a'};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const ContactModalHeader = styled.div.withConfig({
  displayName: 'ContactModalHeader'
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ContactModalTitle = styled.h2.withConfig({
  displayName: 'ContactModalTitle'
})`
  font-family: 'Host Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${isLightMode ? '#000' : '#fff'};
  margin: 0;
`;

const CloseButton = styled.button.withConfig({
  displayName: 'CloseButton'
})`
  background: none;
  border: none;
  font-size: 2rem;
  color: ${isLightMode ? '#666' : '#999'};
  cursor: pointer;
  line-height: 1;
  
  &:hover {
    color: ${isLightMode ? '#000' : '#fff'};
  }
`;

const ContactForm = styled.form.withConfig({
  displayName: 'ContactForm'
})`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div.withConfig({
  displayName: 'FormGroup'
})`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label.withConfig({
  displayName: 'FormLabel'
})`
  font-family: 'Host Grotesk', sans-serif;
  font-weight: 500;
  color: ${isLightMode ? '#000' : '#fff'};
`;

const FormInput = styled.input.withConfig({
  displayName: 'FormInput'
})`
  padding: 0.75rem;
  border: 1px solid ${isLightMode ? '#ddd' : '#555'};
  border-radius: 4px;
  font-family: 'Host Grotesk', sans-serif;
  font-size: 1rem;
  background: ${isLightMode ? '#fff' : '#2a2a2a'};
  color: ${isLightMode ? '#000' : '#fff'};
  
  &:focus {
    outline: none;
    border-color: ${isLightMode ? '#000' : '#fff'};
  }
`;

const FormTextarea = styled.textarea.withConfig({
  displayName: 'FormTextarea'
})`
  padding: 0.75rem;
  border: 1px solid ${isLightMode ? '#ddd' : '#555'};
  border-radius: 4px;
  font-family: 'Host Grotesk', sans-serif;
  font-size: 1rem;
  background: ${isLightMode ? '#fff' : '#2a2a2a'};
  color: ${isLightMode ? '#000' : '#fff'};
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: ${isLightMode ? '#000' : '#fff'};
  }
`;

const SubmitButton = styled.button.withConfig({
  displayName: 'SubmitButton'
})`
  padding: 0.75rem 1.5rem;
  background: ${isLightMode ? '#000' : '#fff'};
  color: ${isLightMode ? '#fff' : '#000'};
  border: none;
  border-radius: 4px;
  font-family: 'Host Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${isLightMode ? '#333' : '#ddd'};
    transform: scale(1.02);
  }
`;

const Container = styled.div.withConfig({
  displayName: 'Container'
})`
  color: ${isLightMode ? '#000' : '#fff'};
  font-family: 'Host Grotesk', sans-serif;
  background-color: ${isLightMode ? '#fff' : '#000'};
`;