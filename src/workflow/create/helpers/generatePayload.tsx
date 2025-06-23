export const generatePayload = (
  nodesInputData: Record<string, any>,
  nodes: any[],
  edges: any[]
) => {
  const payload = [];

  nodes.forEach((node) => {
    const originalType = node.type;
    const value = `${originalType}_${node.id}`;
    const nodeInput = nodesInputData[node.id] || {};

    // //prevNode
    // const incomingEdge = edges.find((edge) => edge.target === node.id);
    // const prevNode = incomingEdge
    //   ? `${
    //       nodes.find((n) => n.id === incomingEdge.source)?.type === "starting"
    //         ? "START"
    //         : nodes.find((n) => n.id === incomingEdge.source)?.type
    //     }_${incomingEdge.source}`
    //   : "";

    //nextNodes
    const outgoingEdges = edges.filter((edge) => edge.source === node.id);
    const nextNodes = outgoingEdges
      .map((edge) => {
        const target = nodes.find((n) => n.id === edge.target);
        if (!target) return null;
        const tType = target.type === "starting" ? "START" : target.type;
        return `${tType}_${target.id}`;
      })
      .filter(Boolean);

    // console.log("nextNodes", nextNodes);
    // console.log("outgoingEdges", outgoingEdges);

    const entry: Record<string, any> = {
      nodeType: originalType,
      nodeId: value,
      nodeIndex: node.id,
      position_top: `${node.position.y}px`,
      position_left: `${node.position.x}px`,
      isLastNode: 1,
      workflowType: -1,
      [value]: {
        conditionList: {},
      },
    };

    nodeInput?.options?.forEach((input: any, index: number) => {
      const id = `${value}_condition_${index}`;
      entry[value].conditionList[id] = {
        value: {
          type: input?.type,
          val: input?.value,
          time: input?.time,
          otpTimeIntervalValue: 0,
          keyPressValue: "",
          callDurationTime: input?.time || "",
          ansPreFix: input?.ansPreFix || "",
        },
        nextNode: nextNodes[index] || "",
      };
    });

    // console.log("entry", entry);
    payload.push(entry);
    // console.log("nodeInput", nodeInput);
  });
  return payload;
};
