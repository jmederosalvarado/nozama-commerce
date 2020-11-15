import { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../fetch/clients";
import { RootState } from "../../store";
import { login, logout } from "../../store/auth/actions";
import { UserPreview } from "../../types/users";
import LogoutIconSM from "../icons/heroicons/small/logout";

type LoginRegisterMenuProps = {
  handleLogin: (username: string, password: string) => void;
  handleRegister: (username: string, password: string) => void;
};

function LoginRegisterMenu({
  handleLogin,
  handleRegister,
}: LoginRegisterMenuProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div
      className="fixed inset-x-0 mx-auto w-full max-w-xs px-8 z-50"
      style={{ top: "33%" }}
    >
      <div className="bg-white flex flex-col items-center p-8 pt-4 rounded-lg shadow-xl">
        <div className="text-center font-bold text-gray-600">
          Welcome to Nozama
        </div>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => {
            e.preventDefault();
            setUsername(e.target.value);
          }}
          className="mt-8 border rounded-full px-2 py-1 text-center focus:outline-none min-w-0"
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
          className="mt-3 border rounded-full px-2 py-1 text-center focus:outline-none min-w-0"
        />
        <div className="mt-8 flex items-center justify-center">
          <button
            className="bg-teal-500 rounded-full w-24 py-1 text-white font-bold"
            onClick={() => handleLogin(username, password)}
          >
            Login
          </button>
          <button
            className="ml-5 bg-indigo-500 rounded-full w-24 py-1 text-white font-bold"
            onClick={() => handleRegister(username, password)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AuthMenu() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <div className="fixed bottom-0 right-0 z-50 p-5">
        <button
          className="rounded-full bg-white border-white border-4 shadow-lg overflow-hidden w-16 h-16 focus:outline-none hover:shadow-xl"
          onClick={() => {
            setShowMenu((prevShowMenu) => !prevShowMenu);
          }}
        >
          <img
            src={(user && user.image) || "/img/user.jpg"}
            className="w-full h-full object-cover object-center"
          />
        </button>
      </div>

      {!user && showMenu && (
        <LoginRegisterMenu
          handleLogin={async (username, password) => {
            try {
              const { data } = await api.get<UserPreview>("/users/login", {
                params: {
                  username: username,
                  password: password,
                },
              });
              dispatch(login(data));
            } catch (error) {}
            setShowMenu(false);
          }}
          handleRegister={async (username, password) => {
            try {
              const { data } = await api.post<UserPreview>("/users/register", {
                username: username,
                password: password,
                image: "",
              });
              dispatch(login(data));
            } catch (error) {}
            setShowMenu(false);
          }}
        />
      )}

      {user && showMenu && (
        <div
          className="fixed z-50 inset-x-0 mx-auto w-full max-w-xs px-8"
          style={{ top: "33%" }}
        >
          <div className="bg-white flex flex-col items-center p-8 pt-4 rounded-lg shadow-xl">
            <div className="text-center font-bold text-gray-600">
              {`Welcome ${user.username}`}
            </div>
            <Link href="/user/offers">
              <a
                className="mt-3 rounded-full px-5 py-1 font-bold focus:outline-none hover:text-indigo-500 text-center"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                View Offers
              </a>
            </Link>
            <Link href="/user/auctions">
              <a
                className="mt-1 rounded-full px-5 py-1 font-bold focus:outline-none hover:text-indigo-500 text-center"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                View Auctions
              </a>
            </Link>
            <Link href="/user">
              <a
                className="mt-1 rounded-full px-5 py-1 font-bold focus:outline-none hover:text-indigo-500 text-center"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                View Profile
              </a>
            </Link>
            <Link href="/user/cart">
              <a
                className="mt-1 rounded-full px-5 py-1 font-bold focus:outline-none hover:text-indigo-500 text-center"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                View Cart
              </a>
            </Link>
            <button
              className="mt-3 rounded-full px-5 py-1 focus:outline-none text-white bg-red-800 flex items-center justify-center shadow hover:shadow-xl"
              onClick={() => {
                dispatch(logout());
                setShowMenu(false);
              }}
            >
              <span className="font-bold uppercase text-xs tracking-wide">
                Logout
              </span>
              <LogoutIconSM className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
