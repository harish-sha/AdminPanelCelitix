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
      entry["botName"] = botDetails?.botName?.trim();
      entry["wabaNumber"] = botDetails?.wabaNumber;
      entry["wabaSrno"] = botDetails?.wabaSrno;
      entry["startKeyword"] = nodeInput?.startingKeyword;
    }
    if (finalType === "text") {
      entry["textMessage"] = nodeInput?.message?.trim();
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
      entry["imageCaption"] = nodeInput?.fileCaption.trim();
    }
    if (finalType === "video") {
      entry["videoUrl"] = nodeInput?.fileUrl;
      entry["videoCaption"] = nodeInput?.fileCaption.trim();
    }
    if (finalType === "document") {
      entry["documentUrl"] = nodeInput?.fileUrl;
      entry["documentCaption"] = nodeInput?.fileCaption?.trim();
    }
    if (finalType === "audio") {
      entry["audioUrl"] = nodeInput?.fileUrl;
      entry["audioCaption"] = nodeInput?.fileCaption?.trim();
    }
    if (finalType === "button") {
      const options = {
        image: "imageUrl",
        video: "videoUrl",
        document: "documentUrl",
        text: "text",
      };

      entry["buttonUrl"] = nodeInput?.text?.trim() || nodeInput?.fileUrl;
      entry["buttonType"] = nodeInput?.type;

      entry["buttonBody"] = nodeInput?.message?.trim();
      entry["type"] = finalType;
      entry["buttonTexts"] = nodeInput?.buttonTexts;
      // entry["buttonTexts"] = nodeInput?.options;
      entry["nextNode"] = nextNodes;
      entry["buttonFooter"] = nodeInput?.buttonFooter?.trim();
    }

    if (finalType === "list") {
      entry["nextNode"] = nextNodes;
      entry["listHeading"] = nodeInput?.text?.trim();
      entry["listUrl"] = nodeInput?.text?.trim();
      entry["listBody"] = nodeInput?.message?.trim();
      entry["listType"] = nodeInput?.type?.trim();
      entry["listFooter"] = nodeInput?.listFooter?.trim();

      entry["type"] = finalType;

      // console.log("nodeInput?.options",nodeInput?.options)
      if (Array.isArray(nodeInput?.options)) {
        entry["listItems"] = nodeInput.options.map((item: any) => [
          item?.option?.toString().trim() || "",
          item?.value?.toString().trim() || "",
        ]);
      }
    }
    if (finalType === "answer") {
      (entry["answerOption"] = nodeInput?.type),
        (entry["answerRadio"] = "text"),
        (entry["answerText"] = nodeInput?.variableId),
        (entry["answerVariable"] = "-1");
    }
    if (finalType === "template") {
      entry["templateSrno"] = nodeInput?.templateSrno;
      entry["json"] = nodeInput?.json;
    }

    if (finalType === "urlbutton") {
      (entry["urlbuttonbody"] = nodeInput?.urlbuttonbody),
        (entry["urlbuttonFooter"] = nodeInput?.urlbuttonFooter),
        (entry["urlbuttonMediaUrl"] = nodeInput?.fileUrl),
        (entry["urlbuttonText"] = nodeInput?.urlbuttonText),
        (entry["urlbuttonType"] = nodeInput?.urlbuttonType),
        (entry["urlbuttonUrl"] = nodeInput?.urlbuttonUrl),
        (entry["selectedOption"] = nodeInput?.selectedOption || "");
    }
    if (finalType === "api") {
      generateApiPayload(entry, nodeInput);
    }

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

function generateApiPayload(entry, nodeInput) {
  if (!entry.apiResponse) {
    entry.apiResponse = {};
  }
  (entry["apiUrl"] = nodeInput?.apiUrl),
    (entry["apiMethod"] = nodeInput?.apiMethod),
    (entry["apiDatatype"] = nodeInput?.apiDatatype || ""),
    (entry["apiHeader"] = nodeInput?.headers || []);

  if (nodeInput?.apiDatatype === "parameter") {
    entry["apiJson"] = nodeInput?.params;
  }
  if (nodeInput?.apiDatatype === "json") {
    entry["apiJson"] = JSON.parse(nodeInput?.apiRequestJson);
  }

  (entry["apiResponse"]["responseType"] =
    nodeInput?.apiResponse?.responseType || "none"),
    (entry["apiResponse"]["actionType"] =
      nodeInput?.apiResponse?.actionType || "-1"),
    (entry["apiResponse"]["storeInVariable"] =
      nodeInput?.apiResponse?.storeInVariable),
    (entry["responseType"] = nodeInput?.responseType);

  if (
    nodeInput?.apiResponse?.responseType === "text" &&
    nodeInput?.apiResponse?.actionType !== "createNewNode"
  ) {
    entry["apiResponse"]["storedData"] = [
      {
        varName: nodeInput?.apiResponse?.varName,
      },
    ];
  } else if (
    nodeInput?.apiResponse?.responseType === "json" &&
    nodeInput?.apiResponse?.actionType !== "createNewNode"
  ) {
    entry["apiResponse"]["storedData"] = [...nodeInput?.jsonVar];
  }

  if (nodeInput?.apiResponse?.actionType === "createNewNode") {
    (entry["apiResponse"]["conditionName"] = nodeInput?.apiResponse?.rowTitle),
      // (entry["apiResponse"]["conditionValue"] = nodeInput?.apiResponse?.rowValue),
      (entry["apiResponse"]["storeInVariable"] = undefined);
  }
}

export default generateBotPayload;
