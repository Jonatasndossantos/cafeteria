declare module '@/Components/TextInput' {
  interface TextInputProps {
    id: string;
    name: string;
    value: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  }
  const TextInput: React.FC<TextInputProps>;
  export default TextInput;
}

declare module '@/Components/InputLabel' {
  interface InputLabelProps {
    htmlFor: string;
    value: string;
  }
  const InputLabel: React.FC<InputLabelProps>;
  export default InputLabel;
}

declare module '@/Components/PrimaryButton' {
  interface PrimaryButtonProps {
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
  }
  const PrimaryButton: React.FC<PrimaryButtonProps>;
  export default PrimaryButton;
}

declare module '@/Components/SecondaryButton' {
  interface SecondaryButtonProps {
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
  }
  const SecondaryButton: React.FC<SecondaryButtonProps>;
  export default SecondaryButton;
}

declare module '@/Components/InputError' {
  interface InputErrorProps {
    message?: string;
    className?: string;
  }
  const InputError: React.FC<InputErrorProps>;
  export default InputError;
} 