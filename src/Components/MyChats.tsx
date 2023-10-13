import { useState } from "react";

export const MyChats = () => {
  const [chatSelected, setChatSelected] = useState<boolean>(false);

  return (
    <div className="lg:ml-[20rem]   h-[88%] border border-neutral lg:border-none  flex  flex-col">
      {/* header profile */}
      <div className=" flex items-center px-4 gap-3 bg-base-300  border-b border-neutral h-20">
        <img src="" className=" w-10  h-10 rounded-full" />
        <label className="text-3xl font-bold">Raza Khan</label>
      </div>

      {/* chat body  */}
      <div className="flex  h-full ">
        <div className="flex w-full h-full  h-50  ">
          {chatSelected ? (
            <div className=" animate-pulse bg-base-200 w-full justify-center flex items-center">
              Start the conversation
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {/* input area */}
        <div className=" w-full border-t border-neutral bg-base-300 h-24 fixed bottom-0">
          sdnkjnsdjndjn
        </div>
      </div>
    </div>
  );
};
