const SectionTitle = ({ title }) => {
  // Split the title to allow styling of the last word differently
  const words = title.split(" ");
  const lastWord = words.pop();
  const firstWords = words.join(" ");

  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold mb-4">
        <span className="text-white">{firstWords} </span>
        <span className="text-blue-400">{lastWord}</span>
      </h2>
      <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
    </div>
  );
};

export default SectionTitle;
