import { useState } from "react";
import "./SearchAddress.css";

function SearchAddress() {
  const [address, setAddress] = useState("");

  const btnAddWalletAddress = () => {
    if (!address) return;
    console.log("Searching address:", address);
    setAddress("");
  };

  const handleWalletAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <>
      <div className="form">
  
        <h1>Explore Solana Transactions</h1>
        <span>
          Enter a wallet address to view all associated transactions on the Solana blockchain
        </span>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter a wallet address"
            id="address"
            onChange={handleWalletAddress}
            value={address}
          />
          <button onClick={btnAddWalletAddress}>Search</button>
        </div>
      </div>
        
    </>
  );
}

export default SearchAddress;
