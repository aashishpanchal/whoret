import { img } from "@/constants/img";
import { Link } from "react-router-dom";
import { buttonProps } from "./ui/button";

type Props = {
  type?: "admin" | "app";
};

export default function Header({}: Props) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between w-full px-12 py-1 bg-white border-b border-stone-100">
      <Link to="/" className="flex-none w-16">
        <img src={img.logo} alt="Logo" className="w-full" />
      </Link>
      <nav className="flex items-center justify-center space-x-5">
        <ul className="items-center justify-between hidden gap-5 md:flex">
          <NavItem to="/" text="Home" />
          <NavItem to="about" text="About" />
          <NavItem to="download-app" text="Download App" />
          <NavItem to="contact-us" text="Contact us" />
        </ul>
        <div className="flex space-x-2">
          <Link to="/login" className={buttonProps({ variant: "primary" })}>
            Login
          </Link>
          <Link to="/register" className={buttonProps({ variant: "outline" })}>
            Signup
          </Link>
        </div>
      </nav>
    </header>
  );
}

function NavItem(props: { to: string; text: string }) {
  return (
    <li className="px-2 py-1 text-sm font-medium cursor-pointer">
      <Link to={props.to} className="pb-1 duration-100 hover:text-primary">
        {props.text}
      </Link>
    </li>
  );
}
