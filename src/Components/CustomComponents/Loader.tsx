interface LoaderProps {
    loaderColor?: string;
}

export const Loader = ({ loaderColor }: LoaderProps) => {
  return (
    <span
      className={`loading loading-spinner ${loaderColor ? loaderColor : "text-neutral"}`}
    ></span>
  );
};
