export const handleKindAdded = (newKind, customKinds, setCustomKinds, setKind, setType) => {
    setCustomKinds([...customKinds, newKind]);
    setKind(newKind.name);
    setType(newKind.type);
};