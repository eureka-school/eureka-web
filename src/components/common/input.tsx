interface Props {
  value: string;
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
}

export default function Input({ value, label, placeholder, onChange }: Props) {
  return (
    <div className="form-control w-full max-w-sm">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full max-w-sm"
      />
    </div>
  );
}
