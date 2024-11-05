import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex-grow flex flex-col w-full h-full">
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default MainLayout;
