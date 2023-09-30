function KambanBoard() {
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <button className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 boder-columnBackgroundColor p-4 ring-rose-500 hover:ring-2">
        {" "}
        Add Column
      </button>
    </div>
  );
}

export default KambanBoard;
