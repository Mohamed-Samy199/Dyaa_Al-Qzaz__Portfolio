import { SidebarWithBurgerMenu } from "./Sidebar/Sidebar";

function Navbar() {
  return (
    <>
      <div className="flex justify-between items-center px-2 md:px-10 fixed top-0 left-0 right-0 shadow-xl  z-60">
        <SidebarWithBurgerMenu />
      </div>
    </>
  );
}

export default Navbar;