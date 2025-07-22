import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { personalData } from '../src/assets/personal-data'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { 
  CarouselContainer, 
  CarouselTrack, 
  CardImage, 
  ButtonGroup,
  SectionTitle, 
  SectionContainer,
  SectionItem,
  NavigationContainer,
  NavButton,
  SubTitle,
  SectionCard,
  SectionContent,
  SectionDetail,
  SectionHeader,
  SectionDescription
} from './Experience';

const isLightMode = true;

const PersonalCarousel = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const carouselRef = useRef(null);

  const nextItem = () => {
    setCurrentItemIndex((prev) => (prev + 1) % personalData.length);
  };

  const prevItem = () => {
    setCurrentItemIndex((prev) => (prev - 1 + personalData.length) % personalData.length);
  };

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: currentItemIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentItemIndex]);

  return (
      <SectionContainer id="personal">
        <CarouselContainer>
          <CarouselTrack
            ref={carouselRef}
            animate={{ x: `-${currentItemIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {personalData.map((item, index) => (
              <SectionCard
                key={`job-${index}`}
                gradient={personalData.gradient}
                initial="hidden"
                animate={index === currentItemIndex ? "visible" : "hidden"}
              >
                <CardImage image={item.image} />

                <SectionContent>
                  <SectionHeader>
                    <SubTitle>
                      {item.title}
                    </SubTitle>
                    <SectionDetail>
                      {item.category}
                    </SectionDetail>
                  </SectionHeader>

                  <SectionDescription>
                    {item.bullets.map((bullet, bulletIndex) => (
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
            Personal
          </SectionTitle>
          <ButtonGroup>
            <NavButton
              onClick={prevItem}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCircleChevronLeft size="40px" color={isLightMode ? '#3c3c3c' : 'whitesmoke'} />
            </NavButton>
            <NavButton
              onClick={nextItem}
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

export default PersonalCarousel;