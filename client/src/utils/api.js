const GENERIC_ERROR = "Something went wrong..";
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

const routes = {
  fetchUserData: `${BASE_URL}/api/users/`,
  registerUser: `${BASE_URL}/api/users/register/`,
  loginUser: `${BASE_URL}/api/users/login/`,
  fetchChannels: `${BASE_URL}/api/rooms/`,
  fetchMessages: `${BASE_URL}/api/rooms/messages/`,
  joinChannel: `${BASE_URL}/api/rooms/join/`,
  leaveChannel: `${BASE_URL}/api/rooms/leave/`,
  createChannel: `${BASE_URL}/api/rooms/create/`,
  addToChannel: `${BASE_URL}/api/rooms/add/`,
};

const PREFIX = "wired-";
const authKey = PREFIX + "access_token";
export const getToken = (key = authKey) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};
const setToken = (value, key = authKey) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

export const fetchUserData = async () => {
  const token = getToken();
  if (!token) throw new Error("No token");
  const headers = {
    Authorization: "Bearer " + token,
  };
  const res = await fetch(routes.fetchUserData, { headers });
  if (res.status === 401) {
    //UNAUTHED
    throw new Error("Bad token or token expired.");
  } else if (!res.ok) {
    //SERVER ERROR
    throw new Error(GENERIC_ERROR);
  }
  const resJson = await res.json();
  if (resJson.user) {
    return resJson.user;
  } else {
    //SHOULDN'T EVER HAPPEN BUT SHOULD BE HANDLED ANYWAY JIC
    throw new Error(GENERIC_ERROR);
  }
};

export const registerUser = async (registrationData) => {
  const res = await fetch(routes.registerUser, {
    method: "POST",
    body: JSON.stringify(registrationData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
  });
  if (res.status === 400) {
    const resJson = await res.json();
    if (Array.isArray(resJson.errors) && resJson.errors.length > 0) {
      throw new Error(resJson.errors.join("|"));
    } else {
      throw new Error(resJson.message);
    }
  }
  if (res.status !== 201) {
    throw new Error(GENERIC_ERROR);
  }

  const resJson = await res.json();
  if (resJson.token) {
    setToken(resJson.token);
  } else {
    throw new Error(GENERIC_ERROR);
  }
};

export const loginUser = async (loginData) => {
  const res = await fetch(routes.loginUser, {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
  });
  if (res.status === 400) {
    const resJson = await res.json();
    if (
      resJson &&
      Array.isArray(resJson.errors) &&
      resJson.errors?.length > 0
    ) {
      throw new Error(resJson.errors.join("|"));
    } else {
      throw new Error("Wrong username or password..");
    }
  }
  if (!res.ok) {
    throw new Error(GENERIC_ERROR);
  }
  const resJson = await res.json();

  if (resJson.token) {
    setToken(resJson.token);
  } else {
    throw new Error(GENERIC_ERROR);
  }
};

export async function fetchChannels(filter) {
  const token = getToken();
  if (!token) throw new Error("No token");
  const headers = {
    Authorization: "Bearer " + token,
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json",
  };
  const params = filter ? `?filter=${filter}` : "";
  const res = await fetch(`${routes.fetchChannels}${params}`, { headers });
  if (!res.ok) {
    throw new Error(joinChannelROR);
  }
  const channels = (await res.json()).rooms;
  return channels;
}

export async function joinChannel(roomName, roomPassword = "") {
  const token = getToken();
  if (!token) throw new Error("No token");
  const headers = {
    Authorization: "Bearer " + token,
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json",
  };
  const body = roomPassword
    ? JSON.stringify({ roomName, roomPassword })
    : JSON.stringify({ roomName });
  const res = await fetch(routes.joinChannel, {
    headers,
    method: "POST",
    body,
  });
  if (!res.ok) {
    throw new Error(GENERIC_ERROR);
  }
  const confirmation = await res.json();
  return confirmation;
}
export async function leaveChannel(roomName) {
  const token = getToken();
  if (!token) throw new Error("No token");
  const headers = {
    Authorization: "Bearer " + token,
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json",
  };
  const body = JSON.stringify({ roomName });
  const res = await fetch(routes.leaveChannel, {
    headers,
    method: "POST",
    body,
  });
  if (!res.ok) {
    throw new Error(GENERIC_ERROR);
  }
  const confirmation = await res.json();
  return confirmation;
}
export async function addToChannel(usernames, roomName) {
  const token = getToken();
  if (!token) throw new Error("No token");
  const headers = {
    Authorization: "Bearer " + token,
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json",
  };
  const body = JSON.stringify({ roomName, usernames });

  const res = await fetch(routes.addToChannel, {
    headers,
    method: "POST",
    body,
  });
  if (!res.ok) {
    throw new Error(GENERIC_ERROR);
  }
  const confirmation = await res.json();
  return confirmation;
}
export async function fetchMessages(roomName) {
  const token = getToken();
  if (!token) throw new Error("No token");
  const headers = {
    Authorization: "Bearer " + token,
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json",
  };
  const params = roomName ? `?roomName=${roomName}` : "";
  const res = await fetch(`${routes.fetchMessages}${params}`, { headers });
  if (!res.ok) {
    throw new Error(GENERIC_ERROR);
  }
  const messages = await res.json();
  return messages;
}

export async function createChannel(
  roomName,
  description,
  isPrivate,
  roomPassword = ""
) {
  const token = getToken();
  if (!token) throw new Error("No token");
  const headers = {
    Authorization: "Bearer " + token,
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json",
  };
  const body = roomPassword
    ? JSON.stringify({ roomName, roomPassword, description, isPrivate })
    : JSON.stringify({ roomName, description, isPrivate });
  const res = await fetch(routes.createChannel, {
    method: "POST",
    body,
    headers,
  });
  const resJson = await res.json();
  if (res.status === 400) {
    throw new Error(resJson?.errors.join("|"));
  } else if (res.status !== 201) {
    throw new Error(GENERIC_ERROR);
  } else {
    return resJson;
  }
}
