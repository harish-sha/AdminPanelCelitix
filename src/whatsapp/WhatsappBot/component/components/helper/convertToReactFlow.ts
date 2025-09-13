export const convertToReactFlow = (data) => {
  if (!data || !data.body || typeof data.body !== "object") {
    console.warn("Invalid data format:", data);
    return { nodes: [], edges: [] };
  }

  const rawNodes = data.body;
  const nodes = [];
  const edges = [];

  Object.entries(rawNodes).forEach(([rawId, nodeData]: any) => {
    const idMatch = rawId.match(/^(\d+)_/);
    const id = idMatch ? idMatch[1] : rawId;

    const type =
      nodeData.type === "START" ? "starting" : nodeData.type.toLowerCase();

    // Add the node
    nodes.push({
      id,
      type,
      position: {
        x: parseFloat(nodeData.position_left) || Math.random() * 300,
        y: parseFloat(nodeData.position_top) || Math.random() * 300,
      },
      data: {
        // label: nodeData.value,
        // originalId: rawId,
        // ...nodeData,
        type: type,
      },
    });

    // Handle nextNode depending on type
    const isMultiTarget = type === "button" || type === "list";
    const text = type === "button" ? "btn-opt" : "opt";
    const nextNodes = isMultiTarget
      ? nodeData.nextNode || []
      : nodeData.nextNode
      ? [nodeData.nextNode]
      : [];

    nextNodes.forEach((nextVal, index) => {
      const targetEntry = Object.entries(rawNodes).find(
        ([, d]: any) => d.value === nextVal
      );
      if (targetEntry) {
        const [targetRawId] = targetEntry;
        const targetIdMatch = targetRawId.match(/^(\d+)_/);
        const targetId = targetIdMatch ? targetIdMatch[1] : targetRawId;

        edges.push({
          id: `${id}-${text}-${index}`,
          source: id,
          target: targetId,
          type: "smoothstep",
          ...(isMultiTarget && {
            sourceHandle: `${text}-${index}`,
          }),
        });
      }
    });
  });

  return { nodes, edges };
};

export const transformNodesById = (parsedFlowData) => {
  const rawNodes = parsedFlowData.body;
  const output = {};

  Object.entries(rawNodes).forEach(([rawId, node]: any) => {
    const idMatch = rawId.match(/^(\d+)_/);
    const id = idMatch ? idMatch[1] : rawId;

    let listItems = [];
    if (node.type === "list") {
      const converted = node.listItems.map(([option, value]) => ({
        option,
        value,
      }));
      listItems = converted;
    }

    output[id] = {
      // type: node.type === "START" ? "starting" : node.type.toLowerCase(),
      ...node,
      startingKeyword: node.type === "START" && node.startKeyword,
      message: node.textMessage || node.buttonBody || node.listBody,
      type:
        node.answerRadio ||
        node.listType ||
        node?.buttonType ||
        node?.answerOption,
      variableName: node.answerText,
      options: listItems || null,
      buttonTexts: node.buttonTexts,
      text: node?.listHeading || node?.text || node?.buttonUrl,
      fileUrl:
        node?.imageUrl ||
        node?.videoUrl ||
        node?.documentUrl ||
        node?.urlbuttonMediaUrl ||
        node?.buttonUrl ||
        "",
      fileCaption:
        node?.imageCaption || node?.videoCaption || node?.documentCaption || "",
      variableId: node?.answerText,
      // apiJson: node?.apiRequestJson || node?.params
      apiRequestJson: JSON.stringify(node?.apiJson),
      varName:
        (Array.isArray(node?.apiResponse?.storedData)
          ? node.apiResponse.storedData[0]?.varName
          : "") || "",
      storedVariables: node?.storeVariables,

      // when merge maindummy ui
      //  selectedOption: "url"
    };
  });

  return output;
};
