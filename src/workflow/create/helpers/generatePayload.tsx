function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const generatePayload = (
  nodesInputData: Record<string, any>,
  nodes: any[],
  edges: any[]
) => {
  const payload = [];

  nodes.forEach((node, index) => {
    const originalType = node.type;
    const value = `${originalType}_${index}`;
    const nodeInput = nodesInputData[node.id] || {};

    //prevNode
    const incomingEdge = edges.find((edge) => edge.target === node.id);
    const prevNode = incomingEdge
      ? `${
          nodes.find((n) => n.id === incomingEdge.source)?.type === "starting"
            ? "START"
            : nodes.find((n) => n.id === incomingEdge.source)?.type
        }_${incomingEdge.source}`
      : "";

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

    const entry: Record<string, any> = {
      nodeType: originalType,
      nodeId: value,
      nodeIndex: String(node.id),
      position_top: `${node.position.y}px`,
      position_left: `${node.position.x}px`,
      isLastNode: nextNodes.length === 0 ? 1 : 0,
      workflowType: -1,
      [value]: {
        // conditionList: {},
      },
    };

    nodeInput?.options?.forEach((input: any, index: number) => {
      const id = `${value}_condition_${index}`;
      entry[value].conditionList = {
        [id]: {
          value: {
            type: input?.type,
            val: input?.value,
            time: input?.time || 0,
            otpTimeIntervalValue: 0,
            keyPressValue: "-1",
            callDurationTime: input?.callDurationTime || 0,
            ansPreFix: input?.ansPreFix || -1,
          },
          ...(nextNodes[index] && { nextNode: nextNodes[index] }),
        },
      };
    });

    if (originalType === "whatsapp") {
      entry[value].value = {
        wabanumber: String(nodeInput?.wabaSrno),
        whatsappTemplate: String(nodeInput?.whatsappTemplate),
        whatsapp_category: nodeInput?.whatsapp_category,
        whatsapp_templateType: nodeInput?.whatsapp_templateType,
        variables: nodeInput?.variables,
        fileInput: nodeInput?.fileInput,
        urlValues: nodeInput?.urlValues,
      };
    }

    // entry[prevNode] = prevNode;

    payload.push(entry);
    // console.log("nodeInput", nodeInput);
  });
  return payload;
};
