import { ethers } from "hardhat"
import {
  maticSigner,
  LONChildERC20,
  getLONChildERC20Allowance,
  permitSign,
} from "@utils"

const SPENDER_ADDRESS = "0xE3c19B6865f2602f30537309e7f8D011eF99C1E0"

async function main() {
  console.log(
    `Allowance before permit: ${await getLONChildERC20Allowance(
      maticSigner.address,
      SPENDER_ADDRESS
    )}`
  )
  let val = ethers.utils.parseUnits('1')
  let signed = await permitSign(
      maticSigner,
      LONChildERC20,
      { spender: SPENDER_ADDRESS, value: val },
      ethers.constants.MaxUint256,
  )
  console.log(
    maticSigner.address,
      SPENDER_ADDRESS,
      val,
      ethers.constants.MaxUint256,
      signed.v,
      signed.r,
      signed.s,
  )
  await LONChildERC20.connect(maticSigner).permit(
      maticSigner.address,
      SPENDER_ADDRESS,
      val,
      ethers.constants.MaxUint256,
      signed.v,
      signed.r,
      signed.s,
  )
  await new Promise((resolve) => {
    setTimeout(async () => {
      console.log(
        `Allowance after permit: ${await getLONChildERC20Allowance(
          maticSigner.address,
          SPENDER_ADDRESS
        )}`
      )
      resolve(true)
    }, 5000)
  })
}

main().then(() => {
  process.exit()
})
