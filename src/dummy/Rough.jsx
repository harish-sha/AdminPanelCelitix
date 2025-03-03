<DropdownWithSearch
    id="selectCountryCode"
    name="selectCountryCode"
    label="Select Country Code"
    tooltipContent="check the - [ ✔ Add country code ] to apply country code"
    tooltipPlacement="right"
    placeholder="Select Country Code"
    disabled={!addCountryCode}
    options={countryList
        .sort((a, b) => a.countryName.localeCompare(b.countryName))
        .map((country) => ({
            label: `${country.countryName} (+${country.countryCode})`,
            value: `${country.countryCode}-${country.countryName}`,
        }))}
    value={selectedCountryCode ? `${selectedCountryCode}-${selectedCountryName}` : ""}
    onChange={(value) => {
        if (value) {
            const [code, name] = value.split('-');
            setSelectedCountryCode(code);
            setSelectedCountryName(name);
        }
    }}
/>