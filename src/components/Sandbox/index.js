import React, { useState, useRef } from 'react'
// import DogBox from './DogBox'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { technologies } from '../TechExperience/index'
import TechItem from '../TechExperience/TechItem'

const SandboxContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(100, 100, 100, 0.5);
  @media (max-width: 600px) {
    flex-direction: column;
  }
`
const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const DragRefContainer = styled(motion.div)`
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    cursor: pointer;
`
const TargetRefContainer = styled.div`
    width: 50%;
`
const TechDescription = styled.div`
  padding: 0.25rem;
  margin: 0.25rem;
  display: flex;
  flex-direction: row;
  height: 250px;
  border-radius: 1rem;
  @media (max-width: 600px) {
    max-width: 320px;
    height: 200px;
  }
`
const TechNote = styled.div`
  padding: 0.5rem;
  margin: 1rem;
`
const TechContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
`
const TechDetailsContainer = styled.div`
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`
const TechIcon = styled.img`
    padding: 0.25rem;
    margin: 0.25rem;
    width: 75px;
    border-radius: 5px;
`

export default function Sandbox () {
  const containerRef = useRef(null)
  const targetRef = useRef(null)
  const [selected, setSelected] = useState(null)

  const handleDragEnd = (item) => {
    // icon location === target location
    const thing = true
    if (thing) {
      const newSelected = selected && selected.title === item.title ? null : item
      setSelected(newSelected)
    }
  }

  return (
    <SandboxContainer ref={containerRef}>
      <TargetRefContainer draggable ref={targetRef}>
        <TechDescription>
          {selected ? (
            <TechDetailsContainer>
              <TechIcon src={selected.icon} />
              <TechContent>
                <h3>{selected.title}</h3>
                {selected.description}
              </TechContent>
            </TechDetailsContainer>
          )
            : <TechNote>Drag to move icons around (just for fun), then select an icon for a brief overview</TechNote>}
        </TechDescription>
      </TargetRefContainer>
      <ExperienceContainer>
        {technologies.map((i, index) => {
          return (
            <DragRefContainer
              key={`${index}-tech-elastic-item`}
              drag
              dragConstraints={containerRef}
              onDragEnd={() => handleDragEnd(i)}
              selected={selected && selected.title === i.title}
            >
              <TechItem
                elastic
                small
                title={i.title}
                icon={i.icon}
              />
            </DragRefContainer>)
        })}
      </ExperienceContainer>
    </SandboxContainer>
  )
}
