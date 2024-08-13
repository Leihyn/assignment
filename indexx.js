import React from 'react';
import {Contract, ethers} from "ethers";
import { tokenFactoryAddress } from "../constants/address";
import tokenFactoryAbi from "../constants/TokenFactory.json";
import { parseEther } from "ethers/lib/utils";

const Index = () => {
    const [tokenName, setTokenName] = useState();
    const [tokenSymbol, setTokenSymbol] = useState();
    const [tokenMaxSupply, setTokenMaxSupply] = useState();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
  
    const createToken = async () => {
      setLoading(true);
      const provider = new ethers.providers.InfureProvider("sepolia", process.env.INFURA_PROJECT_ID);
      const signer = provider.getSigner();
      const tokenFactory = new Contract(
        tokenFactoryAddress,
        tokenFactoryAbi,
        signer
      );
      try {
        const tx = await tokenFactory.createToken(
          tokenName,
          tokenSymbol,
          parseEther(tokenMaxSupply.toString()),
          {
            value: parseEther("0.1"),
          }
        );
        await tx.wait();
        setVisible(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
}
function index() {
  return (
    <div>index</div>
  )
}

export default index;
