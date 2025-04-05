import React, { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

const WalletInfo = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      if (publicKey) {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / 1e9);
      }
    };
    getBalance();
  }, [publicKey, connection]);

  if (!publicKey) return <p>Connect wallet to see info.</p>;

  return (
    <div>
      <p><strong>Wallet Address:</strong> {publicKey.toBase58()}</p>
      <p><strong>SOL Balance:</strong> {balance} SOL</p>
    </div>
  );
};

export default WalletInfo;