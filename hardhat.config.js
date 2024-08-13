require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


const { PRIVATE_KEY, INFURA_PROJECT_ID } = process.env;

module.exports = {
  solidity: {
    version: "0.8.20"
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/0efa44d155024bdb86e1d961fbdf930c",
      accounts: [`457ee9beaa7dec136d89701bb763a204a1b26e721232ab050f2ed43477beab45`],
    },
  },
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
  basePath: '/frontend',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@/pages'] = path.resolve(__dirname, 'frontend/pages');
    }
    return config;
  },
};

//npx hardhat ignition deploy ./ignition/modules/Lock.js --network <your-network>
//https://sepolia.infura.io/v3/0efa44d155024bdb86e1d961fbdf930c

