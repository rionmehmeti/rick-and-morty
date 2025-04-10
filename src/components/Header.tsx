import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from 'react-router-dom';

function Header() {

    return (
      <header className="bg-blue-100 p-4 flex items-center gap-4">
        <div className="w-[1000px] mx-auto flex justify-between items-center ">
            <img src="/logo_rnm.png" alt="Rick and Morty Logo" className="h-12" />
            <LanguageSwitcher />
        </div>
      </header>
    );
  }
  
  export default Header;
  