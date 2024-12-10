import Wrapper from "../common/Wrapper";
import { Link, useLocation } from "react-router-dom";
import { House, Bell, Users, Menu, CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export default function Navbar() {
  const query = useLocation();
  return (
    <nav className="w-full shadow-sm">
      <Wrapper
        className={
          "flex items-center justify-between py-4 border-b-2 border-gray-300"
        }
      >
        <div>
          <span className="text-2xl font-medium">UsChat</span>
        </div>
        <div className="flex items-center gap-8 md:gap-12 lg:gap-16 bg-">
          <Link to={"/"}>
            <House
              className={`${
                query.pathname === "/" && "text-blue-700"
              } cursor-pointer`}
              size={25}
            />
          </Link>
          <Link to={"/suggestion"}>
            <Users
              className={`${
                query.pathname === "/suggestion" && "text-blue-700"
              } cursor-pointer`}
              size={25}
            />
          </Link>
          <Link to={"/notification"}>
            <Bell
              className={`${
                query.pathname === "/notification" && "text-blue-700"
              } cursor-pointer`}
              size={25}
            />
          </Link>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <CircleUserRound className="cursor-pointer" size={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-4">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Wrapper>
    </nav>
  );
}
