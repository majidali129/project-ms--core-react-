import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type FormItemProps = {
  name: string;
  type?: string;
  placeholder?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
  textarea?: boolean;
};

export const FormItem = ({
  name,
  type = "text",
  placeholder,
  label,
  onChange,
  value,
  textarea,
}: FormItemProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label htmlFor={name}>{label}</Label>}
      {textarea ? (
        <Textarea
          placeholder={placeholder}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          autoComplete="off"
          id={name}
          required
        />
      ) : (
        <Input
          required
          onChange={(e) => onChange(e.target.value)}
          value={value}
          autoComplete="off"
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
