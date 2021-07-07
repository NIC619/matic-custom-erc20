import { Wallet, BigNumber, utils } from "ethers"
import { ethers } from "hardhat"

import {
  abi as LONChildERC20ABI,
  address as LONChildERC20Address,
} from "@deployments/matic/LONChildERC20.json"

import config from "../hardhatConfig"

// providers

export const maticProvider = new ethers.providers.JsonRpcProvider(
  config.networks.matic.url
)

// signers

export const maticSigner = new ethers.Wallet(
  config.networks.matic.accounts[0],
  maticProvider
)

// contracts

export const LONChildERC20 = new ethers.Contract(
  LONChildERC20Address,
  LONChildERC20ABI,
  maticProvider
)

// utils

export async function getLONChildERC20Balance(address: string): Promise<BigNumber> {
  return LONChildERC20.connect(maticSigner).balanceOf(address)
}


export async function permitSign(
    wallet: Wallet,
    token: any,
    approve: {
        spender: string
        value: BigNumber
    },
    deadline: BigNumber,
) {
    const owner = wallet.address
    const nonce = await token.permitNonces(owner)

    const domain = {
        name: await token.name(),
        version: "1",
        chainId: (await ethers.provider.getNetwork()).chainId,
        verifyingContract: token.address,
    }

    const types = {
        Permit: [
            {
                name: "owner",
                type: "address",
            },
            {
                name: "spender",
                type: "address",
            },
            {
                name: "value",
                type: "uint256",
            },
            {
                name: "nonce",
                type: "uint256",
            },
            {
                name: "deadline",
                type: "uint256",
            },
        ],
    }

    const message = {
        owner: owner,
        spender: approve.spender,
        value: approve.value,
        nonce: nonce,
        deadline: deadline,
    }

    return utils.splitSignature(await wallet._signTypedData(domain, types, message))
}