import React, { useState, useEffect } from "react";
import Button from "../../components/Button";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  // Sample blog posts data
  const posts = [
    {
      id: 1,
      title: "Building Modern UIs with React and Tailwind",
      excerpt:
        "Explore how to combine React and Tailwind CSS to create stunning, responsive user interfaces with minimal effort.",
      categories: ["react", "frontend"],
      date: "May 18, 2023",
      readTime: "5 min read",
      image: "bg-gradient-to-r from-blue-500 to-indigo-600",
      featured: true,
    },
    {
      id: 2,
      title: "RESTful API Design Best Practices",
      excerpt:
        "Learn the key principles of designing clean, efficient, and developer-friendly RESTful APIs that scale well.",
      categories: ["backend", "api"],
      date: "April 22, 2023",
      readTime: "8 min read",
      image: "bg-gradient-to-r from-purple-500 to-pink-600",
      featured: false,
    },
    {
      id: 3,
      title: "Optimizing Database Performance in Laravel",
      excerpt:
        "Discover techniques to improve database query performance and optimize your Laravel application for speed.",
      categories: ["backend", "laravel"],
      date: "June 10, 2023",
      readTime: "7 min read",
      image: "bg-gradient-to-r from-red-500 to-orange-600",
      featured: true,
    },
    {
      id: 4,
      title: "State Management with Redux Toolkit",
      excerpt:
        "Simplify your Redux code and improve maintainability with Redux Toolkit's modern approaches to state management.",
      categories: ["react", "frontend"],
      date: "March 15, 2023",
      readTime: "6 min read",
      image: "bg-gradient-to-r from-green-500 to-teal-600",
      featured: false,
    },
    {
      id: 5,
      title: "Authentication Strategies for Modern Web Apps",
      excerpt:
        "Compare different authentication approaches including JWT, session-based auth, OAuth, and more for your web application.",
      categories: ["security", "backend"],
      date: "July 3, 2023",
      readTime: "10 min read",
      image: "bg-gradient-to-r from-amber-500 to-yellow-600",
      featured: true,
    },
    {
      id: 6,
      title: "Deploying Applications with Docker and Kubernetes",
      excerpt:
        "A step-by-step guide to containerizing your application with Docker and orchestrating with Kubernetes.",
      categories: ["devops", "backend"],
      date: "May 30, 2023",
      readTime: "12 min read",
      image: "bg-gradient-to-r from-cyan-500 to-blue-600",
      featured: false,
    },
  ];

  // Blog categories
  const categories = [
    { id: "all", label: "All Posts" },
    { id: "react", label: "React" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "laravel", label: "Laravel" },
    { id: "devops", label: "DevOps" },
  ];

  // Filter posts when selectedCategory changes
  useEffect(() => {
    setIsLoaded(false);

    setTimeout(() => {
      const filtered =
        selectedCategory === "all"
          ? posts
          : posts.filter((post) => post.categories.includes(selectedCategory));

      setFilteredPosts(filtered);
      setIsLoaded(true);
    }, 300);
  }, [selectedCategory]);

  return (
    <section className="py-24 min-h-screen bg-[#052d43] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#052d43]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,127,255,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(103,63,215,0.1),transparent_60%)]"></div>

      {/* Animated floating orbs */}
      <div className="absolute top-1/3 -right-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 -left-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl animate-float"></div>

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
              INSIGHTS & TUTORIALS
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-blue-400">Blog</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            I write about software engineering, best practices, and modern web
            development techniques. Dive into articles about React, Laravel,
            clean code, and more.
          </p>

          {/* Animated underline */}
          <div className="relative h-1 w-20 mx-auto mt-6 overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              style={{ animation: "shimmer 2s infinite" }}
            ></div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center p-1.5 bg-[#031d2e]/80 rounded-full backdrop-blur-lg border border-blue-900/30 shadow-lg shadow-blue-900/10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                } mx-1 overflow-hidden`}
              >
                {selectedCategory === category.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-90 rounded-full"></span>
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "all" && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-5 h-5 bg-blue-500 rounded-full mr-3"></span>
              Featured Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts
                .filter((post) => post.featured)
                .slice(0, 2)
                .map((post, index) => (
                  <div
                    key={post.id}
                    className={`group relative overflow-hidden rounded-xl transition-all duration-500 ${
                      isLoaded
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                    onMouseEnter={() => setActiveCard(post.id)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    {/* Glass card effect */}
                    <div className="absolute inset-0 bg-[#031d2e]/80 backdrop-blur-sm border border-blue-900/30 group-hover:border-blue-500/50 transition-all duration-300"></div>

                    {/* Top gradient banner */}
                    <div className={`h-20 ${post.image} relative`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#031d2e]/90"></div>

                      {/* Featured badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/80 text-white text-xs font-medium rounded-full z-10 shadow-lg shadow-blue-500/20 backdrop-blur-sm">
                        Featured
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs text-blue-400">
                          {post.date}
                        </span>
                        <span className="text-xs text-gray-400">
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-bold text-xl text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded-md"
                          >
                            #{category}
                          </span>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        iconPosition="right"
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        }
                      >
                        Read Article
                      </Button>

                      {/* Animated hover effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 ${
                          activeCard === post.id ? "opacity-100" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Glass card effect */}
              <div className="absolute inset-0 bg-[#031d2e]/80 backdrop-blur-sm border border-blue-900/30 group-hover:border-blue-500/50 transition-all duration-300"></div>

              {/* Top gradient banner */}
              <div className={`h-3 ${post.image}`}></div>

              {/* Content */}
              <div className="p-6 relative">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-blue-400">{post.date}</span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>

                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex gap-2 mb-4">
                  {post.categories.slice(0, 2).map((category, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 bg-blue-900/30 text-blue-300 rounded-md"
                    >
                      #{category}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    size="xs"
                    variant="ghost"
                    iconPosition="right"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                  >
                    Read More
                  </Button>
                </div>

                {/* Hover glow effect */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 filter blur-xl transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-20 bg-[#031d2e]/70 backdrop-blur-md rounded-2xl p-8 border border-blue-900/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-white mb-2">
                Subscribe to my Newsletter
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Get notified when I publish new articles and tutorials. No spam,
                unsubscribe anytime.
              </p>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md rounded-l-lg border border-blue-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
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

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Blog;
