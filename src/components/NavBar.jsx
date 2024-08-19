/* eslint-disable react/prop-types */

import MenuButton from "./menu/MenuButton";
export default function NavBar({
  onSectionChange,
  isMenuOpened,
  setIsMenuOpened,
}) {
  return (
    <nav className="fixed top-0 left-0 z-20 w-full py-8 px-14">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            onClick={() => {
              onSectionChange(0);
            }}
            src="/src/assets/logo.png"
            alt="logo"
            className="h-8 cursor-pointer"
          />
        </div>
        <MenuButton
          onSectionChange={onSectionChange}
          isMenuOpened={isMenuOpened}
          setIsMenuOpened={setIsMenuOpened}
        />
      </div>
    </nav>
  );
}
