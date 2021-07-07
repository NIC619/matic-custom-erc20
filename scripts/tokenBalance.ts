import { maticSigner, getLONChildERC20Balance } from "@utils"

async function main() {
  console.log(`Token balance: ${await getLONChildERC20Balance(maticSigner.address)}`)
}

main().then(() => {
  process.exit()
})
