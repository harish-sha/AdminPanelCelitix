import { parse } from "date-fns"

export const convertPaylaod = (data: string) => {
    const parsedData = JSON.parse(data)

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

    let nodes = []
    let edges = []
    let nodedata = {}

    let idMap = {}

    parsedData?.map((item, index) => {
        const id = item?.nodeId
        const formattedId = `${item?.nodeType}_${index + 1}`
        item.formattedId = formattedId
        idMap[id] = formattedId
    })

    parsedData?.map((item: any, index: number) => {

        const id = item?.nodeId
        nodes.push({
            id: item?.nodeIndex,
            type: item?.nodeType,
            position: {
                x: parseFloat(item.position_left) || Math.random() * 300,
                y: parseFloat(item.position_top) || Math.random() * 300,
            },
            data: {
                type: item?.nodeType,
            },
        });
       

        Object.entries(item[id]).map(([key, value]: any) => {
            nodedata[index + 1] = {
                ...nodedata[index + 1],
                ...value
            }
        })

        Object.entries(item[id]?.conditionList || {}).map(([key, condition]: any) => {
            const targetNode = parsedData?.find((i) => idMap[i?.nodeId] == condition?.nextNode)?.nodeIndex
            edges.push({
                id: `${item?.nodeIndex}-to-${item?.nodeIndex + 1}`,
                source: item?.nodeIndex,
                target: targetNode,
                type: "smoothstep",
                sourceHandle: `opt-${index}`,
            });

            let data: any = {
                options: [{
                    type: condition?.value?.type,
                    time: condition?.value?.time,
                    callDurationTime: condition?.value?.callDurationTime,
                    ansPreFix: condition?.value?.ansPreFix,
                    value: condition?.value?.value
                }]
            }

            nodedata[index + 1] = {
                ...nodedata[index + 1],
                ...data
            }
        })

        // console.log("nodedata", nodedata)
    })


    return { nodes, edges, nodedata }
}