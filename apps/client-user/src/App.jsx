// App.jsx


function App() {
  return (
    <MainLayout>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

      </Routes>

    </MainLayout>
  );
};

export default App;