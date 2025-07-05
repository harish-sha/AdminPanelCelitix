import { useState } from "react";

export const useTagRules = () => {
  const [rules, setRules] = useState([]);

  const addRule = (rule) => {
    setRules((prev) => [...prev, rule]);
  };

  const removeRule = (ruleId) => {
    setRules((prev) => prev.filter((rule) => rule.id !== ruleId));
  };

  const updateRule = (ruleId, updatedData) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, ...updatedData } : rule
      )
    );
  };

  return {
    rules,
    addRule,
    removeRule,
    updateRule,
  };
};
