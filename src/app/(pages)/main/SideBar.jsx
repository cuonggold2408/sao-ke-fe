const SideBar = () => {
  return (
    <div className="p-4">
      <div className={"flex items-center gap-3 p-2 cursor-pointer"}>
        <div
          className={
            "flex items-center justify-center w-12 h-12 rounded-md bg-blue-50"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
            <path d="M9 7l1 0"></path>
            <path d="M9 13l6 0"></path>
            <path d="M13 17l2 0"></path>
          </svg>
        </div>
        <span className="text-xl font-semibold">Sao kê</span>
      </div>
      <div className="w-full border-t-2 border-blue-500 mt-1"></div>
    </div>
  );
};

export default SideBar;
