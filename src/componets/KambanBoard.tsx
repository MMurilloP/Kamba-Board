import { Column, Id } from "../Types";
import Plusicon from "../icons/Plusicon";
import { useState } from "react";
import ColumnContainer from "./ColumnContainer";

function KambanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  console.log(columns);

  const createNewColumn = () => {
    const columnsToAdd: Column = {
      id: generateID(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnsToAdd]);
  };

  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((column) => column.id !== id);
    setColumns(filteredColumns);
  };

  const generateID = () => {
    return Math.floor(Math.random() * 1000001);
  };

  return (
    <div className="m-auto flex min-h-screen w-full items-center  overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-2">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              delelteColumn={deleteColumn}
            />
          ))}
        </div>
        <button
          onClick={createNewColumn}
          className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 boder-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2"
        >
          {" "}
          <Plusicon />
          Add Column
        </button>
      </div>
    </div>
  );
}

export default KambanBoard;
