const [editRcsVisible, setEditRcsVisible] = useState(false);
const [rcsEditData, setRcsEditData] = useState(null); // will store { srno, country, rate, etc. }

async function handleRcsEdit(srno) {
  const res = await getRCSRateBySrno(srno, currentUserSrno);
  if (!res?.data) return;

  const { rate, country_name, sr_no } = res.data;
  setRcsEditData({ srno: sr_no, rate, country: country_name });
  setEditRcsVisible(true);
}


<Dialog
  header="Edit RCS Rate"
  visible={editRcsVisible}
  onHide={() => setEditRcsVisible(false)}
  style={{ width: "30rem" }}
  draggable={false}
>
  <div className="space-y-4">
    <div className="flex items-center gap-5">
      <InputField
        label="Update Rate"
        placeholder="Update RCS Rate"
        value={rcsEditData?.rate || ""}
        onChange={(e) =>
          validateInput(e.target.value, (val) =>
            setRcsEditData((prev) => ({ ...prev, rate: val }))
          )
        }
      />
    </div>
    <div className="flex justify-center">
      <UniversalButton label="Update" onClick={handleRcsUpdate} />
    </div>
  </div>
</Dialog>


const handleRcsUpdate = async () => {
  if (!rcsEditData?.srno || !rcsEditData?.rate || !rcsEditData?.country) {
    toast.error("Invalid data.");
    return;
  }

  try {
    const payload = {
      srno: rcsEditData.srno,
      userSrno: String(currentUserSrno),
      rate: String(rcsEditData.rate),
      country: String(rcsEditData.country),
    };

    const res = await saveEditRcsRate(payload);
    if (!res?.message?.includes("Successfully")) {
      toast.error(res?.message);
      return;
    }

    toast.success(res?.message);
    await fetchRcsRateData(currentUserSrno);
    setEditRcsVisible(false);
    setRcsEditData(null);
  } catch (e) {
    toast.error("Error in updating RCS rate.");
  }
};
