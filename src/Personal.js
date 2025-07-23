import React, { useState, useEffect, useRef } from 'react';
import { personalData } from './assets/personal-data'
import { FaCamera, } from 'react-icons/fa6';
import { 
  SectionTitle, 
  SectionContainer,
  PhotoCredit
} from './Experience';
import styled from 'styled-components';

const isLightMode = true;

const PersonalCarousel = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const carouselRef = useRef(null);

  const nextItem = () => {
    setCurrentItemIndex((prev) => (prev + 1) % personalData.length);
  };

  const prevItem = () => {
    setCurrentItemIndex((prev) => (prev - 1 + personalData.length) % personalData.length);
  };

  const handleCardClick = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
          <SectionTitle>Personal</SectionTitle>
          <PictureCollage>
            {personalData.map((item, index) => (
              <SquareCard 
                key={index} 
                isFlipped={flippedCards[index]}
                onClick={() => handleCardClick(index)}
              >
                <CardInner isFlipped={flippedCards[index]}>
                  <CardFront backgroundImage={item.image.location}>
                    <PhotoCredit>
                      <FaCamera size="12px" />
                      <span>{item.image.credit}</span>
                    </PhotoCredit>
                    <CardTitle>{item.title}</CardTitle>
                  </CardFront>
                  <CardBack>
                    <CardContent>
                      <BackCardTitle>{item.title}</BackCardTitle>
                      <CardCategory>{item.category}</CardCategory>
                      <CardDescription>{item.description}</CardDescription>
                      <CardBullets>
                        {item.bullets.map((bullet, bulletIndex) => (
                          <BulletPoint key={bulletIndex}>• {bullet}</BulletPoint>
                        ))}
                      </CardBullets>
                    </CardContent>
                  </CardBack>
                </CardInner>
                </SquareCard>
            ))}
          </PictureCollage>     
        </SectionContainer>
  );
};

export default PersonalCarousel;

const PictureCollage = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
    justify-items: center;
  }
`;

const SquareCard = styled.div`
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  height: 300px;
  
  @media (max-width: 768px) {
    width: 90vw;
    height: 90vw;
    max-width: 380px;
    max-height: 380px;
    margin: 0 auto;
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 12px;
  
  /* Dark overlay for better text readability */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
    border-radius: 8px;
    z-index: 1;
  }
  
  /* Ensure content is above overlay */
  > * {
    position: relative;
    z-index: 2;
  }
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid ${isLightMode ? '#676767' : '#fff'};
  border-radius: 8px;
  background-color: ${isLightMode ? '#fff' : '#676767'};
  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContent = styled.div`
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardCategory = styled.p`
  color: ${isLightMode ? '#666' : '#ccc'};
  font-family: 'Host Grotesk', sans-serif;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
  font-style: italic;
`;

const CardDescription = styled.p`
  color: ${isLightMode ? '#333' : '#ddd'};
  font-family: 'Host Grotesk', sans-serif;
  font-size: 0.85rem;
  margin: 0;
  text-align: center;
  line-height: 1.4;
`;

const CardBullets = styled.ul`
  color: ${isLightMode ? '#444' : '#ccc'};
  font-family: 'Host Grotesk', sans-serif;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;
`;

const BulletPoint = styled.li`
  margin-bottom: 0.3rem;
  line-height: 1.3;
`;

const BackCardTitle = styled.h3`
  color: ${isLightMode ? '#252525' : '#fff'};
  font-family: 'Host Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

const CardTitle = styled.h3`
  color: white;
  font-family: 'Host Grotesk', sans-serif;
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;