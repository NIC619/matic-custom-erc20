import fs from "fs"

const config = {
  networks: {
    matic: {
      chainId: 80001,
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [fs.readFileSync(".secret").toString().trim()],
    },
  },
  solidity: {
    version: "0.6.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}

export default config
