import { ethers } from "hardhat"
import {
  ethSigner,
  maticSigner,
  LONChildERC20,
  getLONChildERC20Balance,
  permitSign,
} from "@utils"


async function main() {
  console.log(
    `Token balance before permit: ${await getLONChildERC20Balance(
      maticSigner.address
    )}`
  )
  let val = ethers.utils.parseUnits('1')
  let signed = await permitSign(
      maticSigner,
      LONChildERC20,
      { spender: ethSigner.address, value: val },
      ethers.constants.MaxUint256,
  )
  console.log(
    maticSigner.address,
      ethSigner.address,
      val,
      ethers.constants.MaxUint256,
      signed.v,
      signed.r,
      signed.s,
  )
  await LONChildERC20.connect(maticSigner).permit(
      maticSigner.address,
      ethSigner.address,
      val,
      ethers.constants.MaxUint256,
      signed.v,
      signed.r,
      signed.s,
  )
  await new Promise((resolve) => {
    setTimeout(async () => {
      console.log(
        `Balance after permit: ${await getLONChildERC20Balance(
          maticSigner.address
        )}`
      )
      resolve(true)
    }, 5000)
  })
}

main().then(() => {
  process.exit()
})
