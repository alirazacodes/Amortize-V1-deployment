import { networkType, myStxAddress, getUserData } from "./auth";
import { userSession } from "../pages/_app";
import {
  callReadOnlyFunction,
  cvToJSON,
  standardPrincipalCV,
  stringAsciiCV,
  bufferCV,
  responseErrorCV,
  responseOkCV,
  trueCV,
  falseCV,
  uintCV,
  intCV,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
} from "@stacks/transactions";

import { Storage } from '@stacks/storage';

import { openContractCall } from "@stacks/connect";

import { createSha2Hash } from "@stacks/encryption";
import { v4 as uuidv4 } from "uuid";

import { fetchUserInfo } from "./profile";

import { fetchEquityInfo } from "./equity-info";

import Email from "./smtp";

const ContractDeployerAddress = "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6";

const AgentAddress = "ST27ENRYMEGM9K6TVR7A8JEDTFXN5EA22KN10BS10";

export default async function appCallReadOnlyFunction(optionsProps) {
  if (!optionsProps)
    return new Promise((resolve, reject) => reject("no arguments provided"));

  const options = {
    ...optionsProps,
    network: networkType(),
    senderAddress: myStxAddress(),
  };

  return callReadOnlyFunction(options)
    .then((response) => {
      const responseJson = cvToJSON(response);

      return new Promise((resolve, reject) => resolve(responseJson));
    })
    .catch((e) => {
      return new Promise((resolve, reject) => reject(e));
    });
}

async function appCallPublicFunction(optionsProps) {

  if (!optionsProps)
    return new Promise((resolve, reject) => reject("no arguments provided"));

  const options = {
    ...optionsProps,
    network: networkType(),
    appDetails: {
      name: "Amortize",
      icon: window.location.origin + "/img/Logo.svg",
    },
    senderAddress: myStxAddress(),
  };


  openContractCall(options);

};

async function Mint(AgentName) {

  let FetchUserName = await fetchUserInfo(userSession);

  //console.log(FetchUserName);

  const UserName = FetchUserName.FirstName + " " + FetchUserName.LastName;

  // console.log(UserName);

  const EquityData = await fetchEquityInfo(userSession);


  const fileContent = JSON.stringify({
    AgentName: AgentName,
    UserName: UserName,
    AgentAddress: AgentAddress,
    UserAddress: myStxAddress(),
    TermLength: EquityData.TermLength,
    ValueOfHome: EquityData.ValueOfHome,
    CurrentMorgageBalance: EquityData.CurrentMorgageBalance,
  });

  // console.log(fileContent);

  const fileOptions = {
    encrypt: false,
    contentType: "application/json",
    dangerouslyIgnoreEtag: true,
  };

  const propDataBuf = Buffer.from(fileContent);

  const randomId = uuidv4().toString().slice(0, 29);
  const fileName = randomId + "-PropInfo.json";

  const tokenUri = getUserData().gaiaHubConfig.address + "/" + randomId;

  const storage = new Storage({ userSession });

  createSha2Hash().then((sha2Hash) => {
    sha2Hash.digest(propDataBuf, "sha256").then((resultBuff) => {
      Promise.all([
        storage.putFile(fileName, fileContent, fileOptions),
      ])
        .then(() => {
          // Successfully placed all the files

          const functionArgs = [
            standardPrincipalCV(myStxAddress()),
            bufferCV(resultBuff),
            stringAsciiCV(tokenUri),
            uintCV(EquityData.ValueOfHome),
          ];

          const options = {
            contractAddress: ContractDeployerAddress,
            contractName: "Amortize-nft-minting-V2",
            functionName: "mint",
            functionArgs,
            network: networkType(),
            appDetails: {
              name: "Amortize",
              //icon: "https://thumb.tildacdn.com/tild3764-3035-4261-b839-376338376239/-/cover/360x230/center/center/-/format/webp/blocktech_1.png",
            },
            onFinish: (data) => {
              console.log("Stacks Transaction:", data.stacksTransaction);
              console.log("Transaction ID:", data.txId);
              console.log("Raw transaction:", data.txRaw);
            },
          };

          openContractCall(options);
        })
        .catch((e) => {
          console.log(e.message);
          // setShowLoader(false);
          setUploadErrorDegree(
            "There were some troubles uploading information on your Gaia Hub, kindly retry. If this error persists then please try back in a few minuters"
          );
        });
    });
  });
}

function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "sender@email_address.com",
    Password: "Enter your password",
    To: 'receiver@email_address.com', // Jame's Email Address
    From: "sender@email_address.com", // Amortize Email Address
    Subject: "NFT Minted!",
    Body: "Hello",
  })
    .then(function (message) {
      alert("mail sent successfully")
    });
}


export async function LockEquity(AgentName, beneficiary, unlock, amount) {

  // const postConditionAddress = myStxAddress();
  // const postConditionCode = FungibleConditionCode.GreaterEqual;
  // const postConditionAmount = uintCV(amount).value;
  // const postConditions = [
  //   makeStandardSTXPostCondition(postConditionAddress, postConditionCode, postConditionAmount),
  // ];

  // appCallPublicFunction({
  //   contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
  //   contractName: "lock",
  //   functionName: "lock",
  //   postConditions,
  //   functionArgs: [
  //     // enter all your function arguments here but cast them to CV first
  //     standardPrincipalCV(beneficiary),
  //     uintCV(unlock),
  //     uintCV(amount)
  //   ],
  // });

  Mint(AgentName);
};

export function AddBeneficiary(beneficiary) {
  const functionArgs = [
    standardPrincipalCV(beneficiary)
  ];

  appCallPublicFunction("equity-multi-claim", "add-beneficiary", functionArgs);
}

export function ClaimEquity() {
  const functionArgs = [
  ];

  appCallPublicFunction("equity-multi-claim", "multi-claim", functionArgs);
}

