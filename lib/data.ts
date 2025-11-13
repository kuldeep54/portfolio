export const personalData = {
  name: "Kuldeep Malviya",
  title: "Full-Stack Developer",
  email: "malviyakuldeep54@gmail.com",
  phone: "+91-8303186080",
  location: "Greater Noida, India",
  github: "https://github.com/kuldeep54",
  linkedin: "https://linkedin.com/in/kuldeep-malviya-017314253",
  summary: "Resourceful and solutions-oriented Computer Science & Engineering student with hands-on experience in web development. Skilled in building responsive websites using HTML, CSS, JavaScript, and React. Strong problem solver with proven teamwork, adaptability, and project execution skills.",
  
  experience: [
    {
      id: 1,
      title: "AI-ML Virtual Internship",
      company: "AICTE",
      location: "Remote",
      duration: "Jan 2024 - Mar 2024",
      type: "Internship",
      achievements: [
        "Achieved AWS AI-ML Foundations certification",
        "Data preprocessing, model training, evaluation, deployment",
        "Gained hands-on experience with machine learning workflows"
      ]
    },
    {
      id: 2,
      title: "Cloud Virtual Internship",
      company: "AICTE",
      location: "Remote", 
      duration: "Sept 2023 - Nov 2023",
      type: "Internship",
      achievements: [
        "AWS Cloud Foundations certification",
        "Learned architecture, services, security, deployment",
        "Understanding of cloud infrastructure and best practices"
      ]
    }
  ],

  education: [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Galgotias University",
      location: "Greater Noida",
      duration: "2022 - 2026",
      status: "Pursuing"
    }
  ],

  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    backend: ["Java", "Node.js", "Express.js"],
    tools: ["GitHub", "Git", "VS Code"],
    cloud: ["AWS Basics", "Cloud Architecture"],
    other: ["AI/ML Basics", "Responsive Design", "Problem Solving"]
  },

  languages: ["English", "Hindi"],
  
  platforms: ["Windows", "Linux"],

  certifications: [
    "AWS AI-ML Foundations",
    "AWS Cloud Foundations"
  ]
};

export const projects = [
  {
    id: 1,
    title: "Amazon Clone",
    description: "A responsive e-commerce platform replicating Amazon's core features including product listings, search, and shopping cart functionality.",
    technologies: ["React", "Context API", "Firebase", "Stripe", "Material-UI"],
    github: "https://github.com/kuldeep54/Amazon-Clone",
    liveDemo: "https://clone-6f7f1.web.app/",
    screenshots: [
      "/screenshots/amazon/home.png",
      "/screenshots/amazon/products.png",
      "/screenshots/amazon/cart.png"
    ],
    image: "/screenshots/amazon/home.png",
    featured: true
  },
  {
    id: 2,
    title: "GoodToGo",
    description: "Modern e-commerce platform with comprehensive product catalog, shopping cart functionality, and user authentication system.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    github: "https://github.com/kuldeep54/GoodToGo",
    liveDemo: "https://kuldeep54.github.io/GoodToGo/",
    screenshots: [
      "/screenshots/googtogo/home.png",
      "/screenshots/googtogo/products.png",
      "/screenshots/googtogo/cart.png"
    ],
    image: "/screenshots/googtogo/home.png",
    featured: true
  },
  {
    id: 3,
    title: "Quizzer",
    description: "Interactive quiz application with multiple categories, real-time scoring system, and engaging user interface.",
    technologies: ["React", "CSS", "JavaScript", "Local Storage"],
    github: "https://github.com/kuldeep54/Quizzer",
    liveDemo: "https://quizzer-asnh75r9g-kuldeep-malviyas-projects-9da12c6e.vercel.app",
    screenshots: [
      "/screenshots/quizzer/home.png",
      "/screenshots/quizzer/quiz.png"
    ],
    image: "/screenshots/quizzer/home.png",
    featured: true
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Professional portfolio website built with Next.js, TypeScript, and Tailwind CSS featuring smooth animations and functional contact form.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/kuldeep54/portfolio",
    liveDemo: "#",
    image: "/screenshots/portfolio.png",
    featured: false
  }
];

export const siteMetadata = {
  title: "Kuldeep Malviya - Full-Stack Developer",
  description: "Portfolio of Kuldeep Malviya, a passionate Full-Stack Developer skilled in web development, cloud technologies, and AI/ML basics.",
  keywords: "Kuldeep Malviya, Full-Stack Developer, Web Developer, React, JavaScript, AWS, Portfolio",
  author: "Kuldeep Malviya",
  siteUrl: "https://kuldeep-portfolio.vercel.app",
  image: "/og-image.png"
};
