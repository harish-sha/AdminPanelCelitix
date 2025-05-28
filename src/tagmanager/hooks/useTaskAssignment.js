import { useState } from "react";

export const useTaskAssignment = () => {
  const [assignments, setAssignments] = useState([]);

  const assignTagToTask = (taskId, tagId) => {
    setAssignments((prev) => [...prev, { taskId, tagId }]);
  };

  const removeTagFromTask = (taskId, tagId) => {
    setAssignments((prev) =>
      prev.filter(
        (assign) => !(assign.taskId === taskId && assign.tagId === tagId)
      )
    );
  };

  const getTagsForTask = (taskId) => {
    return assignments
      .filter((assign) => assign.taskId === taskId)
      .map((a) => a.tagId);
  };

  return {
    assignments,
    assignTagToTask,
    removeTagFromTask,
    getTagsForTask,
  };
};
