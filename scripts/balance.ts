import { ethers } from "hardhat"
import { maticSigner } from "@utils"

async function main() {
  console.log(`Balance: ${ethers.utils.formatUnits(await maticSigner.getBalance(), 18)}`)
}

main().then(() => {
  process.exit()
})
