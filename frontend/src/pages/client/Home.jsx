import { useState, useEffect } from "react";
import SectionTitle from "../../components/ui/SectionTitle";
import { logo1 } from "../../assets/index";
import Button from "../../components/Button";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    "Full Stack Developer",
    "React Developer",
    "UI/UX Designer",
    "Laravel Developer",
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ticker = setTimeout(() => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && displayText === fullText) {
        // Pause at end of typing
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [displayText, isDeleting, loopNum, roles, typingSpeed]);

  return (
    <div
      className={`space-y-20 transition-opacity duration-500 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[#052d43]"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-medium text-blue-400 h-8">
                  <span className="border-r-2 border-blue-400 pr-1 animate-pulse">
                    {displayText}
                  </span>
                </h2>
                <h1 className="text-3xl font-bold text-white">
                  Hi, I'm Wiron Ruzindana
                </h1>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed backdrop-blur-sm bg-gradient-to-r from-blue-900/10 to-transparent p-4 rounded-lg border-l-2 border-blue-400 shadow-inner">
                I craft{" "}
                <span className="text-blue-400 font-medium">
                  immersive digital experiences
                </span>{" "}
                as a full-stack developer, specializing in{" "}
                <span className="text-cyan-300 font-medium">
                  web & mobile ecosystems
                </span>
                . Working with
                <span className="inline-flex items-center mx-1 px-2 py-1 bg-blue-900/30 rounded text-sm font-mono">
                  Laravel
                </span>
                <span className="inline-flex items-center mx-1 px-2 py-1 bg-blue-900/30 rounded text-sm font-mono">
                  React
                </span>{" "}
                and cutting-edge tech stacks, I transform complex challenges
                into
                <span className="text-blue-400 font-medium">
                  {" "}
                  elegant, scalable solutions
                </span>
                . Constantly exploring the frontiers of technology to build
                tomorrow's digital landscape.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-blue-500 rounded-full font-medium hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/25 text-white">
                  Hire Me
                </button>
                <button className="px-6 py-3 border border-gray-600 text-white rounded-full font-medium hover:border-blue-400 hover:text-blue-400 transition-all">
                  Let's Talk
                </button>
              </div>

              <div className="flex gap-6 pt-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.23 0H1.77C.8 0 0 .8 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="relative hidden md:flex justify-center items-center">
              <div className="perspective-card group">
                <div className="card-wrapper w-[280px] h-[360px] group relative transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                  <div className="card-front absolute inset-0 rounded-xl overflow-hidden border-4 border-blue-500/20 shadow-xl shadow-blue-500/10 [backface-visibility:hidden]">
                    <img
                      src={logo1}
                      alt="Wiron Ruzindana"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">
                        Wiron Ruzindana
                      </h3>
                      <p className="text-blue-300">Full Stack Developer</p>
                    </div>
                    <div className="absolute inset-0 border-2 border-blue-400/30 rounded-xl"></div>
                  </div>
                  <div className="card-back absolute inset-0 rounded-xl overflow-hidden border-4 border-blue-500/20 bg-[#031d2e] p-6 flex flex-col justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-xl shadow-blue-500/10">
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-bold text-white">
                        Wiron Ruzindana
                      </h3>
                      <p className="text-blue-300 font-medium">
                        Full Stack Developer
                      </p>
                      <div className="h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                      <p className="text-gray-300 text-sm">
                        5+ years experience building web & mobile applications
                      </p>
                      <div className="flex justify-center space-x-3 pt-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-5 -right-5 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center animate-pulse-slow">
                <span className="text-xs text-white font-bold">Hire Me!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-16 bg-[#031d2e] rounded-3xl mx-4">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              About <span className="text-blue-400">Me</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/3">
              <div className="relative w-60 h-60 mx-auto rounded-full overflow-hidden border-4 border-blue-500/30">
                <img
                  src={logo1}
                  alt="Wiron Ruzindana"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg font-bold text-white">
                  Full Stack Developer!
                </h3>
              </div>
            </div>

            <div className="md:w-2/3 text-gray-300">
              <p className="mb-4">
                I'm a passionate Full Stack Developer with expertise in both
                frontend and backend technologies. My journey in web development
                has equipped me with a strong foundation in React, Laravel, and
                modern UI/UX design principles. I pride myself on creating
                responsive, user-friendly applications that solve real-world
                problems while maintaining clean, efficient code architecture.
              </p>
              <p>
                With over 5 years of experience in the industry, I've developed
                a keen eye for detail and a commitment to delivering
                high-quality solutions that exceed client expectations. I'm
                constantly learning and adapting to new technologies to stay at
                the forefront of web development.
              </p>
              {/* <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all">
                Read More
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* My Journey Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            My <span className="text-blue-400">Journey</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Explore my educational and professional pathway
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <div>
            <h3 className="text-xl font-bold text-center mb-8 text-blue-400 relative">
              <span className="relative z-10">Education</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-12 bg-blue-500 rounded-full"></span>
            </h3>
            <div className="relative border-l-2 border-blue-500 pl-8 space-y-10">
              {[
                {
                  degree: "Master Degree - University",
                  period: "2018 - 2020",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, ea dolorum reprehenderit atque sed magnam quae, legendum non vulti sequam.",
                },
                {
                  degree: "Master Degree - University",
                  period: "2016 - 2018",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, ea dolorum reprehenderit atque sed magnam quae, legendum non vulti sequam.",
                },
                {
                  degree: "Master Degree - University",
                  period: "2014 - 2016",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, ea dolorum reprehenderit atque sed magnam quae, legendum non vulti sequam.",
                },
              ].map((edu, index) => (
                <div
                  key={index}
                  className="relative group"
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
                  <div className="absolute -left-10 top-0 h-5 w-5 rounded-full bg-blue-500 border-4 border-[#052d43] group-hover:scale-150 transition-transform duration-300"></div>
                  <div className="p-4 rounded-lg border border-blue-900/30 bg-[#031d2e] hover:bg-[#042a40] hover:border-blue-500/50 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold text-white group-hover:text-blue-300 transition-colors">
                        {edu.degree}
                      </h4>
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      {edu.description}
                    </p>
                    <button className="mt-3 text-xs text-blue-400 hover:text-blue-300 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div>
            <h3 className="text-xl font-bold text-center mb-8 text-blue-400 relative">
              <span className="relative z-10">Experience</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-12 bg-blue-500 rounded-full"></span>
            </h3>
            <div className="relative border-l-2 border-blue-500 pl-8 space-y-10">
              {[
                {
                  title: "Web Developer - Company",
                  period: "2020 - 2023",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, ea dolorum reprehenderit atque sed magnam quae, legendum non vulti sequam.",
                },
                {
                  title: "Web Developer - Company",
                  period: "2018 - 2020",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, ea dolorum reprehenderit atque sed magnam quae, legendum non vulti sequam.",
                },
                {
                  title: "Web Developer - Company",
                  period: "2016 - 2018",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, ea dolorum reprehenderit atque sed magnam quae, legendum non vulti sequam.",
                },
              ].map((exp, index) => (
                <div
                  key={index}
                  className="relative group"
                  data-aos="fade-left"
                  data-aos-delay={index * 100}
                >
                  <div className="absolute -left-10 top-0 h-5 w-5 rounded-full bg-blue-500 border-4 border-[#052d43] group-hover:scale-150 transition-transform duration-300"></div>
                  <div className="p-4 rounded-lg border border-blue-900/30 bg-[#031d2e] hover:bg-[#042a40] hover:border-blue-500/50 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold text-white group-hover:text-blue-300 transition-colors">
                        {exp.title}
                      </h4>
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      {exp.description}
                    </p>
                    <div className="mt-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-block px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">
                        React
                      </span>
                      <span className="inline-block px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full">
                        Laravel
                      </span>
                      <span className="inline-block px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                        Tailwind
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-transparent border border-blue-500 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 group">
            <span className="flex items-center">
              Download Resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 group-hover:translate-y-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* My Skills Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-[#031d2e]/30 blur-3xl rounded-full opacity-30 transform -translate-y-1/2"></div>
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl font-bold text-white">
            My <span className="text-blue-400">Skills</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Core competencies and technical abilities
          </p>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>

        <div className="space-y-16">
          {/* Coding Skills - Hexagon Grid */}
          <div className="relative bg-[#031d2e]/50 p-10 rounded-2xl backdrop-blur-sm border border-blue-900/30 shadow-xl hover:shadow-blue-500/10 transition-all duration-500">
            <h3 className="text-xl font-bold mb-10 text-center text-blue-400 relative inline-block">
              <span className="relative z-10">Coding Skills</span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="6"
                viewBox="0 0 100 6"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0,6 C 35,0 65,0 100,6 L 100,0 L 0,0 Z"
                  fill="#3b82f6"
                />
              </svg>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "HTML", percentage: 90, color: "#e34c26", icon: "🌐" },
                { name: "CSS", percentage: 85, color: "#264de4", icon: "🎨" },
                {
                  name: "JavaScript",
                  percentage: 80,
                  color: "#f0db4f",
                  icon: "⚡",
                },
                {
                  name: "Python",
                  percentage: 75,
                  color: "#4B8BBE",
                  icon: "🐍",
                },
                { name: "React", percentage: 85, color: "#61DBFB", icon: "⚛️" },
                {
                  name: "Laravel",
                  percentage: 80,
                  color: "#FF2D20",
                  icon: "🔧",
                },
                {
                  name: "Node.js",
                  percentage: 75,
                  color: "#68A063",
                  icon: "📦",
                },
                {
                  name: "Tailwind",
                  percentage: 90,
                  color: "#38B2AC",
                  icon: "💨",
                },
              ].map((skill, index) => (
                <div key={index} className="group perspective">
                  <div className="skill-hexagon relative h-40 transform transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 rounded-xl border border-blue-900/30 bg-[#052d43] [backface-visibility:hidden]">
                      <div className="text-3xl mb-2">{skill.icon}</div>
                      <h4 className="text-white font-bold">{skill.name}</h4>
                      <div className="mt-2 w-full bg-[#031d2e] h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r"
                          style={{
                            width: "0%",
                            backgroundImage: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                            animation: `growWidth${index} 1.5s forwards ease-out`,
                          }}
                        ></div>
                      </div>
                      <style>{`
                        @keyframes growWidth${index} {
                          from { width: 0%; }
                          to { width: ${skill.percentage}%; }
                        }
                      `}</style>
                      <span className="text-sm text-blue-400 mt-1">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 rounded-xl border border-blue-900/30 bg-[#052d43] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <h4 className="text-white font-bold mb-2">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-gray-300">
                        {index % 2 === 0
                          ? `${skill.percentage}% proficiency with ${
                              skill.name
                            }. ${
                              skill.percentage > 80
                                ? "Expert level"
                                : "Advanced knowledge"
                            }.`
                          : `${skill.percentage}% mastery in ${skill.name}. ${
                              skill.percentage > 80
                                ? "Professional experience"
                                : "Solid understanding"
                            }.`}
                      </p>
                      <button className="mt-3 text-xs text-blue-400 hover:text-blue-300 flex items-center">
                        View projects
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Skills - Circle Chart */}
          <div className="relative bg-[#031d2e]/50 p-10 rounded-2xl backdrop-blur-sm border border-blue-900/30 shadow-xl hover:shadow-blue-500/10 transition-all duration-500">
            <h3 className="text-xl font-bold mb-10 text-center text-blue-400 relative inline-block">
              <span className="relative z-10">Professional Skills</span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="6"
                viewBox="0 0 100 6"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0,6 C 35,0 65,0 100,6 L 100,0 L 0,0 Z"
                  fill="#3b82f6"
                />
              </svg>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Web Design", percentage: 85, color: "#3b82f6" },
                { name: "Web Development", percentage: 90, color: "#8b5cf6" },
                { name: "Graphic Design", percentage: 80, color: "#ec4899" },
                { name: "SEO Marketing", percentage: 70, color: "#f97316" },
              ].map((skill, index) => (
                <div key={index} className="relative group">
                  <div className="circle-chart-container flex flex-col items-center">
                    <div className="relative w-28 h-28">
                      <svg className="w-28 h-28 transform -rotate-90">
                        <circle
                          className="text-[#052d43] stroke-current"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="50"
                          cx="56"
                          cy="56"
                        />
                        <circle
                          className="skill-circle stroke-current"
                          strokeWidth="8"
                          strokeLinecap="round"
                          stroke={skill.color}
                          fill="transparent"
                          r="50"
                          cx="56"
                          cy="56"
                          style={{
                            strokeDasharray: `${2 * Math.PI * 50}`,
                            strokeDashoffset: `${
                              2 * Math.PI * 50 * (1 - skill.percentage / 100)
                            }`,
                            opacity: 0,
                            animation: `fadeIn 0.5s forwards, dashoffset${index} 1.5s forwards ease-out 0.5s`,
                          }}
                        />
                        <style>{`
                          @keyframes fadeIn {
                            to { opacity: 1; }
                          }
                          @keyframes dashoffset${index} {
                            from {
                              stroke-dashoffset: ${2 * Math.PI * 50};
                            }
                            to {
                              stroke-dashoffset: ${
                                2 * Math.PI * 50 * (1 - skill.percentage / 100)
                              };
                            }
                          }
                        `}</style>
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="text-xl font-bold text-white">
                          {skill.percentage}%
                        </span>
                      </div>
                    </div>
                    <h4 className="mt-4 text-white font-medium text-center group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </h4>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-[#052d43]/90 rounded-xl z-10">
                      <div className="text-center p-3">
                        <h4 className="text-lg font-bold text-white mb-1">
                          {skill.name}
                        </h4>
                        <p className="text-xs text-gray-300 mb-2">
                          {skill.percentage}% proficiency in professional{" "}
                          {skill.name.toLowerCase()}
                        </p>
                        <div className="flex justify-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < skill.percentage / 20
                                  ? skill.color
                                  : "bg-gray-600"
                              }`}
                            ></span>
                          ))}
                        </div>
                        <button className="mt-2 text-xs text-blue-400 hover:text-blue-300 inline-flex items-center">
                          Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <button className="group relative inline-flex items-center overflow-hidden rounded-full bg-blue-600 px-8 py-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition-all">
            <span className="absolute -end-full transition-all group-hover:end-4">
              <svg
                className="h-5 w-5 rtl:rotate-180 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            <span className="text-sm font-medium text-white transition-all group-hover:me-4">
              View All Skills
            </span>
          </button>

          <button className="group relative inline-flex items-center overflow-hidden rounded-full bg-transparent border border-blue-500/50 px-8 py-3 hover:border-blue-500 transition-all">
            <span className="text-sm font-medium text-blue-400 transition-all group-hover:text-blue-300">
              Skill Certifications
            </span>
          </button>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-[#031d2e]/30 blur-3xl rounded-full opacity-30 transform translate-y-1/2"></div>

        <div className="text-center mb-16 relative">
          <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full mb-3">
            PORTFOLIO
          </span>
          <h2 className="text-3xl font-bold text-white">
            Featured <span className="text-blue-400">Projects</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Showcasing my best work and technical expertise
          </p>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>

        <div className="relative">
          {/* Project Filter Tabs */}
          <div className="flex justify-center mb-10 relative">
            <div className="inline-flex p-1 bg-[#031d2e]/80 rounded-full backdrop-blur-sm border border-blue-900/30">
              {["All", "Web Apps", "Mobile", "UI/UX"].map((category, index) => (
                <button
                  key={index}
                  className={`px-5 py-2 rounded-full text-sm transition-all ${
                    index === 0
                      ? "bg-blue-500 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                desc: "A full-featured online shopping platform with secure payment integration and admin dashboard.",
                image: "bg-gradient-to-br from-purple-500 to-purple-800",
                tags: ["React", "Tailwind", "Firebase"],
                link: "#",
                featured: true,
              },
              {
                title: "Task Management App",
                desc: "Collaborative task manager with real-time updates and analytics dashboard.",
                image: "bg-gradient-to-br from-blue-400 to-blue-700",
                tags: ["Vue", "Node.js", "MongoDB"],
                link: "#",
                featured: false,
              },
              {
                title: "Fitness Tracker",
                desc: "Mobile application for tracking workouts, nutrition, and personal goals with progress analytics.",
                image: "bg-gradient-to-br from-green-400 to-green-700",
                tags: ["React Native", "GraphQL", "AWS"],
                link: "#",
                featured: false,
              },
            ].map((project, index) => (
              <div
                key={index}
                className="project-card group relative h-[400px] rounded-xl overflow-hidden perspective"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Card */}
                  <div className="absolute inset-0 [backface-visibility:hidden] overflow-hidden">
                    <div
                      className={`h-48 ${project.image} relative overflow-hidden group-hover:brightness-110 transition-all duration-300`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                      {project.featured && (
                        <div className="absolute top-4 right-4 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-6 bg-[#031d2e] border-t border-blue-900/30 absolute bottom-0 w-full transform transition-transform duration-300 ease-in-out">
                      <div className="mt-1 flex gap-2 mb-3">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`text-xs px-2 py-1 rounded-full ${
                              tagIndex === 0
                                ? "bg-blue-500/20 text-blue-400"
                                : tagIndex === 1
                                ? "bg-purple-500/20 text-purple-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-bold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {project.desc}
                      </p>

                      <div className="absolute -bottom-10 left-0 w-full flex items-center justify-between px-6 py-3 bg-gradient-to-t from-[#031d2e] to-transparent group-hover:bottom-0 transition-all duration-300">
                        <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center">
                          View Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <div className="w-2 h-2 rounded-full bg-purple-500 opacity-70"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500 opacity-40"></div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-lg">{index + 1}</span>
                    </div>
                  </div>

                  {/* Back Card */}
                  <div className="absolute inset-0 bg-[#052d43] border border-blue-900/30 rounded-xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col">
                    <h3 className="font-bold text-xl text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm flex-grow">
                      {project.desc}
                      <br />
                      <br />
                      This project demonstrates my expertise in building
                      responsive, scalable applications with modern technologies
                      and best practices in software development.
                    </p>

                    <div className="mt-4">
                      <h4 className="text-blue-400 text-sm font-medium mb-2">
                        Key Features:
                      </h4>
                      <ul className="text-xs text-gray-300 space-y-1 mb-4">
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Responsive design for all devices</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Authentication and authorization</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>API integration and data management</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-between mt-auto pt-4 border-t border-blue-900/30">
                      <a
                        href={project.link}
                        className="px-4 py-2 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Live Demo
                      </a>
                      <a
                        href={project.link}
                        className="px-4 py-2 border border-blue-500/50 text-blue-400 text-xs rounded-lg hover:border-blue-500 transition-colors"
                      >
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hover Effects - Mouse Movement */}
                <div className="absolute inset-0 opacity-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          {/* More Projects Button */}
          <div className="mt-12 text-center">
            <Button
              color="#031d2e"
              textColor="#3b82f6"
              size="lg"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-300 transform group-hover:translate-x-1 transition-all duration-300 ease-out"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              View All Projects
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 border border-blue-500/20 rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-blue-500/10 rounded-full"></div>
        <div className="absolute top-1/4 right-10 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-10 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
      </section>

      {/* Contact Me Section */}
      <section className="max-w-6xl mx-auto px-4 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#031d2e]/30 blur-3xl rounded-full opacity-30 transform -translate-y-1/4"></div>

        <div className="text-center mb-16 relative">
          <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full mb-3">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl font-bold text-white">
            Contact <span className="text-blue-400">Me!</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Let's collaborate on your next project
          </p>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-5 gap-8 relative">
          {/* Contact Info Cards */}
          <div className="md:col-span-2 space-y-6">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                title: "Email",
                value: "ruzindana@wirron.com",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.836l1.498 4.435a1 1 0 01-.54 1.06l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                ),
                title: "Phone",
                value: "+250 780 961 542",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                title: "Location",
                value: "Kigali, Rwanda",
                color: "from-green-500 to-green-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="contact-card group bg-[#031d2e] rounded-xl overflow-hidden backdrop-blur-sm border border-blue-900/30 hover:border-blue-500/50 transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center p-5 relative">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                  >
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-white text-sm font-medium">
                      {item.title}
                    </h3>
                    <p className="text-blue-400 text-sm font-mono">
                      {item.value}
                    </p>
                  </div>
                  <div
                    className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${
                        item.color.split(" ")[1]
                      }, ${item.color.split(" ")[3]})`,
                    }}
                  ></div>
                </div>
              </div>
            ))}

            {/* Social Media Links */}
            <div className="bg-[#031d2e] rounded-xl p-5 backdrop-blur-sm border border-blue-900/30">
              <h3 className="text-white text-sm font-medium mb-4">
                Connect With Me
              </h3>
              <div className="flex space-x-3">
                {[
                  {
                    icon: (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    ),
                    color: "bg-gray-800 hover:bg-gray-700",
                  },
                  {
                    icon: (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    ),
                    color: "bg-blue-400 hover:bg-blue-500",
                  },
                  {
                    icon: (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.23 0H1.77C.8 0 0 .8 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
                      </svg>
                    ),
                    color: "bg-blue-700 hover:bg-blue-800",
                  },
                  {
                    icon: (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.65-.06-4.859.06-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    ),
                    color: "bg-pink-600 hover:bg-pink-700",
                  },
                  {
                    icon: (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    ),
                    color: "bg-red-500 hover:bg-red-600",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`${social.color} w-10 h-10 rounded-lg flex items-center justify-center text-white transform transition-all hover:scale-110 hover:rotate-3`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="bg-[#031d2e] p-8 rounded-xl backdrop-blur-sm border border-blue-900/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 relative">
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="full-name"
                      placeholder=" "
                      className="peer w-full bg-[#052d43] border border-blue-900/30 rounded-lg p-4 pt-6 text-white focus:border-blue-500 focus:outline-none transition-all"
                    />
                    <label
                      htmlFor="full-name"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-500"
                    >
                      Full Name
                    </label>
                    <div className="absolute right-3 top-5 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="form-group relative">
                    <input
                      type="email"
                      id="email"
                      placeholder=" "
                      className="peer w-full bg-[#052d43] border border-blue-900/30 rounded-lg p-4 pt-6 text-white focus:border-blue-500 focus:outline-none transition-all"
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-500"
                    >
                      Email Address
                    </label>
                    <div className="absolute right-3 top-5 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div className="form-group relative">
                    <input
                      type="tel"
                      id="phone"
                      placeholder=" "
                      className="peer w-full bg-[#052d43] border border-blue-900/30 rounded-lg p-4 pt-6 text-white focus:border-blue-500 focus:outline-none transition-all"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-500"
                    >
                      Phone Number
                    </label>
                    <div className="absolute right-3 top-5 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.948.684l1.498 4.435a1 1 0 01-.54 1.06l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.059-.54l4.435.74a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="subject"
                      placeholder=" "
                      className="peer w-full bg-[#052d43] border border-blue-900/30 rounded-lg p-4 pt-6 text-white focus:border-blue-500 focus:outline-none transition-all"
                    />
                    <label
                      htmlFor="subject"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-500"
                    >
                      Email Subject
                    </label>
                    <div className="absolute right-3 top-5 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="form-group relative">
                  <textarea
                    id="message"
                    rows="5"
                    placeholder=" "
                    className="peer w-full bg-[#052d43] border border-blue-900/30 rounded-lg p-4 pt-6 text-white focus:border-blue-500 focus:outline-none transition-all"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-500"
                  >
                    Your Message
                  </label>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                  <button className="group relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group-hover:from-blue-500 group-hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-800">
                    <span className="relative px-8 py-3.5 transition-all ease-in duration-75 bg-[#031d2e] rounded-md group-hover:bg-opacity-0">
                      <span className="relative flex items-center space-x-2">
                        <span className="relative text-blue-400 group-hover:text-white">
                          Send Message
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 group-hover:text-white group-hover:translate-x-1 transition-transform"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              </form>

              {/* Form Decoration */}
              <div className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 blur-xl opacity-70"></div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="hidden md:block">
          <div className="absolute top-1/3 -left-24 w-48 h-48 rounded-full border border-blue-500/10 opacity-50"></div>
          <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full border border-blue-500/10 opacity-50"></div>
          <div className="absolute top-10 right-10 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
