const TimelineSection = () => {
  return (
    <section className="py-20 bg-white rounded-3xl shadow">
      
      <h2 className="text-5xl font-bold text-center text-blue-900 mb-16">
        The Roadmap to Success
      </h2>

      <div className="space-y-12 max-w-4xl mx-auto">
        
        <div>
          <h3 className="text-2xl font-bold text-blue-900">
            Applications Close
          </h3>

          <p className="text-gray-500">March 15, 2026</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-blue-900">
            Onboarding & Pairing
          </h3>

          <p className="text-gray-500">April 2026</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-blue-900">
            Build Phase
          </h3>

          <p className="text-gray-500">June - August 2026</p>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;