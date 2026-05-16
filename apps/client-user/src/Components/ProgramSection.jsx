const ProgramSection = () => {
  return (
    <section className="py-20">
      
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-blue-900">
          Choose Your Season
        </h2>

        <p className="text-gray-600 mt-4">
          Two distinct paths tailored to different learning paces.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-3xl p-10 shadow hover:-translate-y-2 transition">
          <h3 className="text-3xl font-bold text-blue-900 mb-4">
            Summer Program
          </h3>

          <p className="text-gray-600 mb-6">
            Intensive 10-week sprint focused on rapid prototyping.
          </p>

          <ul className="space-y-3 mb-6">
            <li>✔ Duration: June - August</li>
            <li>✔ Industry Mentorship</li>
            <li>✔ Hackathon Finals</li>
          </ul>

          <button className="w-full bg-blue-900 text-white py-4 rounded-full">
            Apply for Summer
          </button>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow hover:-translate-y-2 transition">
          <h3 className="text-3xl font-bold text-blue-900 mb-4">
            Autumn Challenge
          </h3>

          <p className="text-gray-600 mb-6">
            12-week deep dive into specialized domains.
          </p>

          <ul className="space-y-3 mb-6">
            <li>✔ Duration: Sept - Nov</li>
            <li>✔ Research Opportunities</li>
            <li>✔ Contribution Rewards</li>
          </ul>

          <button className="w-full bg-blue-900 text-white py-4 rounded-full">
            Apply for Autumn
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;