export const handleKindDeleted = (kindId, customKinds, setCustomKinds) => {
    setCustomKinds(customKinds.filter(kind => kind._id !== kindId));
};