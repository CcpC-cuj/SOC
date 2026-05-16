function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F6E28B] flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-10">

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;