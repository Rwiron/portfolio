import { useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [activeTab, setActiveTab] = useState("skills");

  const skills = [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "Node.js", level: 85, color: "#339933" },
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
    { name: "TypeScript", level: 80, color: "#3178C6" },
    { name: "Python", level: 75, color: "#3776AB" },
    { name: "MongoDB", level: 80, color: "#47A248" },
    { name: "AWS", level: 70, color: "#FF9900" },
    { name: "Docker", level: 65, color: "#2496ED" },
  ];

  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovators",
      duration: "2021 - Present",
      description:
        "Leading the development of enterprise web applications using React, Node.js, and MongoDB. Implementing CI/CD pipelines and mentoring junior developers.",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions",
      duration: "2018 - 2021",
      description:
        "Developed and maintained multiple client websites and web applications. Worked with React, Express, and PostgreSQL.",
    },
    {
      title: "Frontend Developer",
      company: "Web Creators",
      duration: "2016 - 2018",
      description:
        "Created responsive and interactive user interfaces using modern JavaScript frameworks and CSS preprocessors.",
    },
  ];

  const education = [
    {
      degree: "Master of Computer Science",
      institution: "Tech University",
      duration: "2014 - 2016",
      description:
        "Specialized in Software Engineering with focus on web technologies and distributed systems.",
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "National University",
      duration: "2010 - 2014",
      description:
        "Foundational education in computer science principles, algorithms, and programming languages.",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "skills":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#071f33]/40 backdrop-blur-sm p-5 rounded-xl border border-white/5"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-white">
                    {skill.name}
                  </h3>
                  <span className="text-sm text-blue-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700/30 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        );
      case "experience":
        return (
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-1/3">
                    <div className="bg-[#071f33]/60 backdrop-blur-sm p-4 rounded-xl border border-white/5 h-full">
                      <h3 className="text-xl font-bold text-white">
                        {exp.title}
                      </h3>
                      <p className="text-blue-400 mt-1">{exp.company}</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {exp.duration}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3 bg-[#071f33]/40 backdrop-blur-sm p-5 rounded-xl border border-white/5">
                    <p className="text-gray-300">{exp.description}</p>
                  </div>
                </div>
                {index < experience.length - 1 && (
                  <div className="absolute left-[22px] top-full h-8 w-px bg-gradient-to-b from-blue-500 to-transparent md:left-1/6 md:ml-4" />
                )}
              </motion.div>
            ))}
          </div>
        );
      case "education":
        return (
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-1/3">
                    <div className="bg-[#071f33]/60 backdrop-blur-sm p-4 rounded-xl border border-white/5 h-full">
                      <h3 className="text-xl font-bold text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-blue-400 mt-1">{edu.institution}</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {edu.duration}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3 bg-[#071f33]/40 backdrop-blur-sm p-5 rounded-xl border border-white/5">
                    <p className="text-gray-300">{edu.description}</p>
                  </div>
                </div>
                {index < education.length - 1 && (
                  <div className="absolute left-[22px] top-full h-8 w-px bg-gradient-to-b from-blue-500 to-transparent md:left-1/6 md:ml-4" />
                )}
              </motion.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative py-24">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-15 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-blob animation-delay-4000"></div>

      <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-10"></div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            About <span className="text-blue-400">Me</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 bg-[#071f33]/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/5 max-w-3xl mx-auto"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              I am a passionate and dedicated Full Stack Developer with over 6
              years of experience creating robust web applications and intuitive
              user interfaces. My expertise spans across the entire development
              stack, from frontend technologies like React and Angular to
              backend solutions with Node.js and Python.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                Problem Solver
              </span>
              <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                Team Player
              </span>
              <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Quick Learner
              </span>
              <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                Detail-Oriented
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex justify-center space-x-1 md:space-x-4 mb-12 bg-[#071f33]/40 backdrop-blur-sm rounded-xl p-1 max-w-md mx-auto">
            {["skills", "experience", "education"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[400px]"
          >
            {renderTabContent()}
          </motion.div>
        </motion.div>

        <div className="mt-24">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-white mb-12"
          >
            My <span className="text-blue-400">Journey</span>
          </motion.h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-blue-500/50 to-transparent" />

            <div className="space-y-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative"
              >
                <div className="absolute left-1/2 top-0 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right">
                    <h3 className="text-2xl font-bold text-white">
                      Started Coding
                    </h3>
                    <p className="text-blue-400">2008</p>
                    <div className="mt-4 bg-[#071f33]/40 backdrop-blur-sm p-5 rounded-xl border border-white/5">
                      <p className="text-gray-300">
                        Discovered my passion for programming at age 14,
                        creating simple websites and games.
                      </p>
                    </div>
                  </div>
                  <div className="md:block hidden" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute left-1/2 top-0 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:block hidden" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Computer Science Degree
                    </h3>
                    <p className="text-blue-400">2010 - 2014</p>
                    <div className="mt-4 bg-[#071f33]/40 backdrop-blur-sm p-5 rounded-xl border border-white/5">
                      <p className="text-gray-300">
                        Earned my Bachelor's degree and built a strong
                        foundation in computer science principles.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute left-1/2 top-0 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right">
                    <h3 className="text-2xl font-bold text-white">
                      First Developer Job
                    </h3>
                    <p className="text-blue-400">2016</p>
                    <div className="mt-4 bg-[#071f33]/40 backdrop-blur-sm p-5 rounded-xl border border-white/5">
                      <p className="text-gray-300">
                        Started my professional journey as a Frontend Developer,
                        working on user interfaces and experiences.
                      </p>
                    </div>
                  </div>
                  <div className="md:block hidden" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <div className="absolute left-1/2 top-0 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:block hidden" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Became Full Stack Developer
                    </h3>
                    <p className="text-blue-400">2018</p>
                    <div className="mt-4 bg-[#071f33]/40 backdrop-blur-sm p-5 rounded-xl border border-white/5">
                      <p className="text-gray-300">
                        Expanded my skills to include backend development and
                        database design, becoming a true full stack developer.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative"
              >
                <div className="absolute left-1/2 top-0 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right">
                    <h3 className="text-2xl font-bold text-white">
                      Senior Developer
                    </h3>
                    <p className="text-blue-400">2021 - Present</p>
                    <div className="mt-4 bg-[#071f33]/40 backdrop-blur-sm p-5 rounded-xl border border-white/5">
                      <p className="text-gray-300">
                        Leading development teams and architecting complex web
                        applications while mentoring junior developers.
                      </p>
                    </div>
                  </div>
                  <div className="md:block hidden" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .animate-blob {
          animation: blob-animation 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes blob-animation {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default About;
