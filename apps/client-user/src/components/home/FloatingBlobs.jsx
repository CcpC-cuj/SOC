// FloatingBlobs.jsx

const FloatingBlobs = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* CYAN BLOB */}
      <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-cyan-500/20 blur-3xl" />

      {/* PURPLE BLOB */}
      <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-purple-500/20 blur-3xl" />

    </div>
  );
};

export default FloatingBlobs;