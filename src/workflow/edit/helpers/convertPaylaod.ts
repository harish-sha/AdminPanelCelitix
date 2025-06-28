export const convertPaylaod = (data: string) => {
    let parsedData: any[];
    try {
        parsedData = JSON.parse(data);
    } catch (error) {
        console.error("Failed to parse JSON data:", error);
        return { nodes: [], edges: [], nodedata: {} };
    }

    // console.log("data", parsedData);

    //     [
    //     {
    //         "nodeType": "voice",
    //         "nodeId": "voice_0",
    //         "nodeIndex": "1",
    //         "position_top": "50px",
    //         "position_left": "50px",
    //         "isLastNode": 0,
    //         "workflowType": -1,
    //         "voice_0": {
    //             "conditionList": {
    //                 "voice_0_condition_0": {
    //                     "value": {
    //                         "type": "delivered",
    //                         "val": "answered",
    //                         "time": "10",
    //                         "otpTimeIntervalValue": 0,
    //                         "keyPressValue": "-1",
    //                         "callDurationTime": "3",
    //                         "ansPreFix": "="
    //                     },
    //                     "nextNode": "rcs_2"
    //                 }
    //             },
    //             "value": {
    //                 "plan": "2"
    //             }
    //         }
    //     },
    //     {
    //         "nodeType": "rcs",
    //         "nodeId": "rcs_1",
    //         "nodeIndex": "2",
    //         "position_top": "217px",
    //         "position_left": "194px",
    //         "isLastNode": 1,
    //         "workflowType": -1,
    //         "rcs_1": {
    //             "value": {
    //                 "rcs_agent": "FMp1Joo9xeNJC6nY",
    //                 "rcs_template": "787",
    //                 "variables": [
    //                     "98",
    //                     "54"
    //                 ],
    //                 "category": "text"
    //             }
    //         }
    //     }
    // ]

    const nodes: any[] = [];
    const edges: any[] = [];
    const nodedata: { [key: string]: any } = {};
    const idMap: { [key: string]: string } = {};

    // Create idMap in a single pass
    parsedData.forEach((item, index) => {
        const id = item?.nodeId;
        if (id) {
            const formattedId = `${item?.nodeType}_${index + 1}`;
            item.formattedId = formattedId;
            idMap[id] = formattedId;
        }
    });

    // Process nodes and edges in a single pass
    parsedData.forEach((item, index) => {
        const id = item?.nodeId;
        if (!id) return;

        // Create node
        nodes.push({
            id: item.nodeIndex,
            type: item.nodeType,
            position: {
                x: parseFloat(item.position_left) || Math.random() * 300,
                y: parseFloat(item.position_top) || Math.random() * 300,
            },
            data: {
                type: item.nodeType,
            },
        });

        // Original commented code
        Object.entries(item[id]).map(([key, value]: any) => {
            nodedata[index + 1] = {
                ...nodedata[index + 1],
                ...value
            }
        })

        // Process conditions and edges
        const conditionList = item[id]?.conditionList || {};
        Object.entries(conditionList).forEach(([key, condition]: [string, any], conditionIndex) => {
            const targetNode = parsedData.find((i) => idMap[i?.nodeId] === condition?.nextNode)?.nodeIndex;
            if (targetNode) {
                edges.push({
                    id: `${item.nodeIndex}-to-${targetNode}`, // Fixed edge ID to use targetNode
                    source: item.nodeIndex,
                    target: targetNode,
                    type: "smoothstep",
                    sourceHandle: `opt-${conditionIndex}`,
                });
            }

            // console.log("condition", condition);

            const data = {
                options: [{
                    type: condition?.value?.type,
                    time: condition?.value?.time,
                    callDurationTime: condition?.value?.callDurationTime,
                    ansPreFix: condition?.value?.ansPreFix,
                    value: condition?.value?.value,
                }],
            };

            // console.log("data", data)

            nodedata[index + 1] = {
                ...nodedata[index + 1],
                ...data,
            };
        });
    });

    return { nodes, edges, nodedata };
};