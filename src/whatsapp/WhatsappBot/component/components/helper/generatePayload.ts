function generateBotPayload(
  nodes: any[],
  edges: any[],
  nodesInputData: Record<string, any>,
  botDetails: Record<string, any>
) {
  const payload: Record<string, any> = {};

  const startNode = nodes.find((n) => n.type === "starting");
  const otherNodes = nodes.filter((n) => n.type !== "starting");
  const orderedNodes = startNode ? [startNode, ...otherNodes] : nodes;

  orderedNodes.forEach((node, index) => {
    const originalType = node.type;
    const finalType = originalType === "starting" ? "START" : originalType;

    const key = `${index + 1}_${finalType}_${node.id}`;
    const value = `${finalType}_${node.id}`;
    const nodeInput = nodesInputData[node.id] || {};

    const incomingEdge = edges.find((edge) => edge.target === node.id);
    const prevNode = incomingEdge
      ? `${
          nodes.find((n) => n.id === incomingEdge.source)?.type === "starting"
            ? "START"
            : nodes.find((n) => n.id === incomingEdge.source)?.type
        }_${incomingEdge.source}`
      : "";

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
      type: finalType,
      value,
      // ...nodeInput,
    };

    if (finalType === "START") {
      entry["botName"] = botDetails?.botName;
      entry["wabaNumber"] = botDetails?.wabaNumber;
      entry["wabaSrno"] = botDetails?.wabaSrno;
      entry["startKeyword"] = nodeInput?.startingKeyword;
    }
    if (finalType === "text") {
      entry["textMessage"] = nodeInput?.message;
    }
    if (finalType === "agent") {
      const data = {
        agent: "agentId",
        department: "departmentId",
      };
      entry["radio"] = nodeInput?.type;
      entry[data[nodeInput?.type]] = nodeInput?.id;
      entry["departmentName"] = botDetails?.deptName;
    }
    if (finalType === "image") {
      entry["imageUrl"] = nodeInput?.fileUrl;
      entry["imageCaption"] = nodeInput?.fileCaption;
    }
    if (finalType === "video") {
      entry["videoUrl"] = nodeInput?.fileUrl;
      entry["videoCaption"] = nodeInput?.fileCaption;
    }
    if (finalType === "document") {
      entry["documentUrl"] = nodeInput?.fileUrl;
      entry["documentCaption"] = nodeInput?.fileCaption;
    }
    if (finalType === "button") {
      const options = {
        image: "imageUrl",
        video: "videoUrl",
        document: "documentUrl",
      };

    
      entry[options[nodeInput?.type]] = nodeInput?.text || nodeInput?.fileUrl;
      entry["buttonType"] = nodeInput?.type;

      entry["buttonBody"] = nodeInput?.message;
      entry["type"] = finalType;
      entry["buttonTexts"] = nodeInput?.buttonTexts;
      // entry["buttonTexts"] = nodeInput?.options;
      entry["nextNode"] = nextNodes;
    }

    if (finalType === "list") {
      entry["nextNode"] = nextNodes;
      entry["listHeading"] = nodeInput?.text;
      entry["listUrl"] = nodeInput?.text;
      entry["listBody"] = nodeInput?.message;
      entry["listType"] = nodeInput?.type;

      entry["type"] = finalType;

      if (Array.isArray(nodeInput?.options)) {
        entry["listItems"] = nodeInput.options.map((item: any) => [
          item.option || "",
          item.value || "",
        ]);
      }
    }
    entry["selectedOption"] = nodeInput?.selectedOption || "";

    if (prevNode) entry["prevNode"] = prevNode;

    const isMultiOptionType = finalType === "list" || finalType === "button";
    if (!isMultiOptionType) {
      entry["nextNode"] = nextNodes[0] || "";
    }

    if (node.position?.x) entry["position_left"] = `${node.position.x}px`;
    if (node.position?.y) entry["position_top"] = `${node.position.y}px`;

    payload[key] = entry;
  });

  return { body: payload };
}

export default generateBotPayload;
