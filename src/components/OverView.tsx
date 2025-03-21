import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Todo } from "@/types/types";

const OverView = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  // Get counts by category
  const categoryCounts: { [key: string]: number } = {};
  todos.forEach((todo: Todo) => {
    if (todo.category) {
      categoryCounts[todo.category] = (categoryCounts[todo.category] || 0) + 1;
    } else {
      categoryCounts["Uncategorized"] =
        (categoryCounts["Uncategorized"] || 0) + 1;
    }
  });

  return (
    <div className="mt-6 flex items-center justify-between">
      <p>Total todos: {todos.length}</p>
      <p>
        Active todos: {todos.filter((todo: Todo) => !todo.completed).length}
      </p>
      <p>
        Completed todos: {todos.filter((todo: Todo) => todo.completed).length}
      </p>
      {/*how much % completed round to 0 decimals*/}
      <p>
        {Math.round(
          (todos.filter((todo: Todo) => todo.completed).length / todos.length) *
            100,
        )}
        %
      </p>
    </div>
  );
};
export default OverView;
