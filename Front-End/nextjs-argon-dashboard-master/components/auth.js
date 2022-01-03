import { showConnect } from "@stacks/connect";
// import { Storage } from "@stacks/storage";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import { userSession } from "../pages/_app";
// const appConfig = new AppConfig(["store_write", "publish_data"]);

// Set this to true if you want to use Mainnet
const boolNetworkType = false;




export function networkType() {
  if (boolNetworkType) return new StacksMainnet();
  else return new StacksTestnet();
}

export function myStxAddress() {
  if (boolNetworkType) return getUserData().profile.stxAddress.mainnet;
  else return getUserData().profile.stxAddress.testnet;
}

export function authenticate() {

  console.log(window.location.origin + "/assets/img/Amortize-pics/Amortize_Logo1.svg");

  showConnect({
    appDetails: {
      name: "Amortize",
      icon: "https://github.com/AliRaza954/Blockchain-VoteCasting/blob/main/front-end/public/img/Amortize-pics/amortize-logo_white.png?raw=true",
    },
    // redirectTo: "/",
    onFinish: () => {windows.location.reload();},
    userSession: userSession,
  });
}

export function getUserData() {
  if (userSession.isUserSignedIn()) {
    return userSession.loadUserData();
  }
}

//Front-End\nextjs-argon-dashboard-master\assets\img\Amortize-pics\Amortize_Logo1.svg

export function Signout() {
  if (userSession.isUserSignedIn()) {
    userSession.signUserOut();
    console.log("Signed out");
  }
}
