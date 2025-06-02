// const CreateWhatsAppBot = () => {
//   return (
//     <>
//       {/* Header Section */}
//       <div className="flex items-center justify-between p-4 bg-white shadow-md">
//         <h1 className="text-xl font-semibold text-gray-800">Create WhatsApp Bot</h1>
//         <div className="flex gap-4">
//           <Button
//             onClick={reset}
//             className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
//           >
//             Reset Canvas
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//           >
//             Save Bot
//           </Button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex">
//         {/* Canvas Section */}
//         <div
//           className="flex-1 bg-gray-100 p-4"
//           style={{ height: "calc(100vh - 64px)" }}
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//         >
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             onNodeClick={onNodeClick}
//             deleteKeyCode={"Backspace"}
//             nodeTypes={nodeTypes}
//             onConnectStart={(event, { handleType }) => {
//               setIsConnecting(true);
//               setConnectionType(handleType);
//             }}
//             onConnectEnd={() => {
//               setIsConnecting(false);
//               setConnectionType("");
//             }}
//           >
//             <Background />
//             <MiniMap />
//             <Controls />
//           </ReactFlow>
//         </div>

//         {/* Sidebar Section */}
//         <div className="w-[300px] bg-white p-4 shadow-md">
//           {/* Node Buttons */}
//           <div className="grid grid-cols-2 gap-4">
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "starting")}
//               onClick={() => addNode("starting")}
//               className="flex items-center justify-center gap-2 px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               <OutlinedFlagOutlinedIcon />
//               <span>Start</span>
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "text")}
//               onClick={() => addNode("text")}
//               className="flex items-center justify-center gap-2 px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               <TextFieldsOutlinedIcon />
//               <span>Text Node</span>
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "image")}
//               onClick={() => addNode("image")}
//               className="flex items-center justify-center gap-2 px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               <ImageOutlinedIcon />
//               <span>Image</span>
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "video")}
//               onClick={() => addNode("video")}
//               className="flex items-center justify-center gap-2 px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               <VideocamOutlinedIcon />
//               <span>Video</span>
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "document")}
//               onClick={() => addNode("document")}
//               className="flex items-center justify-center gap-2 px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               <ArticleOutlinedIcon />
//               <span>Document</span>
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "audio")}
//               onClick={() => addNode("audio")}
//               className="flex items-center justify-center gap-2 px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               <MicOutlinedIcon />
//               <span>Audio</span>
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "button")}
//               onClick={() => addNode("button")}
//               className="flex items-center justify-center gap-2 px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               <BsMenuButton />
//               <span>Button</span>
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "list")}
//               onClick={() => addNode("list")}
//               className="flex items-center justify-center gap-2 px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               <FormatListBulletedOutlinedIcon />
//               <span>List</span>
//             </Button>
//           </div>

//           {/* Details Section */}
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold text-gray-800">Bot Details</h2>
//             <AnimatedDropdown
//               id="wabadropdown"
//               label="Select WABA"
//               placeholder="Select WABA"
//               options={details.waba.map((waba) => ({
//                 value: waba.mobileNo,
//                 label: waba.name,
//               }))}
//               value={details.selected}
//               onChange={(value) =>
//                 setDetails((prev) => ({ ...prev, selected: value }))
//               }
//               className="w-full mt-2"
//             />
//             <InputField
//               id="botname"
//               label="Bot Name"
//               placeholder="Enter Bot Name"
//               value={details.name}
//               onChange={(e) =>
//                 setDetails((prev) => ({ ...prev, name: e.target.value }))
//               }
//               className="w-full mt-4"
//             />
//             <Button
//               onClick={handleSubmit}
//               className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//             >
//               Save Bot
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


//       {/* <div className="flex">
//         <div
//           style={{ width: "90vw", height: "auto" }}
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//         >
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             onNodeClick={onNodeClick}
//             deleteKeyCode={"Backspace"}
//             nodeTypes={nodeTypes}
//             onConnectStart={(event, { handleType }) => {
//               setIsConnecting(true);
//               setConnectionType(handleType);
//             }}
//             onConnectEnd={() => {
//               setIsConnecting(false);
//               setConnectionType("");
//             }}
//             // fitView
//           >
//             <Background />
//             <MiniMap />
//             <Controls />
//           </ReactFlow>
//         </div>

//         <div className="flex flex-col justify-between w-[250px] gap-4">
//           <div className="grid grid-cols-2 p-1 gap-x-2 gap-y-3">
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "starting")}
//               onClick={() => addNode("starting")}
//               className={commonButtonClass}
//             >
//               <OutlinedFlagOutlinedIcon /> Start
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "text")}
//               onClick={() => addNode("text")}
//               className={commonButtonClass}
//             >
//               <TextFieldsOutlinedIcon />
//               Text Node
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "image")}
//               onClick={() => addNode("image")}
//               className={commonButtonClass}
//             >
//               <ImageOutlinedIcon />
//               Image
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "video")}
//               onClick={() => addNode("video")}
//               className={commonButtonClass}
//             >
//               <VideocamOutlinedIcon />
//               Video
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "document")}
//               onClick={() => addNode("document")}
//               className={commonButtonClass}
//             >
//               <ArticleOutlinedIcon />
//               Document
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "audio")}
//               onClick={() => addNode("audio")}
//               className={commonButtonClass}
//             >
//               <MicOutlinedIcon />
//               Audio
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "button")}
//               onClick={() => addNode("button")}
//               className={commonButtonClass}
//             >
//               <BsMenuButton />
//               Button
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "list")}
//               onClick={() => addNode("list")}
//               className={commonButtonClass}
//             >
//               <FormatListBulletedOutlinedIcon />
//               List
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "agent")}
//               onClick={() => addNode("agent")}
//               className={commonButtonClass}
//             >
//               <MicOutlinedIcon />
//               Agent
//             </Button>
//             <Button
//               draggable
//               onDragStart={(event) => handleDragStart(event, "answer")}
//               onClick={() => addNode("answer")}
//               className={commonButtonClass}
//             >
//               <QuestionAnswerOutlinedIcon />
//               Answer
//             </Button>
//             <Button onClick={reset} className={commonButtonClass}>
//               <RestartAltOutlinedIcon />
//               Reset
//             </Button>
//           </div>

//           <Details
//             setDetails={setDetails}
//             details={details}
//             handleSubmit={handleSubmit}
//             isUpdate={state ?? false}
//           />
//         </div>
//       </div> */}




