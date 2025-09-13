export const generatePayload = (
  nodesInputData: Record<string, any>,
  nodes: any[]
) => {
  const workflowValueObject: Record<string, any> = {};
  const typeCounters: Record<string, number> = {};

  nodes.forEach((node) => {
    const originalType = node.type;

    if (!typeCounters[originalType]) {
      typeCounters[originalType] = 0;
    }

    const currentIndex = typeCounters[originalType];
    const key = `${originalType}_${currentIndex}`;
    typeCounters[originalType]++;

    const nodeInput = nodesInputData[node.id] || {};

    if (currentIndex === 0) {
      workflowValueObject[key] = null;
    } else {
      workflowValueObject[key] = {
        variables: nodeInput.variables || [],
        fileInput: nodeInput.fileInput ?? null,
        urlValues: nodeInput.urlValues ?? null,
        isunicode: 0,
        entityId: 0,
        urlIndex: -1,
      };
    }
  });

  workflowValueObject["apiCount"] = 0;

  return workflowValueObject;
};
