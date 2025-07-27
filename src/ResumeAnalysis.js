import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  SectionContainer, 
  SectionTitle 
} from './Experience';

// --- YOUR RESUME TEXT ---
const myResumeText = `
MITCHELL SIDES
+1 (832) 244-4599 | mitchellgsides@gmail.com | The Woodlands, TX, USA | linkedin.com/in/mitchell-sides

EDUCATION
University of Texas - Austin
Bachelor's, Education
August 2011 - December 2015

PROFESSIONAL EXPERIENCE

TrainerRoad
Senior Software Engineer | Reno, NV, USA
June 2021 - April 2025
- Delivered a seamless user experience across web, mobile, and desktop platforms in front-end development with React, React Native, Electron, and TypeScript.
- Enhanced code quality and maintainability in an agile, cross-functional environment by championing code reviews and promoting best practices.
- Improved application performance and accessibility for project management software using React, TypeScript, CSS (styled-components), and C#.
- Strengthened platform reliability by updating and maintaining RESTful APIs in C# and .NET Core.
- Improved component library efficiency by applying and extending an internal component library in Storybook.

SparkCognition
Software Engineer | Austin, TX, USA
March 2020 - June 2021
- Improved application usability and scalability by leading the migration of legacy Django templates to a modern React architecture.
- Enhanced frontend reliability by implementing React Context and Hooks during a major refactor.
- Accelerated feature delivery and UI consistency by collaborating with remote teams on user-facing features.

Complyify
Front End Developer | Austin, TX, USA
June 2019 - January 2020
- Enhanced product scalability by developing modular front-end architecture for SDK integration using React, Redux, and TypeScript.
- Improved user experience and accessibility by implementing responsive UI features for Stripe and Intercom integrations.

SKILLS
React.js, React Native, TypeScript, JavaScript, Redux.js, Node.js, Git, Postgres, C#, UI/UX Design, HTML/CSS, AngularJS
`;

const isLightMode = true;

const JobAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState('');
  // State to hold the fully generated prompt
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  // State to manage the button's confirmation text
  const [copyButtonText, setCopyButtonText] = useState('Copy Prompt');

  // This function BUILDS the prompt and displays it
  const handleGeneratePrompt = () => {
    if (!jobDescription.trim()) {
      alert('Please paste a job description first.');
      return;
    }

    const fullPrompt = `
Please act as a professional hiring manager.
Analyze the following resume against the provided job description.
Provide a concise summary of how well the candidate's skills and experience match the role's requirements.
Conclude with a percentage match score and a brief list of the top 3 matching skills and any potential gaps.

--- MITCHELL'S RESUME ---
${myResumeText}

--- JOB DESCRIPTION ---
${jobDescription}
    `;

    setGeneratedPrompt(fullPrompt.trim());
    setCopyButtonText('Copy Prompt'); // Reset button text if they generate a new one
  };

  // This function COPIES the generated prompt to the clipboard
  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy Prompt'), 2000); // Revert after 2 seconds
    }).catch(err => {
      console.error('Could not copy text: ', err);
      alert('Failed to copy prompt.');
    });
  };

  return (
    <SectionContainer id="resume-analysis">
      <SectionTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Resume Analysis
      </SectionTitle>
      
      <AnalysisContainer>
        <AnalysisCard>
          <CardTitle>How Well Do I Fit Your Company and Role?</CardTitle>

          {/* STEP 1 */}
          <StepSection>
            <StepTitle>Step 1: Paste Job Description</StepTitle>
            <StepDescription>
              Paste a job description below and click "Generate Prompt".
            </StepDescription>
            <StyledTextarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
            />
            <PrimaryButton onClick={handleGeneratePrompt}>
              Generate Analysis Prompt
            </PrimaryButton>
          </StepSection>

          {/* STEP 2 - This section is hidden until a prompt is generated */}
          {generatedPrompt && (
            <StepSection>
              <StepTitle>Step 2: Copy and Use Prompt</StepTitle>
              <StepDescription>
                Copy the generated prompt below and paste it into Claude, ChatGPT, or your favorite LLM tool.
              </StepDescription>
              <ReadOnlyTextarea
                readOnly
                value={generatedPrompt}
              />
              <ButtonGroup>
                <SecondaryButton onClick={handleCopy}>
                  {copyButtonText}
                </SecondaryButton>
                <ExternalLink href="https://chat.openai.com" target="_blank" rel="noopener noreferrer">
                  <PrimaryButton as="div">
                    Open ChatGPT
                  </PrimaryButton>
                </ExternalLink>
              </ButtonGroup>
            </StepSection>
          )}
        </AnalysisCard>
      </AnalysisContainer>
    </SectionContainer>
  );
};

export default JobAnalyzer;

// Styled Components
const AnalysisContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 70vh;
`;

const AnalysisCard = styled(motion.div)`
  background: ${isLightMode ? '#ffffff' : '#1a1a1a'};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 800px;
  width: 100%;
  border: 1px solid ${isLightMode ? '#e0e0e0' : '#333'};
`;

const CardTitle = styled.h3`
  font-family: 'Host Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${isLightMode ? '#2d3748' : '#ffffff'};
  margin-bottom: 30px;
  text-align: center;
`;

const StepSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StepTitle = styled.h4`
  font-family: 'Host Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${isLightMode ? '#2d3748' : '#ffffff'};
  margin-bottom: 10px;
`;

const StepDescription = styled.p`
  font-family: 'Host Grotesk', sans-serif;
  font-size: 1rem;
  color: ${isLightMode ? '#4a5568' : '#a0a0a0'};
  margin-bottom: 15px;
  line-height: 1.5;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 15px;
  border: 2px solid ${isLightMode ? '#e2e8f0' : '#4a5568'};
  border-radius: 8px;
  font-family: 'Host Grotesk', sans-serif;
  font-size: 0.95rem;
  background: ${isLightMode ? '#ffffff' : '#2d3748'};
  color: ${isLightMode ? '#2d3748' : '#ffffff'};
  resize: vertical;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${isLightMode ? '#3182ce' : '#63b3ed'};
  }
  
  &::placeholder {
    color: ${isLightMode ? '#a0aec0' : '#718096'};
  }
`;

const ReadOnlyTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  border: 2px solid ${isLightMode ? '#e2e8f0' : '#4a5568'};
  border-radius: 8px;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.9rem;
  background: ${isLightMode ? '#f7fafc' : '#1a202c'};
  color: ${isLightMode ? '#2d3748' : '#e2e8f0'};
  resize: vertical;
  cursor: text;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-family: 'Host Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  background: ${isLightMode ? '#3182ce' : '#63b3ed'};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 15px;
  
  &:hover {
    background: ${isLightMode ? '#2c5aa0' : '#4299e1'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  padding: 12px 24px;
  border: 2px solid ${isLightMode ? '#38a169' : '#68d391'};
  border-radius: 8px;
  font-family: 'Host Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  background: ${isLightMode ? '#38a169' : '#68d391'};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${isLightMode ? '#2f855a' : '#48bb78'};
    border-color: ${isLightMode ? '#2f855a' : '#48bb78'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ExternalLink = styled.a`
  text-decoration: none;
  
  ${PrimaryButton} {
    background: ${isLightMode ? '#1a202c' : '#2d3748'};
    margin-top: 0;
    
    &:hover {
      background: ${isLightMode ? '#2d3748' : '#4a5568'};
    }
  }
`;