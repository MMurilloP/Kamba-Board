import { Column, Id, Task } from "../Types";
import Plusicon from "../icons/Plusicon";
import { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

function KambanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);

  const columnsId = useMemo(() => {
    return columns.map((column) => column.id);
  }, [columns]);
  console.log(columns);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeColumnId, setActiveColumnId] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

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

  const updateColumn = (id: Id, title: string) => {
    const newColums = columns.map((col) => {
      if (col.id === id) {
        return { ...col, title };
      }
      return col;
    });
    setColumns(newColums);
  };

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateID(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: Id) => {
    const newTasts = tasks.filter((task) => task.id !== id);
    setTasks(newTasts);
  };

  const updateTask = (id: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, content };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const generateID = () => {
    return Math.floor(Math.random() * 1000001);
  };

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column") {
      setActiveColumnId(e.active.data.current.column);
      return;
    }
    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  };

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    // droping a task over another taks

    // drp a task on other column
  };
  const onDragEnd = (e: DragStartEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  return (
    <div className="m-auto flex min-h-screen w-full items-center  overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  delelteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
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
        {createPortal(
          <DragOverlay>
            {activeColumnId && (
              <ColumnContainer
                column={activeColumnId}
                delelteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumnId.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default KambanBoard;
