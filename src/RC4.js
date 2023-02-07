import './App.css'
import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'

const RC4 = () => {
  const [plainText, setPlainText] = useState('')
  const [key, setKey] = useState('')
  const [encryptedText, setEncryptedText] = useState('')
  const [decryptedText, setDecryptedText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();   
  }


  
  function rc(key, str, dec = false) {
    // console.log("key", key, "string", str)
    var s = [], j = 0, x, res = '';
    for (var i = 0; i < 256; i++) {
      s[i] = i;
    }
    for (i = 0; i < 256; i++) {
      j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
      i = (i + 1) % 256;
      j = (j + s[i]) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
      res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    // return res;
    if (dec) {
      setDecryptedText(res)
    } else {
      setEncryptedText(res)
    }
    console.log("res", res)
  
  }

  return (
    <div>
      {/* <div>RMHCd07Skw4g</div> */}
      <Navbar />
      <div className="container">
        <form className='form-encrypted' onSubmit={handleSubmit}>
          <h1>RC4: Encryption:</h1>
          <div className="form-group" >
            <label htmlFor="plainText">Plain text</label>
            <input 
              type="text" 
              className="form-control" 
              id="plainText" 
              placeholder="Enter plain Text:"
              onChange = {(e) => setPlainText(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="key">Key</label>
            <input 
              type="text" 
              className="form-control" 
              id="key" 
              placeholder="Enter key:"
              onChange = {(e) => setKey(e.target.value)} />
          </div>
          <button className = "btn btn-primary" type ="submit" onClick={() => rc(key, plainText)}>Encryption</button>
          {/* <button className = "btn btn-primary" type ="submit" onClick={() => rc5()}>Generate encrypted Text</button> */}
          <h3>{encryptedText ? `Encrypted Text is ${encryptedText}` : null}</h3>
        </form>
        <form className='form-decrypted' onSubmit={handleSubmit}>
          <h1>RC4: Decryption:</h1>
          <div className="form-group" >
            {/* <label htmlFor="plainText">Encrypted Text:</label>
            <input 
              type="text" 
              className="form-control" 
              id="plainText" 
              placeholder="Encrypted Text:"
              onChange = {(e) => setPlainText(e.target.value)} /> */}
          </div>
          <div className="form-group">
            <label htmlFor="key">Key</label>
            <input 
              type="text" 
              className="form-control" 
              id="key" 
              placeholder="Enter Secret key:"
              onChange = {(e) => setKey(e.target.value)} />
          </div>
          {/* <button className = "btn btn-primary" type ="submit" onClick={() => rc4(key, plainText)}>Generate encrypted Text</button> */}
          <button className = "btn btn-primary" type ="submit" onClick={() => rc(key, encryptedText, true)}>Decryption</button>
          <h3>{decryptedText ? `Decrypted Text is ${decryptedText}` : null}</h3>
        </form>
        </div>
    </div>
   
  )
}

export default RC4
