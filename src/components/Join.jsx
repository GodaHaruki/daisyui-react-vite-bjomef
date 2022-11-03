import { useAsyncCookie } from "./Cookie.jsx";
import { Navigate } from "react-router-dom";

const Join = () => {
  const { cookie } = useAsyncCookie();
  const roomID = "URLParameter";

  return roomID == null ? (
    <Navigate replace to="/" />
  ) : (
    <div>
      <input
        type="text"
        placeholder="Type room code here"
        className="input input-bordered w-full max-w-xs"
      />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Digit</th>
              <th>Times</th>
            </tr>
          </thead>
          <tbody>
            {cookie.dicCookie.rooms.map(
              (
                e // unimplimengted!
              ) => (
                <tr>
                  <th>{e.name}</th>
                  <th>{e.desc}</th>
                  <th>{e.digit}</th>
                  <th>{e.times}</th>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Join;
