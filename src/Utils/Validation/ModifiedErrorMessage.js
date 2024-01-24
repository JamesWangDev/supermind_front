export const handleModifier = (value) => {
    if (value?.includes('_')) {
        let newStr = value.replaceAll("_", " ")
        newStr = newStr.split(' ')[0].charAt(0).toUpperCase() + newStr.slice(1)
        newStr = newStr.split('field')[0]
        return newStr;
    } else {
        let modifyName = value?.split(' ')[0].charAt(0).toUpperCase() + value?.slice(1)
        modifyName = modifyName?.split('field')[0]
        return modifyName;
    }
}