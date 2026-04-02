export const personalData = {
  name: "Kuldeep Malviya",
  title: "Full-Stack Developer",
  email: "malviyakuldeep54@gmail.com",
  phone: "+91-8303186080",
  location: "Greater Noida, India",
  github: "https://github.com/kuldeep54",
  linkedin: "https://linkedin.com/in/kuldeep-malviya-017314253",
  summary: "Resourceful and solutions-oriented Computer Science & Engineering student with hands-on experience in Java Full Stack and modern web development. Skilled in building responsive, scalable applications using React, Spring Boot, and Java.",
  
  experience: [
    {
      id: 1,
      title: "Java Full Stack Developer Virtual Internship",
      company: "EduSkills (AICTE Supported)",
      location: "Remote",
      duration: "Oct 2025 - Dec 2025",
      type: "Internship",
      achievements: [
        "Earned 'O' Grade (Outstanding) for excellence in building end-to-end full-stack applications.",
        "Mastered JavaSE, Spring Framework, and advanced web architectures in a 10-week intensive program.",
        "Developed and deployed scalable backend services integrated with modern React frontends."
      ]
    },
    {
      id: 2,
      title: "AI-ML Virtual Internship",
      company: "AICTE",
      location: "Remote",
      duration: "Jan 2024 - Mar 2024",
      type: "Internship",
      achievements: [
        "Achieved AWS AI-ML Foundations certification accredited by AICTE, demonstrating strong fundamentals in machine learning concepts.",
        "Gained hands-on experience with ML workflows including data preprocessing, model training, evaluation, and deployment."
      ]
    }
  ],

  education: [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Galgotias University",
      location: "Greater Noida, Uttar Pradesh",
      duration: "Sept 2022 - July 2026",
      status: "Pursuing",
      achievements: [
        "Focusing on Full-Stack Development and Software Engineering principles.",
        "Active participant in technical symposiums and university-level coding competitions."
      ]
    },
    {
      id: 2,
      degree: "Senior Secondary (Class XII) - Science",
      institution: "ST. Joseph's School (ICSE)",
      location: "Gorakhpur, Uttar Pradesh",
      duration: "Apr 2021 - Mar 2022",
      status: "Completed",
      achievements: [
        "Specialized in Physics, Chemistry, and Mathematics (PCM).",
        "Demonstrated strong analytical and problem-solving skills in ISC Board examinations."
      ]
    },
    {
      id: 3,
      degree: "High School (Class X)",
      institution: "ST. Joseph's School (ICSE)",
      location: "Gorakhpur, Uttar Pradesh",
      duration: "Apr 2019 - Mar 2020",
      status: "Completed",
      achievements: [
        "Achieved excellence across all fundamental disciplines of secondary education.",
        "Graduated from ICSE Board with honors in elective subjects."
      ]
    }
  ],

  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "Java", "Python"],
    database: ["MongoDB", "SQL", "MongoDB Atlas"],
    tools: ["GitHub", "Git", "VS Code", "Postman"],
    other: ["AI/ML Basics", "Responsive Design", "Problem Solving", "Puter.js"]
  },

  languages: ["English", "Hindi"],
  
  platforms: ["Windows", "Linux"],

  certifications: [
    "AWS AI-ML Foundations"
  ]
};

export const projects = [
  {
    id: 1,
    title: "SAP Order-to-Cash AI Analytics",
    description: "An interactive, full-stack analytics platform for exploring SAP Order-to-Cash (O2C) process data through a conversational AI interface and an immersive 3D knowledge graph.",
    technologies: ["React 19", "Three.js", "FastAPI", "SQLite", "Groq AI", "Llama 3.1"],
    github: "https://github.com/kuldeep54/OrderToCash",
    liveDemo: "https://ordertocash-frontend.onrender.com/",
    screenshots: [
      "/screenshots/ordertocash/home.png"
    ],
    image: "/screenshots/ordertocash/home.png",
    featured: true
  },
  {
    id: 2,
    title: "AnyTalk - Real-time Meeting Platform",
    description: "A real-time video meeting platform featuring live transcription and translation capabilities, designed to break language barriers by allowing participants to communicate seamlessly in different languages.",
    technologies: ["Flask", "WebRTC", "SocketIO", "Transcription", "Translation", "Python"],
    github: "https://github.com/kuldeep54/BreakLanguageBarriers",
    liveDemo: "https://breaklanguagebarriers.railway.app/",
    screenshots: [
      "/screenshots/anytalk/home.png"
    ],
    image: "/screenshots/anytalk/home.png",
    featured: true
  },
  {
    id: 3,
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
    id: 4,
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
