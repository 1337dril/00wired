import { useState, useId, useRef } from "react";
import useStore from "../store/useStore";
import { createChannel } from "../utils/api";
import { validateCreateChannel } from "../utils/validators";

export default function DashboardCreateChannel() {
  const getUser = useStore((state) => state.getUser);
  const id = useId();
  const channelNameRef = useRef();
  const channelDescriptionRef = useRef();
  const channelPasswordRef = useRef();
  const channelConfirmPasswordRef = useRef();
  const [isPasswordCheckbox, setIsPasswordCheckbox] = useState(false);
  const [isChannelPrivate, setIsChannelPrivate] = useState(false);
  const [formError, setFormError] = useState([]);

  const createChannelHandler = async (e) => {
    e.preventDefault();

    const clientValidationErrors = validateCreateChannel({
      channelName: channelNameRef.current?.value,
      channelDescription: channelDescriptionRef.current?.value,
      channelPasswordObj: {
        isPassword: isPasswordCheckbox,
        password: channelPasswordRef.current?.value,
        confirmPassword: channelConfirmPasswordRef.current?.value,
      },
    });

    if (clientValidationErrors.length > 0) {
      setFormError(clientValidationErrors);
      if (channelPasswordRef.current?.value)
        channelPasswordRef.current.value = "";
      if (channelConfirmPasswordRef.current?.value)
        channelConfirmPasswordRef.current.value = "";
      return;
    }

    try {
      await createChannel(
        channelNameRef.current.value.trim(),
        channelDescriptionRef.current.value.trim(),
        isChannelPrivate,
        channelPasswordRef.current?.value
      );
      channelNameRef.current.value = "";
      channelDescriptionRef.current.value = "";
      setIsChannelPrivate(false);
      setIsPasswordCheckbox(false);
      await getUser();
    } catch (e) {
      setFormError(e.message.split("|"));
    }
  };
  const isPasswordHandler = () => setIsPasswordCheckbox((prev) => !prev);
  const isChannelPrivateHandler = () => setIsChannelPrivate((prev) => !prev);

  return (
    <div className="w-full bg-base-300 rounded-lg lg:bg-base-100">
      <div className="p-5 w-full">
        <h1 className="text-2xl  px-5">Create New Channel</h1>
        <div className="divider my-2" />
        <form onSubmit={createChannelHandler}>
          <div className="form-control py-3">
            <label className="label">
              <span className="label-text">
                What do you want to call your channel?
              </span>
            </label>
            <input
              type="text"
              id={"channelName-" + id}
              placeholder="Channel name"
              ref={channelNameRef}
              className="input input-bordered w-full max-w-lg"
            />
          </div>

          <div className="form-control py-3">
            <label className="label">
              <span className="label-text">What is your channel about?</span>
            </label>
            <textarea
              id={"channelDescription-" + id}
              placeholder="Channel description..."
              ref={channelDescriptionRef}
              className="textarea textarea-bordered w-full max-w-lg"
            />
          </div>
          <div className="">
            <label
              htmlFor={"isPassword- " + id}
              className="label cursor-pointer max-w-xs"
            >
              <span className="label-text">Password?</span>
              <input
                type="checkbox"
                checked={isPasswordCheckbox}
                id={"isPassword- " + id}
                // className="form-check-input mt-1 ml-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-skin-accent bg-skin-fill bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-skin-accent checked:bg-skin-accent focus:outline-none"
                className="checkbox checkbox-primary"
                onChange={isPasswordHandler}
              />
            </label>
            {isPasswordCheckbox && (
              <div className="form-control py-3">
                <input
                  type="password"
                  id={"channelPassword-" + id}
                  placeholder="Password"
                  ref={channelPasswordRef}
                  className="input input-bordered w-full max-w-lg"
                />
                <input
                  type="password"
                  id={"confirmChannelPassword-" + id}
                  placeholder="Confirm password"
                  ref={channelConfirmPasswordRef}
                  className="input input-bordered w-full max-w-lg"
                />
              </div>
            )}
          </div>
          <div className="">
            <label
              htmlFor={"isChannelPrivate- " + id}
              className="label cursor-pointer max-w-xs"
            >
              <span className="label-text">Private?</span>
              <input
                type="checkbox"
                id={"isChannelPrivate- " + id}
                checked={isChannelPrivate}
                onChange={isChannelPrivateHandler}
                className="checkbox checkbox-primary"
                // className="form-check-input mt-1 ml-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-skin-accent bg-skin-fill bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-skin-accent checked:bg-skin-accent focus:outline-none"
              />
            </label>
            <p className=" px-3 text-base-content text-sm leading-4 tracking-tight max-w-md">
              Private channels cannot be discovered via lookups and can only be
              joined through invitations..
            </p>
          </div>
          <div className="flex justify-center mt-4 max-w-lg w-full">
            <button type="submit" className="btn btn-primary ">
              Create channel
            </button>
          </div>
          <div className="my-2">
            {formError.map((err, idx) => (
              <div
                key={idx}
                className="my-1 border border-error rounded-sm p-2"
              >
                <p className="text-sm font-semibold text-error">{err}</p>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
