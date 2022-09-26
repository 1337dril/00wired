import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { addToChannel } from "../utils/api";

export default function AddToChannelModal({ channel }) {
  const usernameRef = useRef();
  const [successfullyAddedUser, setSuccessfullyAddedUser] = useState(null);

  const AddToChannelHandler = async (e) => {
    e.preventDefault();
    setSuccessfullyAddedUser(null);
    if (!usernameRef.current?.value) return;
    try {
      const confirmation = await addToChannel(
        [usernameRef.current.value.trim()],
        channel
      );
      setSuccessfullyAddedUser(confirmation.successfullyAdded[0]);
      usernameRef.current.value = "";
    } catch (e) {
      console.error(e);
    }
  };
  return createPortal(
    <>
      <input
        type="checkbox"
        id={`${channel}-adduser-modal`}
        className="modal-toggle"
      />
      <label
        htmlFor={`${channel}-adduser-modal`}
        className="modal cursor-pointer"
      >
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-secondary">{channel}</h3>
          <form
            onSubmit={AddToChannelHandler}
            className="flex flex-col items-center"
          >
            <input
              type="username"
              placeholder="Username"
              className="input input-bordered w-full my-2 max-w-xs"
              ref={usernameRef}
            />
            {successfullyAddedUser && (
              <div>
                Successfully added{" "}
                <span className="text-primary">{successfullyAddedUser}</span>
              </div>
            )}
            <button className="btn glass my-1" type="submit">
              Add user
            </button>
          </form>
        </label>
      </label>
    </>,
    document.getElementById("add-portal")
  );
}
