import React, { useEffect, useState } from "react";

// import { useAtom } from "jotai";
// import { numberOfDegreesAtom } from "./StateAtoms";

export default function getNFTS(principal) {
    const [myNfts, setMyNfts] = useState([]);
    // const [, setNumberOfDegrees] = useAtom(numberOfDegreesAtom);

    useEffect(() => {
        if (!principal) return;

        fetch(
            `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/nft_events`
        )

            .then((fetchData) => {
                fetchData.json().then((fetchDataJson) => {
                    let myNfts = [];

                    fetchDataJson.nft_events.forEach((value) => {
                        if (
                            value.asset_identifier ===
                            "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.Amortize-nft-minting-V2::amortize-nft"
                        ) {
                            console.log(value);
                            myNfts.push(value.value.repr);
                        }
                    });

                    setMyNfts(myNfts);
                    // setNumberOfDegrees(myNfts.length);
                });
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, [principal]);

    return myNfts;
}

