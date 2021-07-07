import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { deploy } = deployments

  const [deployer] = await hre.ethers.getSigners()

  await deploy("LONChildERC20", {
    from: deployer.address,
    args: ["TestLONChildERC20", "TLCERC20", 18, "0xb5505a6d998549090530911180f38aC5130101c6", deployer.address],
  })
}
export default func
func.tags = ["LONChildERC20"]
