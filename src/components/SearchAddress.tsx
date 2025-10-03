import { useState } from "react";
import "./SearchAddress.css";

function SearchAddress() {
  interface SolanaSignatureInfo {
    signature: string;
    slot: number;
    blockTime?: number;
  }

  const [transactions, setTransactions] = useState<SolanaSignatureInfo[]>([]);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  // Replace with your Helius/QuickNode/Alchemy RPC endpoint
  const RPC_URL = "https://mainnet.helius-rpc.com/?api-key=6a96b054-4bbf-4687-9180-f308027e22e6";

  const btnAddWalletAddress = async () => {
    if (!address) return;
  
    setError("");
    setTransactions([]);
  
    try {
      const response = await fetch(RPC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getSignaturesForAddress",
          params: [address, { limit: 10 }],
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.error) {
        throw new Error(data.error.message);
      }
  
      setTransactions(data.result || []);
    } catch (err: unknown) {
      console.error("Error fetching transactions:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch transactions");
      }
    }
  };
  
  const handleWalletAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="results">
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((tx, index) => (
              <li key={index}>
                <strong>Signature:</strong> {tx.signature} <br />
                <strong>Slot:</strong> {tx.slot} <br />
                <strong>Block Time:</strong>{" "}
                {tx.blockTime
                  ? new Date(tx.blockTime * 1000).toLocaleString()
                  : "N/A"}
              </li>
            ))}
          </ul>
        ) : (
          !error && <p>No transactions found</p>
        )}
      </div>
    </div>
  );
}

export default SearchAddress;
