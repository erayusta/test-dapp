require("@nomiclabs/hardhat-waffle");

const privateKey = "XXXXXXXXXXXXXXXXXXXXXX";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  // compile öncesi react de kullanabilmek adına ABI dosyalarının yolunu değiştiriyoruz
  paths: {
    artifacts: './src/artifacts',
  },
  // local ağımızı göstermek için metamask ın bug ından dolayı chainId olarak 1337 yazıyoruz
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/XXXXXXXXXXXXXXXXX",
      accounts: [privateKey]
    },
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/xXXXXXXXXXXX",
      accounts: [privateKey]
    },
    binance: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [privateKey]
    }
  }

};
