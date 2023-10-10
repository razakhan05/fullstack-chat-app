export interface InputProps {
  title: string;
  placeholder?: string;
  fileType?: boolean;
  passwordType?: boolean;
  onChange: (value: string | File) => void;
}
