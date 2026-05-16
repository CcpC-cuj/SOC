const DomainsSection = () => {
  return (
    <section className="py-20">
      
      <h2 className="text-5xl font-bold text-center text-blue-900 mb-16">
        Exploration Domains
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="md:col-span-2 bg-blue-900 text-white rounded-3xl p-10">
          <h3 className="text-3xl font-bold mb-4">
            AI & Machine Learning
          </h3>

          <p className="opacity-80">
            Build generative models and intelligent systems.
          </p>
        </div>

        <div className="bg-cyan-900 text-white rounded-3xl p-10">
          <h3 className="text-3xl font-bold mb-4">
            Web Development
          </h3>

          <p>Modern full-stack architectures.</p>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow">
          <h3 className="text-3xl font-bold text-blue-900 mb-4">
            UI/UX Design
          </h3>

          <p className="text-gray-600">
            Accessibility and high-fidelity prototyping.
          </p>
        </div>

        <div className="bg-gray-100 rounded-3xl p-10">
          <h3 className="text-3xl font-bold text-blue-900 mb-4">
            DevOps & Cloud
          </h3>

          <p className="text-gray-600">
            Kubernetes, AWS and CI/CD pipelines.
          </p>
        </div>

        <div className="bg-red-400 text-white rounded-3xl p-10">
          <h3 className="text-3xl font-bold mb-4">
            Open Source
          </h3>

          <p>Contributing to global digital infrastructure.</p>
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;