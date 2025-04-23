const Projects = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Projects</h1>
        <p className="text-gray-600 mt-2 text-sm max-w-xl mx-auto">
          A selection of my latest and most meaningful projects, covering
          frontend, backend, and full-stack builds.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="rounded-lg border p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="h-40 bg-gray-200 mb-4 rounded"></div>
            <h3 className="font-semibold text-lg mb-1">Project {item}</h3>
            <p className="text-sm text-gray-600 mb-2">
              This is a short description about what the project does and how it
              was built.
            </p>
            <a href="#" className="text-blue-600 text-sm font-medium">
              View details →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
