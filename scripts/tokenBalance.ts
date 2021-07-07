import { ethers } from "hardhat"
import { maticSigner, getLONChildERC20Balance } from "@utils"

async function main() {
  console.log(`Token balance: ${ethers.utils.formatUnits(await getLONChildERC20Balance(maticSigner.address), 18)}`)
}

main().then(() => {
  process.exit()
})
