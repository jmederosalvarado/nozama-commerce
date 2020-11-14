import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../fetch/clients";
import { RootState } from "../../store";
import { login } from "../../store/auth/actions";
import { UserDetails } from "../../types/users";

export default function UserDetailsPage() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const username = auth.user && auth.user.username;
  const [user, setUser] = useState<UserDetails>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await api.get<UserDetails>(`users/${username}`);
        setUser(data);
      } catch (error) {}
    }

    if (!username) return;
    fetchUser();
  }, [username]);

  if (!user) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      <div className="rounded-b-lg shadow-lg overflow-hidden">
        <img
          className="w-full h-64 object-cover object-center"
          src={user.image || "/img/user.jpg"}
        />
        <label className="w-full focus:outline-none text-center block uppercase font-bold text-xs p-1 text-gray-600 hover:bg-indigo-100">
          Choose File
          <input
            type="file"
            className="hidden w-full h-full"
            onChange={(e) => {
              e.preventDefault();
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onload = () => {
                const src = reader.result as string;
                setUser((user) => ({
                  ...user,
                  image: src,
                }));
              };
              if (file) {
                reader.readAsDataURL(file);
              }
            }}
          />
        </label>
      </div>
      <div className="flex flex-col items-end mt-2">
        <div className="mt-2">
          <label className="text-gray-600 font-bold">
            Password:
            <input
              className="ml-2 bg-transparent border-b-2 focus:outline-none text-gray-700 align-bottom w-56"
              type="password"
              value={user.password}
              onChange={(e) => {
                e.preventDefault();
                const password = e.target.value;
                setUser((user) => ({
                  ...user,
                  password: password,
                }));
              }}
            />
          </label>
        </div>
        <div className="mt-5">
          <button
            className="bg-indigo-400 hover:bg-indigo-500 focus:outline-none px-3 rounded-full py-1 text-white font-bold uppercase tracking-wide text-sm"
            onClick={async () => {
              try {
                const { data } = await api.put<UserDetails>(
                  `/users/${user.username}`,
                  user
                );
                setUser(data);
                dispatch(login(data));
              } catch (error) {}
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
