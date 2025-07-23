import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { jobs } from './assets/resume-data'; // Assuming you have a file that exports the jobs data
import { FaCircleChevronLeft, FaCircleChevronRight, FaCamera } from 'react-icons/fa6';

const isLightMode = true;
const devBorders = false;

const ExperienceCarousel = () => {
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const carouselRef = useRef(null);

  const nextJob = () => {
    setCurrentJobIndex((prev) => (prev + 1) % jobs.length);
  };

  const prevJob = () => {
    setCurrentJobIndex((prev) => (prev - 1 + jobs.length) % jobs.length);
  };

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: currentJobIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentJobIndex]);

  return (
      <SectionContainer id="experience">
        <CarouselContainer>
          <CarouselTrack
            ref={carouselRef}
            animate={{ x: `-${currentJobIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {jobs.map((job, index) => (
              <SectionCard
                key={`job-${index}`}
                gradient={job.gradient}
                initial="hidden"
                animate={index === currentJobIndex ? "visible" : "hidden"}
              >
                <CardImage image={job.image.location}>
                  <PhotoCredit>
                    <FaCamera size="12px" />
                    <span>{job.image.credit}</span>
                  </PhotoCredit>
                </CardImage>

                <SectionContent>
                  <SectionHeader>
                    <SectionTitle>
                      {job.title}
                    </SectionTitle>
                    <SectionDetail>
                      {job.duration}
                    </SectionDetail>
                    <JobPosition>
                      {job.position}
                    </JobPosition>
                  </SectionHeader>

                  <SectionDescription>
                    {job.bullets.map((bullet, bulletIndex) => (
                      <SectionItem
                        key={bulletIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: bulletIndex * 0.1 }}
                      >
                            {bullet}
                      </SectionItem>
                    ))}
                  </SectionDescription>

                </SectionContent>
              </SectionCard>
            ))}
          </CarouselTrack>


        </CarouselContainer>
        <NavigationContainer>
          <SectionTitle
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Experience
          </SectionTitle>
          <ButtonGroup>
            <NavButton
              onClick={prevJob}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCircleChevronLeft size="40px" color={isLightMode ? '#3c3c3c' : 'whitesmoke'} />
            </NavButton>
            <NavButton
              onClick={nextJob}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
                <FaCircleChevronRight size="40px" color={isLightMode ? '#3c3c3c' : 'whitesmoke'} />
            </NavButton>
          </ButtonGroup>
        </NavigationContainer>
      </SectionContainer>
  );
};

export default ExperienceCarousel;

// Styled Components
export const SectionContainer = styled.section.withConfig({
  displayName: 'ExperienceSection'
})`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0.5rem 10vw;
  padding-top: 5rem;
  background-color: ${isLightMode ? '#fff' : '#000'};
  
  @media (max-width: 809px) {
    padding: 0.5rem 5vw;
    padding-top: 4rem;
    height: 100%;
    justify-content: center;
    padding: 0;
  }
`;

export const SectionTitle = styled(motion.h2).withConfig({
  displayName: 'SectionTitle'
})`
  text-align: left;
  font-size: 2rem;
  font-weight: 800;
  color: ${isLightMode ? '#3c3c3c' : '#e2e2e2'};
`;

export const CarouselContainer = styled.div.withConfig({
  displayName: 'CarouselContainer'
})`
  position: relative;
  width: 100%;
  flex: 1;
  border-radius: 12px;
  background-color: ${isLightMode ? '#f9f9f9' : '#1a1a1a'};
  overflow: hidden;
  box-shadow: ${isLightMode ? '0 2px 10px rgba(0,0,0,0.1)' : '0 2px 10px rgba(255,255,255,0.1)'};
`;

export const CarouselTrack = styled(motion.div).withConfig({
  displayName: 'CarouselTrack'
})`
  display: flex;
  width: 100%;
  height: 100%;
  ${devBorders && 'border: 1px solid yellow;'}
`;

export const CardImage = styled.div.withConfig({
  displayName: 'CardImage'
})`
  width: 100%;
  height: 100%;
  align-self: center;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 0.5rem;
  position: relative;
`;

export const ButtonGroup = styled.div.withConfig({
  displayName: 'ButtonGroup'
})`
  display: flex;
  gap: 0.5rem;
`;

// Section-specific styled components for Experience

export const SectionCard = styled(motion.div).withConfig({
  displayName: 'JobCard'
})`
  min-width: 100%;
  height: 100%;
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 809px) {
    padding: 0 5vw;
    // overflow-y: auto;
  }
`;

export const SectionContent = styled.div.withConfig({
  displayName: 'JobContent'
})`
  height: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: ${isLightMode ? '#000' : 'white'};
  position: relative;
  z-index: 2;
  ${devBorders && 'border: 1px solid purple;'}
  
  @media (max-width: 809px) {
    height: auto;
    min-height: 100%;
    overflow-y: auto;
    padding: 0.5rem 0.25rem;
  }
`;

export const SectionHeader = styled(motion.div).withConfig({
  displayName: 'JobHeader'
})`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  ${devBorders && 'border: 1px solid gold;'}
  padding: 0.2rem;
  
  @media (max-width: 809px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 0.2rem;
    flex-shrink: 0;
  }
`;

export const SubTitle = styled(motion.h3).withConfig({
  displayName: 'JobTitle'
})`
  font-size: 1.4rem;
  font-weight: 700;
  text-align: left;
  color: ${isLightMode ? '#000' : '#fff'};
  
  @media (max-width: 809px) {
    font-size: 1.2rem;
    margin: 0;
    order: 1;
  }
`;

const JobPosition = styled(motion.h4).withConfig({
  displayName: 'JobPosition'
})`
  font-size: 1.0rem;
  font-weight: 600;
  color: ${isLightMode ? '#000' : '#fff'};
  
  @media (max-width: 809px) {
    font-size: 0.9rem;
    margin: 0;
    order: 2;
  }
`;

export const SectionDetail = styled(motion.div).withConfig({
  displayName: 'JobDuration'
})`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  opacity: 0.8;
  justify-self: flex-end;
  color: ${isLightMode ? '#666' : '#ccc'};
  
  @media (max-width: 809px) {
    justify-self: flex-start;
    font-size: 0.8rem;
    order: 3;
  }
`;

export const SectionDescription = styled(motion.div).withConfig({
  displayName: 'JobDescription'
})`
  padding: 0;
  margin: 0;
  ${devBorders && 'border: 1px solid red;'}
  color: ${isLightMode ? '#000' : 'white'};
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (max-width: 809px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    height: auto;
    max-height: 100%;
  }
`;

export const SectionItem = styled(motion.div).withConfig({
  displayName: 'JobItem'
})`
  font-size: 0.9rem;
  padding: 0.4rem;
  ${devBorders && 'border: 1px solid blue;'}
  text-align: center;
  border-left: 1px solid ${isLightMode ? '#ccc' : '#444'};
  
  @media (max-width: 809px) {
    text-align: left;
    border-left: none;
    border-bottom: 1px solid ${isLightMode ? '#ccc' : '#444'};
    padding: 0.6rem 0.4rem;
    font-size: 0.85rem;
  }
`;

export const NavigationContainer = styled.div.withConfig({
  displayName: 'NavigationContainer'
})`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  padding: 1rem 0;
  z-index: 10;
  flex-shrink: 0;
  ${devBorders && 'border: 1px solid green;'}
`;

export const NavButton = styled(motion.button).withConfig({
  displayName: 'NavButton'
})`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  padding: 0.5rem;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const PhotoCredit = styled.div.withConfig({
  displayName: 'PhotoCredit'
})`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.2rem 0.4rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  
  span {
    margin-left: 0.2rem;
    font-size: 0.7rem;
  }
`;