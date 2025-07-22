import elevate from './icon-images/Elevate-reduced.jpg';
import tetons from './icon-images/Tetons.jpg';
import tetons2 from './icon-images/Tetons2.jpg';

export const jobs = [
  { 
    title: 'TrainerRoad', 
    position: 'Senior Software Engineer',
    duration: 'June 2021 - April 2025',
    location: 'Reno, NV, USA',
    image: { location: elevate, credit: 'Dan Munson' },
    bullets: [
      'Delivered a seamless user experience across web, mobile, and desktop platforms in front-end development with React, React Native, Electron, and TypeScript, implementing reusable component libraries and established design patterns using Webpack.',
      'Enhanced code quality and maintainability in an agile, cross-functional environment by championing code reviews, promoting best practices, and leveraging strong communication skills with product, design, and engineering teams.',
      'Improved application performance and accessibility standards for project management software by optimizing front-end and back-end integration using React, TypeScript, CSS (styled-components), and C#.',
      'Reduced front-end bugs and accelerated feature delivery through assisting test team with automated unit and integration testing and contributing to scalable component library development within CI/CD pipelines.',
      'Strengthened platform reliability and scalability by updating and maintaining RESTful APIs in C# and .NET Core, ensuring seamless communication between front-end and back-end systems supporting project management features.',
      'Improved component library efficiency by applying and extending an internal component library, incorporating custom-built components in Storybook.'
    ],
    technologies: ['React', 'React Native', 'Electron', 'TypeScript', 'C#', '.NET Core', 'Webpack', 'Storybook']
  },
  {
    title: 'SparkCognition',
    position: 'Software Engineer',
    duration: 'March 2020 - June 2021',
    location: 'Austin, TX, USA',
    image: { location: tetons2, credit: 'Lydia Sides' },
    bullets: [
      'Improved application usability and scalability by leading the migration of legacy Django template pages to a modern React architecture using React, TypeScript, and CSS, resulting in a cleaner, more organized codebase and enhanced user experience.',
      'Enhanced frontend reliability and maintainability by implementing React Context and Hooks during a major refactor, streamlining state management and supporting consistent UI patterns.',
      'Accelerated feature delivery and UI consistency by collaborating with remote teams to design and deliver user-facing features with a focus on usability, accessibility, and cohesive design standards.',
      'Increased codebase accessibility and testability by applying accessibility best practices and contributing to the development of clean, reusable React components as part of ongoing UI/UX improvement initiatives.'
    ],
    technologies: ['React', 'TypeScript', 'CSS', 'Django', 'Python']
  },
  {
    title: "Complyify",
    position: 'Front End Developer',
    duration: 'June 2019 - January 2020',
    location: 'Austin, TX, USA',
    image: { location: tetons, credit: 'Lydia Sides' },
    bullets: [
      'Enhanced product scalability and maintainability by developing modular front-end architecture for SDK integration using React, Redux, and TypeScript, streamlining feature delivery.',
      'Improved user experience and accessibility by implementing accessible, responsive UI features for Stripe Payments and Intercom Customer Support integrations, adhering to usability best practices.',
      'Contributed to the design and planning phases of front-end features by collaborating with cross-functional teams in initial design wireframing, ensuring alignment with user experience goals.'
    ],
    technologies: ['React', 'Redux', 'TypeScript', 'Stripe', 'Intercom']
  }
];