import { useCallback, useEffect, useState } from "react";
import { fetchChannels } from "../utils/api";
import debounce from "../utils/debounce";
import ChannelItem from "./ChannelItem";
import SearchInput from "./SearchInput";
import Spinner from "./Spinner";

export default function DashboardJoinChannels() {
  const [isLoading, setIsLoading] = useState(true);
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    fetchChannels()
      .then((rooms) => setChannelList(rooms))
      .finally(() => setIsLoading(false));
  }, []);

  const filterHandler = (e) => {
    fetchChannels(e.target.value).then((rooms) => setChannelList(rooms));
  };

  const debouncedFilterHandler = useCallback(debounce(filterHandler, 300), []);

  return (
    <div className="w-full border-l bg-dark-gray-500">
      <div className="w-full p-5">
        <h1 className="px-5  text-2xl">Join Channels</h1>
        <div className="divider my-2" />
        <form className="my-1 w-full px-5" onSubmit={(e) => e.preventDefault()}>
          <SearchInput filterHandler={debouncedFilterHandler} />
        </form>
        <div className="pt-2 pb-7">
          {isLoading && <Spinner />}
          {!isLoading &&
            channelList?.map((channel) => (
              <ChannelItem key={channel.name} channel={channel} />
            ))}
        </div>
      </div>
    </div>
  );
}
