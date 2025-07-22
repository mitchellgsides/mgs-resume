import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import CalculatorPage from './components/CalculatorPage/index'
import FileAnalysis from './components/FileAnalysis/index'
import ContactPage from './components/ContactPage'
import DemoAppDisplay from './components/DemoAppDisplay'
import TechExperience from './components/TechExperience'
import About from './components/About'
import Projects from './components/ProjectsPage'
import NavBar from './components/NavBar'
import mountain from './assets/icon-images/Tetons.jpg'
import {
  AppContainer,
  MainContainer,
  InnerContainer,
  ContactSection,
  ContactContainer,
  InfoSection,
  InfoSectionMobile,
  ContactSectionMobile,
  MobileContactSection,
  PageTitle
} from './Styles'
import { Icon } from './components/Icon'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import UserContext from './UserContext'
import Sandbox from './components/Sandbox'
import AppNew from './AppNew'
import styled from 'styled-components'

const stravaProps = {
  title: 'StravaPR',
  link: 'https://mitchellgsides.github.io/Strava-PR-Lister/'
}

const quizProps = {
  title: 'Physiology Quiz App',
  link: 'https://mitchellgsides.github.io/quiz-app/'
}

const routes = [
  { path: '/', exact: true, title: 'Home', component: About },
  { path: '/experience', exact: true, title: 'Experience', component: TechExperience },
  {
    path: '/projects',
    exact: true,
    title: 'Projects',
    component: Projects
  },
  { path: '/projects/sandbox', exact: true, title: 'React Sandbox', component: Sandbox, description: 'React Sandbox for developing features, trying out new things, and exploring React and other libraries\' capabilities.', requiresParent: true },
  { path: '/projects/file-analysis', exact: true, title: 'Ride File Analysis', component: FileAnalysis, description: '', requiresParent: true },
  { path: '/projects/triathlon', exact: true, title: 'Triathlon Pace', component: CalculatorPage, description: 'This app allows you to set a distance, time, and pace, and see your total time for a triathlon.', requiresParent: true },
  { path: '/projects/strava-pr', exact: true, title: 'Strava PR Lister', component: () => DemoAppDisplay(stravaProps), description: 'Strava PR Grabs Data from Strava and shows brief overview of your last several rides or runs.', requiresParent: true },
  { path: '/projects/quiz-app', exact: true, title: 'Physiology Quiz', component: () => DemoAppDisplay(quizProps), description: 'This is a simple quiz application built using jQuery, JavaScript, HTML, and CSS.', requiresParent: true }
  // { path: '/login', exact: true, title: 'Login', component: Login }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      mobileContactOpen: false,
      user: '',
      isOldVersion: false // This will show NEW version by default
    }
  }

  handleOldVersionToggle = () => {
    this.setState(prevState => ({ isOldVersion: !prevState.isOldVersion }))
  }

  render() {
    const title = 'Mitchell G Sides'
    const { user, isOldVersion } = this.state

    return (
      <UserContext.Provider value={user}>
        {/* Toggle button to switch between versions */}
        {/* <HoverButton
          onClick={this.handleOldVersionToggle}
        >
          {isOldVersion ? 'New Version' : 'Old Version'}
        </HoverButton> */}

        {isOldVersion ? (
          <AppContainer
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${mountain})`,
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <ContactContainer
              flex={1}
            >
              <NavBar routes={routes.filter(route => !route.requiresParent)} />
              <InfoSection style={{ flex: 2 }}>
                <PageTitle>{title.toUpperCase()}</PageTitle>
                <h5>Full Stack Engineer</h5>
              </InfoSection>
              <ContactSection style={{ flex: 2 }}>
                <PageTitle>Contact:</PageTitle>
                <ContactPage />
              </ContactSection>
            </ContactContainer>

            <MainContainer
              flex={5}
            >
              <InnerContainer>
                {routes.map((route, index) => {
                  return (
                    <Route
                      key={`${index}-${route.title}`}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  )
                })}
              </InnerContainer>
            </MainContainer>
            <MobileContactSection onClick={() => this.setState({ mobileContactOpen: !this.state.mobileContactOpen })}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PageTitle>Contact</PageTitle>
                <div onClick={() => this.setState({ mobileContactOpen: false })}>{this.state.mobileContactOpen ? <Icon icon={faChevronDown} /> : null}</div>
              </div>
              {
                this.state.mobileContactOpen ? (
                  <>
                    <InfoSectionMobile>
                      <PageTitle>{title.toUpperCase()}</PageTitle>
                      <h5>Full Stack Engineer</h5>
                      <p>Under Construction. Check Back for Updates!</p>
                    </InfoSectionMobile>
                    <ContactSectionMobile>
                      <ContactPage />
                    </ContactSectionMobile>
                  </>
                )
                  : null
              }
            </MobileContactSection>
          </AppContainer>
        ) : (
          <AppNew />
        )}
      </UserContext.Provider>
    )
  }
}

export default withRouter(App);

export const HoverButton = styled.button`
  position: fixed; 
  top: 20px; 
  right: 20px; 
  z-index: 1000;
  background-color: #333;
  color: white;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 14px;
  transition: all 0.3s ease;
  &&:hover {
    background-color: #555;
  }
`
