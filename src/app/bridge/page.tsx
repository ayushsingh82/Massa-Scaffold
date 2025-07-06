"use client"

import { useState } from 'react';

interface Token {
  name: string;
  address: string;
  network: string;
  symbol: string;
}

const tokens: Token[] = [
  // Ethereum
  {
    name: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    network: 'Ethereum',
    symbol: 'USDC'
  },
  {
    name: 'WETH',
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    network: 'Ethereum',
    symbol: 'WETH'
  },
  {
    name: 'DAI',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    network: 'Ethereum',
    symbol: 'DAI'
  },
  // Massa
  {
    name: 'USDC.e',
    address: 'AS1hCJXjndR4c9vekLWsXGnrdigp4AaZ7uYG3UKFzzKnWVsrNLPJ',
    network: 'Massa',
    symbol: 'USDC.e'
  },
  {
    name: 'WETH.e',
    address: 'AS124vf3YfAJCSCQVYKczzuWWpXrximFpbTmX4rheLs5uNSftiiRY',
    network: 'Massa',
    symbol: 'WETH.e'
  },
  {
    name: 'DAI.e',
    address: 'AS1ZGF1upwp9kPRvDKLxFAKRebgg7b3RWDnhgV7VvdZkZsUL7Nuv',
    network: 'Massa',
    symbol: 'DAI.e'
  },
  {
    name: 'WETH.b',
    address: 'AS125oPLYRTtfVjpWisPZVTLjBhCFfQ1jDsi75XNtRm1NZux54eCj',
    network: 'Massa',
    symbol: 'WETH.b'
  },
  {
    name: 'USDT.b',
    address: 'AS12LKs9txoSSy8JgFJgV96m8k5z9pgzjYMYSshwN67mFVuj3bdUV',
    network: 'Massa',
    symbol: 'USDT.b'
  },
  // BNB Smart Chain
  {
    name: 'USDT',
    address: '0x55d398326f99059fF775485246999027B3197955',
    network: 'BNB Smart Chain',
    symbol: 'USDT'
  },
  {
    name: 'ETH',
    address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    network: 'BNB Smart Chain',
    symbol: 'ETH'
  }
];

export default function BridgePage() {
  const [selectedFromNetwork, setSelectedFromNetwork] = useState('Ethereum');
  const [selectedToNetwork, setSelectedToNetwork] = useState('Massa');
  const [selectedToken, setSelectedToken] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const networks = ['Ethereum', 'Massa', 'BNB Smart Chain'];
  
  const availableTokens = tokens.filter(token => 
    token.network === selectedFromNetwork
  );

  const getShortAddress = (address: string) => {
    if (address.startsWith('AS')) {
      // Massa address
      return `${address.slice(0, 8)}...${address.slice(-8)}`;
    } else {
      // Ethereum/BNB address
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
  };

  const handleBridge = async () => {
    if (!selectedToken || !amount) {
      alert('Please select a token and enter an amount');
      return;
    }

    setIsLoading(true);
    // Simulate bridge transaction
    setTimeout(() => {
      setIsLoading(false);
      alert('Bridge transaction initiated! (Demo mode)');
    }, 2000);
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    alert('Address copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cross-Chain Bridge
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Bridge your tokens between Ethereum, Massa, and BNB Smart Chain networks
          </p>
        </div>

        {/* Bridge Interface */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20">
            {/* From Network */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">From Network</label>
              <select
                value={selectedFromNetwork}
                onChange={(e) => setSelectedFromNetwork(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-orange-500 focus:outline-none"
              >
                {networks.map(network => (
                  <option key={network} value={network}>{network}</option>
                ))}
              </select>
            </div>

            {/* To Network */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">To Network</label>
              <select
                value={selectedToNetwork}
                onChange={(e) => setSelectedToNetwork(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-orange-500 focus:outline-none"
              >
                {networks.filter(network => network !== selectedFromNetwork).map(network => (
                  <option key={network} value={network}>{network}</option>
                ))}
              </select>
            </div>

            {/* Token Selection */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Token</label>
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-orange-500 focus:outline-none"
              >
                <option value="">Select a token</option>
                {availableTokens.map(token => (
                  <option key={token.address} value={token.address}>
                    {token.name} ({token.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Bridge Button */}
            <button
              onClick={handleBridge}
              disabled={isLoading || !selectedToken || !amount}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
                isLoading || !selectedToken || !amount
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Bridging...
                </span>
              ) : (
                'Bridge Tokens'
              )}
            </button>
          </div>
        </div>

        {/* Token Addresses Table */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Supported Tokens</h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-medium">Network</th>
                    <th className="px-6 py-4 text-left text-white font-medium">Token Name</th>
                    <th className="px-6 py-4 text-left text-white font-medium">Address</th>
                    <th className="px-6 py-4 text-left text-white font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {tokens.map((token, index) => (
                    <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 text-white">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          token.network === 'Ethereum' ? 'bg-blue-100 text-blue-800' :
                          token.network === 'Massa' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {token.network}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{token.name}</td>
                      <td className="px-6 py-4 text-gray-300 font-mono text-sm">
                        {getShortAddress(token.address)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => copyAddress(token.address)}
                          className="text-orange-400 hover:text-orange-300 transition-colors"
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}