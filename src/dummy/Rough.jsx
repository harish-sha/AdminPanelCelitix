async function handleImportContact() {
  try {
    // Validation checks
    if (!selectedMultiGroupContact) {
      return toast.error("Please select a group before importing.");
    }
    if (!isUploaded) {
      return toast.error("Please upload the file before importing.");
    }
    if (!addContactDetails.mobileNo) {
      return toast.error("Please map the Phone No. column before importing.");
    }

    // Prepare payload
    const payload = {
      groupSrNo: selectedMultiGroupContact,
      firstName: addContactDetails.firstName.trim(),
      middleName: addContactDetails.middleName?.trim() || "",
      lastName: addContactDetails.lastName.trim(),
      gender: addContactDetails.gender,
      mobile: addContactDetails.mobileNo.trim(),
      email: addContactDetails.emailId.trim(),
      extra: addContactDetails.uniqueId?.trim() || "",
      allowishes: addContactDetails.allowishes?.trim() || "",
      status: 1,
      birth: addContactDetails.birthDate?.trim() || "",
      marriage: addContactDetails.mariageDate?.trim() || "",
      filePath: filePath,
      fileData: [],
      noOfRow: -1,
    };

    const res = await importContact(payload);

    // Close import modal
    setimportContactVisible(false);

    // Handle response safely
    if (res && typeof res === "object") {
      const {
        duplicateContacts = 0,
        totalContacts = 0,
        invalidContacts = 0,
        totalContactsAdded = 0,
        message = "Contact import completed.",
      } = res;

      toast.success(
        `${message}\n\nTotal: ${totalContacts}\nAdded: ${totalContactsAdded}\nDuplicate: ${duplicateContacts}\nInvalid: ${invalidContacts}`,
        { duration: 8000 }
      );
    } else {
      toast.success("Contact imported, but no detailed response received.");
    }

    // Refresh data
    await getGrpList();
    await handleSearchGroup();
    getGrpListData();
  } catch (error) {
    console.error("Error importing contacts:", error);
    toast.error("An error occurred while importing contacts. Please try again.");
  }
}
