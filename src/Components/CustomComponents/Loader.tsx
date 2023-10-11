export const Loader = ({ loaderColor }: { loaderColor?: string }) => {
  return (
    <span
      className={`loading loading-spinner ${
        loaderColor ? loaderColor : "text-neutral"
      }`}
    ></span>
  );
};
