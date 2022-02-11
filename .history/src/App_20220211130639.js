import './App.css';
import { useState } from 'react'
import { ethers } from 'ethers'
import Greeter from 'Greeter.json'

// Deploy sonrası verdiği adresi buraya giriyoruz

/*
// mumbai
 const greeterAddress = "0x81d17052B781748091C988862370412569d81411"

// ropsten
const greeterAddress = "0xe8D4C6F10D27568aFEC8De984c2213fF9e9bb2FE"

//bsc ağı
const greeterAddress = "0xFeC44fF8ee1f92a8a826f338d945dC8a0B178733"
*/


function App() {
  // local state de kayıtları tutuyoruz.
  const [greeting, setGreetingValue] = useState()
    
  const [greeterAddress, setGreeterAddress] = useState();
    
  // Metamask izni için kullanıyoruz.
  async function requestAccount() {
    // cüzdan bağlanmamış ise connect için popup aç
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // smart contract ı çağırma mevcut mesajı okumak için 
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      // ether.js ile provider ı başlat
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // kontrat başlat
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        // kontratta yer alan greet fonksiyonunu çağır
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        // hata varsa ekrana yaz
        console.log("Error: ", err)
      }
    }    
  }

  // smart kontratı çağır ve mesajı güncelle
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      // metamask ile bağlantı için popup açar
      await requestAccount()
      // provider ı başlatır
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // cüzdan sahibini tanır
      const signer = provider.getSigner()
      // cüzdan sahibi mesajı ayarlayanın mesajını akıllı kontrat için kontrat başlatır
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      // kontrattaki setGreeting mesaj ayarlama fonksiyonuna mesajı gönderir
      const transaction = await contract.setGreeting(greeting)
      // transactionın oluşması için bekler
      await transaction.wait()
      // transaction oluştuktan sonra mesajı console a basar
      fetchGreeting()
    }
  }

  // React in html kod bloğu 2 buton ve 1 input box oluşturur
  return (
    <div className="App">
      <header className="App-header">
          
        {/*******************************************/}
        <div>
            <label>Test Ağını Seçiniz: </label>
            <input type="radio" name="ag" value="0xC05ABC9012C229Fe9042e67a93C5E72A142B5Ac4" onChange={e => setGreeterAddress(e.target.value)} /> BSC
            <input type="radio" name="ag" value="0xd7C6C7A61B70bc2824974F945F1E3f81D6068927" onChange={e => setGreeterAddress(e.target.value)} /> Ropsten
            <input type="radio" name="ag" value="0x08E32036A3d459EC179E913C2de4b7A98cD03463" onChange={e => setGreeterAddress(e.target.value)} /> Polygon Mumbai
        </div>
        {/*******************************************/}

        <p>(Metamask da ağı değiştirmeyi unutmayın)</p>
	    

        <button onClick={fetchGreeting}>Selamlamayı Çağır</button>
        <button onClick={setGreeting}>Selamı Yeniden Ayarla</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Selamlama mesajını değiştir" />
      </header>
    </div>
  );
}

export default App;