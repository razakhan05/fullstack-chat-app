export const Loader = ({
  loaderColor,
  isSkeleton,
}: {
  loaderColor?: string;
  isSkeleton?: boolean;
}) => {
  return (
    <>
      {isSkeleton ? (
        <div className=" gap-4 my-3 flex flex-col">
        <div className=" animate-pulse bg-neutral rounded-md h-14 mx-2"></div>
        <div className=" animate-pulse bg-neutral rounded-md h-14 mx-2"></div>
        <div className=" animate-pulse bg-neutral rounded-md h-14 mx-2"></div>
        <div className=" animate-pulse bg-neutral rounded-md h-14 mx-2"></div>
        <div className=" animate-pulse bg-neutral rounded-md h-14 mx-2"></div>
        <div className=" animate-pulse bg-neutral rounded-md h-14 mx-2"></div>
        <div className=" animate-pulse bg-neutral rounded-md h-14 mx-2"></div>
       
        </div>
      ) : (
        <span
          className={`loading loading-spinner ${
            loaderColor ? loaderColor : "text-neutral"
          }`}
        ></span>
      )}
    </>
  );
};
