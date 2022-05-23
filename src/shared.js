export const selectRenderer = ({ field }, items, placeholder, value, label) => {
  return (
    <select {...field}>
      <option>{placeholder}</option>
      {items.map((opt) => (
        <option key={opt[value]} value={Number(opt[value])}>
          {opt[label]}
        </option>
      ))}
    </select>
  );
};

export const selectDisplayRenderer = (props, items, value, label) => {
  return (
    <div>{items.find((l) => l[value] === props[value])?.[label] || ""}</div>
  );
};

export const styles = {
  container: { margin: "auto", width: "fit-content" },
};
