import { truncateText } from "@/utils";
import { useAccount } from "wagmi";

export default function NFTDetail({ getNft }) {

  const {address}  = useAccount();
  return (
    <div className="grid-cols-auto grid items-center gap-x-10">
      <div className="col-span-4 flex items-start justify-end">
        <img
          className="w-[300px] rounded-xl"
          src={
            getNft?.nftData?.external_data?.image ||
            "https://pbs.twimg.com/media/FmVebylaUAMOWZf.jpg:large"
          }
          alt=""
        />
      </div>
      <div className="col-span-8">
        <div className="flex items-center gap-20">
          <div className="flex flex-col gap-5">
            <div className="text-sm font-bold">Contract:</div>
            <div className="text-sm font-bold">Contract Address:</div>
            <div className="text-sm font-bold">Token ID:</div>
            <div className="text-sm font-bold">Original Owner:</div>
            <div className="text-sm font-bold">Owner:</div>
          </div>
          <div className="flex flex-col gap-5">
            <p>{getNft.contract_name}</p>
            <p>{getNft.contract_address}</p>
            <p>{truncateText(getNft.nftData.token_id)}</p>
            <p>{getNft.nftData.original_owner}</p>
            <p>{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
