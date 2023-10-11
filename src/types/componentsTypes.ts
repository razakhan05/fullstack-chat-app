export interface InputProps {
  title: string;
  placeholder?: string;
  fileType?: boolean;
  value?: string;
  passwordType?: boolean;
  onChange: (value: string | File) => void;
}

export interface ButtonProps {
  className?: string;
  secondaryBtn?: boolean;
  isLoading?: boolean;
  title: string;
  onClick: () => void;
}
