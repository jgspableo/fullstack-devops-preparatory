import { useState, useEffect } from "react";
import { getAllPoopCount, addPoopCount, getAllUsers } from "../api/poopAPI";
import AddBtn from "./AddBtn";
import UserSlider from "./UserSlider";

export default function DailyRow({ user }) {
  //store users' poop count
  const [counts, setCounts] = useState([]);

  //store all users
  const [users, setUsers] = useState([]);

  //fetch all distinct users
  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  //set current user
  const [currentUser, setCurrentUser] = useState(user);

  //fetch all users' poop count
  useEffect(() => {
    getAllPoopCount().then((data) => {
      setCounts(data);
    });
  }, []);

  //handle add button click
  const handleAdd = async (username) => {
    await addPoopCount(username);
    const updated = await getAllPoopCount();
    setCounts(updated);
  };

  //return poop count depending on who is the user
  const userCount = (username) => {
    const pooper = counts.find((u) => u.username === username);
    return pooper?.poop_count ?? 0;
  };

  //dynamic colors based on user
  const colors = {
    babi: "purple",
    pabi: "blue",
  };

  return (
    <div>
      <div className="p-5 w-screen grid place-items-center grid-rows-2">
        <div className="flex flex-1 gap-5.5 items-center justify-center">
          <h1 className="text-4xl font-bold ">Daily Poop</h1>
          <UserSlider
            size={40}
            user={currentUser}
            onChange={(checked) => setCurrentUser(checked ? "babi" : "pabi")}
          />
        </div>
        <div className="m-3.5 flex flex-col">
          <div className="flex flex-1 gap-3.5 items-center justify-center">
            <h2 className="text-2xl font-medium">{currentUser}</h2>
            <p className="text-2xl">{userCount(currentUser)}💩</p>
            <AddBtn
              onClick={() => {
                handleAdd(currentUser);
              }}
              color={colors[currentUser] ?? "red"} //red is fallback if null or undefined
              size={30}
            />
          </div>
          {users
            .filter((u) => u.username !== currentUser)
            .map((u) => (
              <div
                key={u.username}
                className="flex flex-1 gap-3.5 items-center justify-center"
              >
                <h2 className="text-2xl font-medium">{u.username}</h2>
                <p className="text-2xl">{userCount(u.username)}💩</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
