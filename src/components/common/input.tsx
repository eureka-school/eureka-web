interface Props {
  value: any;
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  type?: string;
}

export default function Input({
  value,
  label,
  placeholder,
  onChange,
  type = "text",
}: Props) {
  return (
    <div className="form-control w-full max-w-sm md:max-w-xl">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full max-w-sm"
      />
    </div>
  );
}
