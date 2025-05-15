useEffect(() => {
    const fetchUserDetails = async () => {
        setLoading(true);
        const response = await getUserDetails();

        if (response && response.statusCode === 200) {
            if (user?.role === "AGENT") {
                const agent = response.data || response.data?.data;
                setUserData(agent);
                setFormData({
                    name: agent.name || "",
                    email: agent.email || "",
                    departmentName: agent.departmentName || "",
                    status: agent.status === 1 ? "Active" : "Inactive",
                });
            } else {
                const directUser = response.data[0];
                setUserData(directUser);
                setFormData({
                    firstName: directUser.firstName || "",
                    lastName: directUser.lastName || "",
                    emailId: directUser.email || "",
                    mobileNo: directUser.mobileNo || "",
                    address: directUser.address || "",
                    companyName: directUser.companyName || "",
                    userId: directUser.userId || "",
                });
            }
        } else {
            console.error("Failed to load user details.");
            toast.error("Failed to load user details!");
        }

        setLoading(false);
    };

    fetchUserDetails();
}, [user]);


{user?.role === "AGENT" ? (
    <>
        <InputField id="name" name="name" label="Agent Name" value={formData.name} readOnly disabled />
        <InputField id="email" name="email" label="Email ID" value={formData.email} readOnly disabled />
        <InputField id="departmentName" name="departmentName" label="Department Name" value={formData.departmentName} readOnly disabled />
        <InputField id="status" name="status" label="Status" value={formData.status} readOnly disabled />
    </>
) : (
    <>
        <InputField id="userId" name="userId" label="User ID" value={formData.userId} readOnly disabled />
        <InputField id="firstName" name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} readOnly disabled />
        <InputField id="lastName" name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} readOnly disabled />
        <InputField id="emailId" name="emailId" label="Email ID" value={formData.emailId} onChange={handleChange} readOnly disabled />
        <InputField id="mobileNo" name="mobileNo" label="Mobile No" value={formData.mobileNo} onChange={handleChange} readOnly disabled />
        <InputField id="address" name="address" label="Address" value={formData.address} onChange={handleChange} readOnly disabled />
        <InputField id="companyName" name="companyName" label="Company Name" value={formData.companyName} onChange={handleChange} readOnly disabled />
    </>
)}
