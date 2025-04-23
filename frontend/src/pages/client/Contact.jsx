const Contact = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Me</h1>
      <form className="space-y-4 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-2 rounded"
        />
        <textarea
          rows="4"
          placeholder="Your Message"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
