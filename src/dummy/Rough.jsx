import { motion, AnimatePresence } from "framer-motion";

export default function WhatsappLiveChat() {
  // ...existing code

  const chatScreenVariants = {
    hidden: { opacity: 0, x: "100%" }, // Start off-screen to the right
    visible: {
      opacity: 1,
      x: 0, // Slide into view
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      x: "100%", // Slide out to the right
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="flex h-[100%] bg-gray-50 rounded-2xl overflow-hidden border">
      <div
        className={`w-full md:w-100 p-1 border rounded-tl-2xl overflow-hidden border-tl-lg ${
          chatState?.active ? "hidden md:block" : "block"
        }`}
      >
        <InputData
          setSearch={setSearch}
          search={search}
          handleSearch={handleSearch}
          btnOption={btnOption}
          setBtnOption={setBtnOption}
          wabaState={wabaState}
          setWabaState={setWabaState}
          setChatState={setChatState}
          setSelectedWaba={setSelectedWaba}
        />

        <ChatSidebar
          formatDate={formatDate}
          chatState={chatState}
          setChatState={setChatState}
          setSelectedAgentList={setSelectedAgentList}
          selectedWaba={selectedWaba}
        />
      </div>

      {/* Animate ChatScreen */}
      <AnimatePresence>
        {chatState.active && (
          <motion.div
            key="chat-screen"
            variants={chatScreenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex flex-col flex-1 h-screen md:h-full"
          >
            <ChatScreen
              setVisibleRight={setVisibleRight}
              setDialogVisible={setDialogVisible}
              messageRef={messageRef}
              formatTime={formatTime}
              btnOption={btnOption}
              selectedImage={selectedImage}
              deleteImages={deleteImages}
              handleAttachmentDownload={handleAttachmentDownload}
              insertEmoji={insertEmoji}
              inputRef={inputRef}
              sendMessage={sendMessage}
              items={items}
              visibleRight={visibleRight}
              input={input}
              setInput={setInput}
              setSendMessageDialogVisible={setSendMessageDialogVisible}
              setChatState={setChatState}
              chatState={chatState}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialogs */}
      <Dialog
        header="Transfer Chat to Agent"
        visible={dialogVisible}
        style={{ width: "50vw" }}
        draggable={false}
        onHide={() => {
          if (!dialogVisible) return;
          setDialogVisible(false);
        }}
      >
        <div className="space-y-3">
          <AnimatedDropdown
            options={agentList?.data?.map((agent) => ({
              value: agent.sr_no,
              label: agent.name,
            }))}
            id="agentList"
            name="agentList"
            label="Agent List"
            tooltipContent="Select Agent"
            tooltipPlacement="right"
            value={selectedAgentList}
            onChange={(value) => setSelectedAgentList(value)}
            placeholder="Agent List"
          />
          <AnimatedDropdown
            options={groupList?.map((group) => ({
              value: group.groupCode,
              label: group.groupName,
            }))}
            id="group"
            name="group"
            label="Group"
            tooltipContent="Select Group"
            tooltipPlacement="right"
            value={selectedGroupList}
            onChange={(value) => setSelectedGroupList(value)}
            placeholder="Group"
          />
          <UniversalButton
            id={"assignAgent"}
            name={"assignAgent"}
            label="Assign Agent"
            onClick={handleAssignAgent}
          />
        </div>
      </Dialog>

      <Dialog
        header="Send Message to User"
        visible={sendMessageDialogVisible}
        style={{ width: "60rem", height: "40rem" }}
        draggable={false}
        onHide={() => {
          setSendMessageDialogVisible(false);
          setTemplateType(templateType);
          setBtnVarLength(0);
          setVarLength(0);
          setVariables({});
          setBtnVariables("");
          setTemplateDetails({});
          setSendMessageData({});
        }}
      >
        <div className="flex flex-col justify-between h-full gap-4 p-2 md:flex-row">
          <div className="flex flex-col w-100 gap-5">
            {messageType === "template" ? (
              <div className="flex flex-col gap-3">
                <DropdownWithSearch
                  id="selectTemplate"
                  name="selectTemplate"
                  label="Select Template"
                  placeholder="Select Template"
                  options={allTemplated?.map((template) => ({
                    value: template.templateName,
                    label: template.templateName,
                  }))}
                  value={sendmessageData.templateName}
                  onChange={(e) => {
                    setSendMessageData((prevData) => ({
                      ...prevData,
                      templateName: e,
                    }));
                    const templateType = allTemplated?.find(
                      (template) => template.templateName === e
                    )?.type;
                    setTemplateType(templateType);
                    setBtnVarLength(0);
                    setVarLength(0);
                    setVariables({});
                    setBtnVariables("");
                    setTemplateDetails("");
                  }}
                />
                <Variables
                  templateType={templateType}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  varLength={varLength}
                  setVariables={setVariables}
                  variables={variables}
                  btnVariables={btnVariables}
                  btnVarLength={btnVarLength}
                  setBtnVariables={setBtnVariables}
                  setCarFile={setCarFile}
                  carFile={carFile}
                  cardIndex={cardIndex}
                  setCardIndex={setCardIndex}
                  handleNextCard={handleNextCard}
                  handlePreviousCard={handlePreviousCard}
                  tempDetails={templateDetails}
                />
              </div>
            ) : null}
            <div>
              <UniversalButton label="Send" onClick={handlesendMessage} />
            </div>
          </div>
          <div>
            <TemplatePreview
              tempDetails={templateDetails}
              messageType={messageType}
              sendmessageData={sendmessageData}
              selectedImage={selectedFile}
              carFile={carFile}
              cardIndex={cardIndex}
              setCardIndex={setCardIndex}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}