
'use client'

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";




function LandingPage() {
  const {isConnected,address,connector} = useAccount()
  console.log(connector,'connector')
    const [data, setData] = useState(null);
const getEnsName = async () => {
  try {
    const response = await fetch(`https://cors.codecrane.com/https://api.prd.space.id/v1/getName?tld=arb1&address=0x06e70f295B6337c213DDe82D13cc198027687A7B`);
    const data = await response.json();
    setData(data)
  }
  catch (e) {
    console.log(e)
  }
}
useEffect(() => {
  getEnsName();
}, [])

console.log(data,'data')
    
  return (
    <>
    <section className="pt-10">
      <div className="container mx-auto">
        <h1 className="text-[32px] text-center mb-4">AAbstractor improves the UX for Tokenbound accounts</h1>
      <p className="text-center mb-10">Login to dapps through iframe or WalletConnect & transact as easily as you'd via an EOA!</p>
        {/* <RainbowKitConnectButton /> */}
      </div>
    </section>
    </>
  );
}

export default LandingPage;
