import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Input } from "./ui/input";

type PasswordInputProps = React.ComponentProps<typeof Input>;

export default function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? "text" : "password"}
        className={`pr-10 ${props.className ?? ""}`}
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
      >
        {show ? (
          <EyeSlashIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
