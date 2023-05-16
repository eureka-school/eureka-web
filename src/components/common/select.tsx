interface Props {
  value: any;
  label: string;
  options: any[];
  onChange: (e: any) => void;
}

export default function Select({ value, label, options, onChange }: Props) {
  return (
    <div className="form-control w-full max-w-sm md:max-w-xl">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select
        className="select select-bordered"
        value={value}
        onChange={onChange}
      >
        {options.map((ops, idx) => (
          <option value={ops._id} key={`${label}-option-${idx}`}>
            {ops.name}
          </option>
        ))}
      </select>
    </div>
  );
}
