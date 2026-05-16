const StatsSection = () => {
  const stats = [
    ["95%", "Job Placement"],
    ["500+", "Industry Mentors"],
    ["40+", "Countries"],
    ["10M+", "Lines of Code"],
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-20">
      
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-8 text-center shadow"
        >
          <h2 className="text-5xl font-bold text-blue-900">
            {item[0]}
          </h2>

          <p className="text-gray-600 mt-3">
            {item[1]}
          </p>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;