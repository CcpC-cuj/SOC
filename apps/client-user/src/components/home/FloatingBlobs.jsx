export default function FloatingBlobs() {
  return (
    <>
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full animate-float-slow" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full animate-float-slow" />
    </>
  );
}