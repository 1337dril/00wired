import { useState, useId, useRef } from "react";
import useStore from "../store/useStore";
import { createChannel } from "../utils/api";
import {
  nameValidator as channelNameValidator,
  descriptionValidator as channelDescriptionValidator,
  passwordValidator as channelPasswordValidator,
  confirmPasswordValidator as channelConfirmPasswordValidator,
} from "../utils/validators";

export default function DashboardCreateChannel() {
  const getUser = useStore((state) => state.getUser);
  const id = useId();
  const channelNameRef = useRef();
  const channelDescriptionRef = useRef();
  const channelPasswordRef = useRef();
  const channelConfirmPasswordRef = useRef();
  const [isPasswordCheckbox, setIsPasswordCheckbox] = useState(false);
  const [isChannelPrivate, setIsChannelPrivate] = useState(false);
  const [formError, setFormError] = useState({ status: false, message: "" });
  const createChannelHandler = async (e) => {
    e.preventDefault();
    const isValidChannelName = channelNameValidator(
      channelNameRef.current.value.trim()
    );
    const isValidChannelDescription = channelDescriptionValidator(
      channelDescriptionRef.current.value.trim()
    );
    // If a room has password
    if (isPasswordCheckbox) {
      const isValidChannelPassword = channelPasswordValidator(
        channelPasswordRef.current?.value
      );
      const isValidChannelConfirmPassword = channelConfirmPasswordValidator(
        channelPasswordRef.current?.value,
        channelConfirmPasswordRef.current?.value
      );

      const isValid =
        isValidChannelName &&
        isValidChannelDescription &&
        isValidChannelPassword &&
        isValidChannelConfirmPassword;

      // Setting error state and returning
      if (!isValid) {
        if (!isValidChannelName) {
          setFormError({
            status: true,
            message:
              'Channel name has to be "> 3 characters" and "< 50 characters" and only contain the symbols "-" or "_".',
          });
        } else if (!isValidChannelDescription) {
          setFormError({
            status: true,
            message: 'Channel description has to be "< 500 characters".',
          });
        } else if (!isValidChannelPassword) {
          setFormError({
            status: true,
            message:
              'Password has to be "> 8 characters" and "< 80 characters".',
          });
        } else if (!isValidChannelConfirmPassword) {
          setFormError({
            status: true,
            message: '"Password" doesn\'t match "Confirm password."',
          });
        }
        channelPasswordRef.current.value = "";
        channelConfirmPasswordRef.current.value = "";
        return;
      }
      // Trying to set post req to make channel
      try {
        await createChannel(
          channelNameRef.current.value.trim(),
          channelDescriptionRef.current.value.trim(),
          isChannelPrivate,
          channelPasswordRef.current.value
        );

        channelNameRef.current.value = "";
        channelDescriptionRef.current.value = "";
        if (channelPasswordRef.current.value) {
          channelPasswordRef.current.value = "";
        }
        if (channelConfirmPasswordRef.current.value) {
          channelConfirmPasswordRef.current.value = "";
        }
        setIsChannelPrivate(false);
        setIsPasswordCheckbox(false);
        setFormError({ status: false, message: "" });
        await getUser();
      } catch (e) {
        setFormError({ status: true, message: e.message });
        console.error(e);
      }
    }
    // If channel didn't have password
    else {
      // Checking validitiy and returning if invalid input
      const isValid = isValidChannelName && isValidChannelDescription;
      if (!isValid) {
        if (!isValidChannelName) {
          setFormError({
            status: true,
            message:
              'Channel name has to be "> 3 characters" and "< 50 characters".',
          });
        } else if (!isValidChannelDescription) {
          setFormError({
            status: true,
            message: 'Channel description has to be "< 500 characters".',
          });
        }
        channelPasswordRef.current.value = "";
        channelConfirmPasswordRef.current.value = "";
        return;
      }
      // Trying to post to create channel
      try {
        await createChannel(
          channelNameRef.current?.value?.trim(),
          channelDescriptionRef.current?.value?.trim(),
          isChannelPrivate
        );

        if (channelNameRef.current?.value) {
          channelNameRef.current.value = "";
        }
        if (channelDescriptionRef.current?.value) {
          channelDescriptionRef.current.value = "";
        }
        if (channelPasswordRef.current?.value) {
          channelPasswordRef.current.value = "";
        }
        if (channelConfirmPasswordRef.current?.value) {
          channelConfirmPasswordRef.current.value = "";
        }
        setIsChannelPrivate(false);
        setIsPasswordCheckbox(false);
        setFormError({ status: false, message: "" });
        await getUser();
      } catch (e) {
        setFormError({ status: true, message: e.message });
        console.error(e);
      }
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
          {formError?.status && (
            <p className="bg-error border border-error text-error-content p-5 rounded-lg max-w-lg my-3">
              {formError.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
