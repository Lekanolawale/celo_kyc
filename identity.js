const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");
const KYC = require("./build/contracts/KYC.json");

const privateKey =
  "8d3f57ab3f2c08e01cd6c1d29048093061c7ffd4737532868e34043a01b2a7b4"; // replace with your private key
const rpcUrl = "https://alfajores-forno.celo-testnet.org";

const web3 = new Web3(rpcUrl);
const kit = ContractKit.newKitFromWeb3(web3);

const contractAddress = "0xb20DD034caa6eD27AcA1b5e05F8a6b419dc7a953"; // replace with your contract address
const contractInstance = new kit.web3.eth.Contract(KYC.abi, contractAddress);

async function getPhoneNumberIdentifier(address) {
  const accountsWrapper = await kit.contracts.getAccounts();
  return await accountsWrapper.getPhoneNumberIdentifier(address);
}

async function getMetadataURL(address) {
  const accountsWrapper = await kit.contracts.getAccounts();
  return await accountsWrapper.getMetadataURL(address);
}

async function getAttestationStats(phoneNumberIdentifier) {
  const attestationsWrapper = await kit.contracts.getAttestations();
  return await attestationsWrapper.getAttestationStats(phoneNumberIdentifier);
}

async function verifyAddressMapping(address) {
  const identifier = await getPhoneNumberIdentifier(address);
  const { completed, total } = await getAttestationStats(identifier);

  const requiredAttestations = Math.ceil(total * 0.66);
  return completed >= requiredAttestations;
}
