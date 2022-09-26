function SearchInput({ filterHandler }) {
  return (
    <input
      type="text"
      placeholder="Search"
      className="input input-bordered w-full max-w-lg"
      onChange={filterHandler}
    />
  );
}

export default SearchInput;
