const CTASection = () => {
  return (
    <section className="bg-blue-900 text-white rounded-3xl py-20 px-10 text-center">
      
      <h2 className="text-5xl font-bold max-w-4xl mx-auto">
        Ready to build the future of tech?
      </h2>

      <p className="mt-6 text-lg opacity-80 max-w-2xl mx-auto">
        Applications for Summer 2026 are filling up fast.
      </p>

      <div className="flex justify-center gap-4 mt-10">
        
        <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold">
          Apply Now
        </button>

        <button className="border border-white px-8 py-4 rounded-full">
          Join Discord
        </button>
      </div>
    </section>
  );
};

export default CTASection;