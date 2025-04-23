const Blog = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-10">Blog</h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
        I write about software engineering, Laravel, React, and clean code.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((item) => (
          <div key={item} className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-1">Blog Title {item}</h3>
            <p className="text-sm text-gray-600 mb-2">
              A quick intro to this blog article. More content will come soon.
            </p>
            <a href="#" className="text-blue-600 text-sm">
              Read more →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
