const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="p-4 bg-white shadow">My Portfolio</header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default MainLayout;
