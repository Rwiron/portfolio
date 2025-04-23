import React, { useState, useEffect } from "react";
import Button from "../../components/Button";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured online shopping platform with secure payment integration and admin dashboard.",
      image: "bg-gradient-to-br from-purple-500 to-purple-800",
      categories: ["web", "backend"],
      tech: ["React", "Node.js", "MongoDB"],
      demo: "#",
      featured: true,
      features: [
        "Secure Payment",
        "User Authentication",
        "Admin Dashboard",
        "Product Management",
      ],
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Collaborative task manager with real-time updates and analytics dashboard.",
      image: "bg-gradient-to-br from-blue-400 to-blue-700",
      categories: ["web", "frontend"],
      tech: ["Vue", "Firebase", "Tailwind"],
      demo: "#",
      featured: false,
      features: [
        "Real-time Updates",
        "Task Assignment",
        "Progress Tracking",
        "Analytics Dashboard",
      ],
    },
    {
      id: 3,
      title: "Fitness Tracker",
      description:
        "Mobile application for tracking workouts, nutrition, and personal goals with progress analytics.",
      image: "bg-gradient-to-br from-green-400 to-green-700",
      categories: ["mobile", "ui/ux"],
      tech: ["React Native", "GraphQL", "AWS"],
      demo: "#",
      featured: true,
      features: [
        "Workout Tracking",
        "Nutrition Planning",
        "Goal Setting",
        "Progress Analytics",
      ],
    },
    {
      id: 4,
      title: "Virtual Reality Experience",
      description:
        "Immersive VR experience for architectural visualization and virtual property tours.",
      image: "bg-gradient-to-br from-amber-400 to-amber-700",
      categories: ["ui/ux", "3d"],
      tech: ["Three.js", "WebGL", "Blender"],
      demo: "#",
      featured: false,
      features: [
        "3D Visualization",
        "Interactive Tours",
        "VR Compatibility",
        "Custom Controls",
      ],
    },
    {
      id: 5,
      title: "AI Content Generator",
      description:
        "Content creation tool powered by artificial intelligence for generating marketing copy.",
      image: "bg-gradient-to-br from-pink-400 to-pink-700",
      categories: ["web", "ai"],
      tech: ["Python", "TensorFlow", "React"],
      demo: "#",
      featured: true,
      features: [
        "AI Text Generation",
        "Template Library",
        "Content Optimization",
        "Analytics",
      ],
    },
    {
      id: 6,
      title: "Crypto Dashboard",
      description:
        "Real-time cryptocurrency tracking dashboard with market insights and portfolio management.",
      image: "bg-gradient-to-br from-indigo-400 to-indigo-700",
      categories: ["web", "finance"],
      tech: ["Angular", "D3.js", "Node.js"],
      demo: "#",
      featured: false,
      features: [
        "Real-time Tracking",
        "Portfolio Management",
        "Market Insights",
        "Price Alerts",
      ],
    },
  ];

  // Filter projects when activeFilter changes
  useEffect(() => {
    setIsLoaded(false);

    setTimeout(() => {
      const filtered =
        activeFilter === "all"
          ? projects
          : projects.filter((project) =>
              project.categories.includes(activeFilter)
            );

      setFilteredProjects(filtered);
      setIsLoaded(true);
    }, 300);
  }, [activeFilter]);

  // Filters array
  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Apps" },
    { id: "mobile", label: "Mobile" },
    { id: "ui/ux", label: "UI/UX" },
    { id: "ai", label: "AI & ML" },
  ];

  return (
    <section className="py-20 min-h-screen bg-[#052d43] relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-[#052d43]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,127,255,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(103,63,215,0.1),transparent_60%)]"></div>

      {/* Animated floating orbs */}
      <div className="absolute top-40 left-20 w-32 h-32 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-60 right-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-cyan-500/10 rounded-full filter blur-2xl animate-float-delayed"></div>

      {/* Fine grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(43,127,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(43,127,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-xs rounded-full backdrop-blur-sm mb-3 border border-blue-500/20">
              PORTFOLIO
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-blue-400">Projects</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Explore my collection of projects showcasing my skills in web
            development, mobile app design, and creative problem-solving through
            code.
          </p>

          {/* Animated underline */}
          <div className="relative h-1 w-20 mx-auto mt-6 overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              style={{ animation: "shimmer 2s infinite" }}
            ></div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center p-1.5 bg-[#031d2e]/80 rounded-full backdrop-blur-lg border border-blue-900/30 shadow-lg shadow-blue-900/10">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`relative px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                } mx-1 overflow-hidden`}
              >
                {activeFilter === filter.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-90 rounded-full"></span>
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid with 3D Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group perspective h-[400px] transition-all duration-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* 3D Card with flip effect */}
              <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* Front of Card */}
                <div className="absolute inset-0 rounded-xl overflow-hidden backface-hidden">
                  {/* Glass card effect */}
                  <div className="absolute inset-0 bg-[#031d2e]/80 backdrop-blur-sm border border-blue-900/30 group-hover:border-blue-500/50 transition-all duration-300"></div>

                  {/* Project Image/Gradient */}
                  <div
                    className={`h-48 ${project.image} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#031d2e]/90"></div>

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full z-10 shadow-lg shadow-blue-500/20">
                        Featured
                      </div>
                    )}

                    {/* Project Index */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-sm z-10">
                      {project.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-10">
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`text-xs px-2 py-1 rounded-full ${
                            techIndex === 0
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                              : techIndex === 1
                              ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                      {project.description}
                    </p>

                    {/* Hint to flip */}
                    <div className="absolute bottom-6 right-6 text-blue-400 text-xs flex items-center gap-1 opacity-70">
                      <span>Flip for details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rounded-xl overflow-hidden backface-hidden rotate-y-180 bg-[#031d2e]/90 backdrop-blur-lg border border-blue-500/30">
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="font-bold text-xl text-blue-400 mb-3">
                      {project.title}
                    </h3>

                    {/* Features List */}
                    <div className="mb-6">
                      <h4 className="text-white text-sm font-semibold mb-2">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <span className="text-blue-400 mr-2 text-lg leading-none">
                              •
                            </span>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <h4 className="text-white text-sm font-semibold mb-2">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Demo Button */}
                    <div className="mt-auto">
                      <Button
                        size="sm"
                        glowEffect={true}
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        }
                        iconPosition="left"
                      >
                        View Live Demo
                      </Button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                    <div
                      className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            color="#031d2e"
            textColor="#3b82f6"
            glowEffect={true}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            }
            iconPosition="right"
          >
            Load More Projects
          </Button>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style jsx="true">{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float-delayed {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse-slow {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.3;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .perspective {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default Projects;
