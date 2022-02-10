import './App.css';
import { useState } from 'react'
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

// Deploy sonrası verdiği adresi buraya giriyoruz
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  // local state de kayıtları tutuyoruz.
  const [greeting, setGreetingValue] = useState()

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

  // React in html kod bloğu
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Selamlamayı Çağır</button>
        <button onClick={setGreeting}>Selamı Yeniden Ayarla</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Selamlama mesajını değiştir" />
      </header>
    </div>
  );
}

export default App;