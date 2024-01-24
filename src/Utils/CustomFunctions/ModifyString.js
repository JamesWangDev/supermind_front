export const ModifyString = (stringVal, stringCase, splitSign) => {
    let splittedString = stringVal?.split(splitSign ?? '_') 
    let modifiedString = "";

    splittedString?.length > 0 && splittedString?.forEach((elem) => {
        modifiedString += elem?.charAt(0).toUpperCase() + elem?.slice(1) + " ";
    });
    if (stringCase == 'upper') {
        return modifiedString ? modifiedString?.toUpperCase() : stringVal?.toUpperCase()
    } else if (stringCase == 'lower') {
        return modifiedString ? modifiedString?.toLowerCase() : stringVal?.toLowerCase()
    } else return modifiedString?.trim();
};
