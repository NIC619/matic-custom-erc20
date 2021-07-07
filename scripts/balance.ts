import { maticSigner } from "@utils"

async function main() {
  console.log(`Balance: ${await maticSigner.getBalance()}`)
}

main().then(() => {
  process.exit()
})
