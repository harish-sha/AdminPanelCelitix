const handleAssign = async (srNo) => {
  setAssignService(true);
  setCurrentUserSrno(srNo);
  console.log("srNo", srNo);

  const [transRes, promoRes, userSmsData, countryListRes, whatsappRateRes] =
    await Promise.all([
      getTransServices(),
      getPromoServices(),
      getSmsRateByUser(srNo),
      getCountryList(),
      getWhatsappRateData(srNo),
    ]);

  // ✅ map country list
  if (countryListRes) {
    setCountryOptions(
      countryListRes.map((item) => ({
        label: item.countryName,
        value: String(item.countryCode),
      }))
    );
  }

  // map trans/promo
  setTransOptions(
    (transRes || []).map((item) => ({
      label: item.serviceName,
      value: String(item.serviceId),
    }))
  );
  setPromoOption(
    (promoRes || []).map((item) => ({
      label: item.serviceName,
      value: String(item.serviceId),
    }))
  );

  // set SMS data
  if (userSmsData?.data) {
    const d = userSmsData.data;
    setTranscheck(!!d.transService);
    setPromocheck(!!d.promoService);
    setTrans(d.transService || null);
    setPromo(d.promoService || null);
    setSmsRate(d.rate || "");
    setDltRate(d.dltRate || "");
  }

  // set WhatsApp table data
  if (whatsappRateRes?.data) {
    setWhatsapprows(whatsappRateRes.data);
  }
};
