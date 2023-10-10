export interface InputProps {
  title: string;
  placeholder?: string;
  fileType?: boolean;
  value?: string;
  passwordType?: boolean;
  onChange: (value: string | File) => void;
}
