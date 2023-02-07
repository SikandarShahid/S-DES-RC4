import React, { useState } from "react";
import "./App.css";
import KeyGeneration from "./components/KeyGeneration/KeyGeneration";
import Encryption from "./components/Encryption/Encryption";
import Decryption from "./components/Decryption/Decryption";

import {
  getKeyGenOutputs,
  getEncryptOutputs,
  getDecryptOutputs,
  getStringEncryptionOutput,
  getStringDecryptionOutput,
} from "./utils";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  //key generation
  const [keyValue, setKeyValue] = useState("");
  const [keyBitsArray, setKeyBitsArray] = useState([
    1, 0, 1, 0, 0, 0, 0, 0, 1, 0,
  ]);
  const [perm10, setPerm10] = useState([3, 5, 2, 7, 4, 10, 1, 9, 8, 6]);
  const [perm8, setPerm8] = useState([6, 3, 7, 4, 8, 5, 10, 9]);

  const [p10Output, setP10Output] = useState([1, 0, 0, 0, 0, 0, 1, 1, 0, 0]);
  const [ls1Output, setLs1Output] = useState([0, 0, 0, 0, 1, 1, 1, 0, 0, 0]);
  const [key1, setKey1] = useState([1, 0, 1, 0, 0, 1, 0, 0]);
  const [ls2Output, setLs2Output] = useState([0, 0, 1, 0, 0, 0, 0, 0, 1, 1]);
  const [key2, setKey2] = useState([0, 1, 0, 0, 0, 0, 1, 1]);

  const handleKeyGenSubmit = () => {
    if (keyValue.length !== 10) {
      alert("Key length should be 10");
      return;
    }
    let tempArray = keyValue.split("").map((value) => Number(value));
    for (let i = 0; i < 10; i++) {
      if (!(tempArray[i] === 0 || tempArray[i] === 1)) {
        alert("Key bits should be 1 or 0");
        return;
      }
    }
    setKeyBitsArray(tempArray);

    // calculate output of p10, ls1, p8 or key1, ls2, p8 or key2
    let keyGenOutputs = getKeyGenOutputs(tempArray, perm10, perm8);

    setP10Output(keyGenOutputs["p10Output"]);
    setLs1Output(keyGenOutputs["ls1Output"]);
    setKey1(keyGenOutputs["key1"]);
    setLs2Output(keyGenOutputs["ls2Output"]);
    setKey2(keyGenOutputs["key2"]);
  };

  //encryption
  const [plainTextValue, setPlainTextValue] = useState("");
  const [plainTextArray, setPlainTextArray] = useState([
    1, 0, 0, 1, 0, 1, 1, 1,
  ]);
  const [expansion, setExpansion] = useState([4, 1, 2, 3, 2, 3, 4, 1]);
  const [initialPerm, setInitialPerm] = useState([2, 6, 3, 1, 4, 8, 5, 7]);
  const [inverseIP, setInverseIP] = useState([4, 1, 3, 5, 7, 2, 8, 6]);
  const [perm4, setPerm4] = useState([2, 4, 3, 1]);
  const s0 = [
    [1, 0, 3, 2],
    [3, 2, 1, 0],
    [0, 2, 1, 3],
    [3, 1, 3, 2],
  ];
  const s1 = [
    [0, 1, 2, 3],
    [2, 0, 1, 3],
    [3, 0, 1, 0],
    [2, 1, 0, 3],
  ];

  const [initialPermOutput, setInitialPermOutput] = useState([
    0, 1, 0, 1, 1, 1, 0, 1,
  ]);
  const [l4Iter1, setL4Iter1] = useState([0, 1, 0, 1]);
  const [r4Iter1, setR4Iter1] = useState([1, 1, 0, 1]);
  const [expansionIter1Output, setExpansionIter1Output] = useState([
    1, 1, 1, 0, 1, 0, 1, 1,
  ]);
  const [expXORKey1Iter1Output, setExpXORKey1Iter1Output] = useState([
    0, 1, 0, 0, 1, 1, 1, 1,
  ]);
  const [sboxIter1Output, setSboxIter1Output] = useState([1, 1, 1, 1]);
  const [perm4Iter1Output, setPerm4Iter1Output] = useState([1, 1, 1, 1]);
  const [leftXORPerm4Iter1Output, setLeftXORPerm4Iter1Output] = useState([
    1, 0, 1, 0,
  ]);
  const [fk1Output, setFk1Output] = useState([1, 0, 1, 0, 1, 1, 0, 1]);
  const [swapOutput, setSwapOutput] = useState([1, 1, 0, 1, 1, 0, 1, 0]);
  const [l4Iter2, setL4Iter2] = useState([1, 1, 0, 1]);
  const [r4Iter2, setR4Iter2] = useState([1, 0, 1, 0]);
  const [expansionIter2Output, setExpansionIter2Output] = useState([
    0, 1, 0, 1, 0, 1, 0, 1,
  ]);
  const [expXORKey2Iter2Output, setExpXORKey2Iter2Output] = useState([
    0, 0, 0, 1, 0, 1, 1, 0,
  ]);
  const [sboxIter2Output, setSboxIter2Output] = useState([1, 1, 1, 1]);
  const [perm4Iter2Output, setPerm4Iter2Output] = useState([1, 1, 1, 1]);
  const [leftXORPerm4Iter2Output, setLeftXORPerm4Iter2Output] = useState([
    0, 0, 1, 0,
  ]);
  const [fk2Output, setFk2Output] = useState([0, 0, 1, 0, 1, 0, 1, 0]);

  const [cipherText, setCipherText] = useState([0, 0, 1, 1, 1, 0, 0, 0]);

  const handleEncryptSubmit = () => {
    if (plainTextValue.length !== 8) {
      alert("Plaintext length should be 8");
      return;
    }
    let tempArray = plainTextValue.split("").map((value) => Number(value));

    for (let i = 0; i < 8; i++) {
      if (!(tempArray[i] === 0 || tempArray[i] === 1)) {
        alert("Plaintext bits should be 1 or 0");
        return;
      }
    }

    setPlainTextArray(tempArray);

    // calculate output of p10, ls1, p8 or key1, ls2, p8 or key2
    let encryptOutputs = getEncryptOutputs(
      tempArray,
      initialPerm,
      s0,
      s1,
      expansion,
      perm4,
      inverseIP,
      key1,
      key2
    );

    setInitialPermOutput(encryptOutputs["initialPermOutput"]);
    setL4Iter1(encryptOutputs["l4Iter1"]);
    setR4Iter1(encryptOutputs["r4Iter1"]);
    setExpansionIter1Output(encryptOutputs["expansionIter1Output"]);
    setExpXORKey1Iter1Output(encryptOutputs["expXORKey1Iter1Output"]);
    setSboxIter1Output(encryptOutputs["sboxIter1Output"]);
    setPerm4Iter1Output(encryptOutputs["perm4Iter1Output"]);
    setLeftXORPerm4Iter1Output(encryptOutputs["leftXORPerm4Iter1Output"]);
    setFk1Output(encryptOutputs["fk1Output"]);
    setSwapOutput(encryptOutputs["swapOutput"]);
    setL4Iter2(encryptOutputs["l4Iter2"]);
    setR4Iter2(encryptOutputs["r4Iter2"]);
    setExpansionIter2Output(encryptOutputs["expansionIter2Output"]);
    setExpXORKey2Iter2Output(encryptOutputs["expXORKey2Iter2Output"]);
    setSboxIter2Output(encryptOutputs["sboxIter2Output"]);
    setPerm4Iter2Output(encryptOutputs["perm4Iter2Output"]);
    setLeftXORPerm4Iter2Output(encryptOutputs["leftXORPerm4Iter2Output"]);
    setFk2Output(encryptOutputs["fk2Output"]);
    setCipherText(encryptOutputs["cipherText"]);
  };

  // Decryption
  const [cipherTextValue, setCipherTextValue] = useState("");
  const [cipherTextArray, setCipherTextArray] = useState([
    0, 0, 1, 1, 1, 0, 0, 0,
  ]);

  const [decinitialPermOutput, setDecInitialPermOutput] = useState([
    0, 0, 1, 0, 1, 0, 1, 0,
  ]);
  const [decl4Iter1, setDecL4Iter1] = useState([0, 0, 1, 0]);
  const [decr4Iter1, setDecR4Iter1] = useState([1, 0, 1, 0]);
  const [decexpansionIter1Output, setDecExpansionIter1Output] = useState([
    0, 1, 0, 1, 0, 1, 0, 1,
  ]);
  const [decexpXORKey1Iter1Output, setDecExpXORKey1Iter1Output] = useState([
    0, 0, 0, 1, 0, 1, 1, 0,
  ]);
  const [decsboxIter1Output, setDecSboxIter1Output] = useState([1, 1, 1, 1]);
  const [decperm4Iter1Output, setDecPerm4Iter1Output] = useState([1, 1, 1, 1]);
  const [decleftXORPerm4Iter1Output, setDecLeftXORPerm4Iter1Output] = useState([
    1, 1, 0, 1,
  ]);
  const [decfk1Output, setDecFk1Output] = useState([1, 1, 0, 1, 1, 0, 1, 0]);
  const [decswapOutput, setDecSwapOutput] = useState([1, 0, 1, 0, 1, 1, 0, 1]);
  const [decl4Iter2, setDecL4Iter2] = useState([1, 0, 1, 0]);
  const [decr4Iter2, setDecR4Iter2] = useState([1, 1, 0, 1]);
  const [decexpansionIter2Output, setDecExpansionIter2Output] = useState([
    1, 1, 1, 0, 1, 0, 1, 1,
  ]);
  const [decexpXORKey2Iter2Output, setDecExpXORKey2Iter2Output] = useState([
    0, 1, 0, 0, 1, 1, 1, 1,
  ]);
  const [decsboxIter2Output, setDecSboxIter2Output] = useState([1, 1, 1, 1]);
  const [decperm4Iter2Output, setDecPerm4Iter2Output] = useState([1, 1, 1, 1]);
  const [decleftXORPerm4Iter2Output, setDecLeftXORPerm4Iter2Output] = useState([
    0, 1, 0, 1,
  ]);
  const [decfk2Output, setDecFk2Output] = useState([0, 1, 0, 1, 1, 1, 0, 1]);

  const [plainText, setPlainText] = useState([1, 0, 0, 1, 0, 1, 1, 1]);

  const handleDecryptSubmit = () => {
    // input validation [TODO]
    if (cipherTextValue.length !== 8) {
      alert("Ciphertext length should be 8");
      return;
    }
    let tempArray = cipherTextValue.split("").map((value) => Number(value));

    for (let i = 0; i < 8; i++) {
      if (!(tempArray[i] === 0 || tempArray[i] === 1)) {
        alert("Ciphertext bits should be 1 or 0");
        return;
      }
    }

    setCipherTextArray(tempArray);

    // calculate output of p10, ls1, p8 or key1, ls2, p8 or key2
    let decryptOutputs = getDecryptOutputs(
      tempArray,
      initialPerm,
      s0,
      s1,
      expansion,
      perm4,
      inverseIP,
      key1,
      key2
    );

    setDecInitialPermOutput(decryptOutputs["initialPermOutput"]);
    setDecL4Iter1(decryptOutputs["l4Iter1"]);
    setDecR4Iter1(decryptOutputs["r4Iter1"]);
    setDecExpansionIter1Output(decryptOutputs["expansionIter1Output"]);
    setDecExpXORKey1Iter1Output(decryptOutputs["expXORKey1Iter1Output"]);
    setDecSboxIter1Output(decryptOutputs["sboxIter1Output"]);
    setDecPerm4Iter1Output(decryptOutputs["perm4Iter1Output"]);
    setDecLeftXORPerm4Iter1Output(decryptOutputs["leftXORPerm4Iter1Output"]);
    setDecFk1Output(decryptOutputs["fk1Output"]);
    setDecSwapOutput(decryptOutputs["swapOutput"]);
    setDecL4Iter2(decryptOutputs["l4Iter2"]);
    setDecR4Iter2(decryptOutputs["r4Iter2"]);
    setDecExpansionIter2Output(decryptOutputs["expansionIter2Output"]);
    setDecExpXORKey2Iter2Output(decryptOutputs["expXORKey2Iter2Output"]);
    setDecSboxIter2Output(decryptOutputs["sboxIter2Output"]);
    setDecPerm4Iter2Output(decryptOutputs["perm4Iter2Output"]);
    setDecLeftXORPerm4Iter2Output(decryptOutputs["leftXORPerm4Iter2Output"]);
    setDecFk2Output(decryptOutputs["fk2Output"]);
    setPlainText(decryptOutputs["plainText"]);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div class="form-group w-25">
          <label for="key">Enter key:</label>
          <input
            type="text"
            class="form-control"
            id="key"
            placeholder="Enter 10 bit key:"
            onChange={(e) => setKeyValue(e.target.value)}
          />
          <button
            className="btn btn-primary mt-4"
            type="submit"
            onClick={handleKeyGenSubmit}
          >
            Submit
          </button>
        </div>
        <KeyGeneration
          keyBitsArray={keyBitsArray}
          perm10={perm10}
          perm8={perm8}
          p10Output={p10Output}
          ls1Output={ls1Output}
          key1={key1}
          ls2Output={ls2Output}
          key2={key2}
        />
        <div>
          <div class="form-group w-25">
            <label for="key1"> key1:</label>
            <input
              type="text"
              id="key1"
              placeholder="Key1:"
              value={key1}
              readOnly
            />
          </div>
          <div class="form-group w-25">
            <label for="key2">Key2:</label>
            <input
              type="text"
              id="key2"
              placeholder="Key2:"
              value={key2}
              readOnly
            />
          </div>

          <div>
            <div class="form-group w-25">
              <label for="plain-text">Enter plain text(8bits):</label>
              <input
                type="text"
                class="form-control"
                id="plain-text"
                placeholder="Enter plain text:"
                onChange={(e) => setPlainTextValue(e.target.value)}
              />
              <button
                className="btn btn-primary mt-4"
                type="submit"
                onClick={handleEncryptSubmit}
              >
                Submit
              </button>
            </div>
            <Encryption
              plainTextArray={plainTextArray}
              key1={key1}
              key2={key2}
              initialPerm={initialPerm}
              inverseIP={inverseIP}
              expansion={expansion}
              perm4={perm4}
              s0={s0}
              s1={s1}
              initialPermOutput={initialPermOutput}
              l4Iter1={l4Iter1}
              r4Iter1={r4Iter1}
              expansionIter1Output={expansionIter1Output}
              expXORKey1Iter1Output={expXORKey1Iter1Output}
              sboxIter1Output={sboxIter1Output}
              perm4Iter1Output={perm4Iter1Output}
              leftXORPerm4Iter1Output={leftXORPerm4Iter1Output}
              fk1Output={fk1Output}
              swapOutput={swapOutput}
              l4Iter2={l4Iter2}
              r4Iter2={r4Iter2}
              expansionIter2Output={expansionIter2Output}
              expXORKey2Iter2Output={expXORKey2Iter2Output}
              sboxIter2Output={sboxIter2Output}
              perm4Iter2Output={perm4Iter2Output}
              leftXORPerm4Iter2Output={leftXORPerm4Iter2Output}
              fk2Output={fk2Output}
              cipherText={cipherText}
            />
            <div class="form-group w-25">
              <label for="cipher"> Cipher Text:</label>
              <input
                type="text"
                id="cipher"
                placeholder="Key1:"
                value={cipherText}
                readOnly
              />
            </div>
          </div>
          <div>
            <div class="form-group w-25">
              <label for="cipher-text">Enter Cipher TextValue(8bits):</label>
              <input
                type="text"
                class="form-control"
                value={cipherTextValue}
                id="cipher-text"
                placeholder="Enter Cipher Text Value:"
                onChange={(e) => setCipherTextValue(e.target.value)}
              />
              <button
                className="btn btn-primary mt-4"
                type="submit"
                onClick={handleDecryptSubmit}
              >
                Submit
              </button>
            </div>
            <Decryption
              cipherTextArray={cipherTextArray}
              key1={key1}
              key2={key2}
              initialPerm={initialPerm}
              inverseIP={inverseIP}
              expansion={expansion}
              perm4={perm4}
              s0={s0}
              s1={s1}
              decinitialPermOutput={decinitialPermOutput}
              decl4Iter1={decl4Iter1}
              decr4Iter1={decr4Iter1}
              decexpansionIter1Output={decexpansionIter1Output}
              decexpXORKey1Iter1Output={decexpXORKey1Iter1Output}
              decsboxIter1Output={decsboxIter1Output}
              decperm4Iter1Output={decperm4Iter1Output}
              decleftXORPerm4Iter1Output={decleftXORPerm4Iter1Output}
              decfk1Output={decfk1Output}
              decswapOutput={decswapOutput}
              decl4Iter2={decl4Iter2}
              decr4Iter2={decr4Iter2}
              decexpansionIter2Output={decexpansionIter2Output}
              decexpXORKey2Iter2Output={decexpXORKey2Iter2Output}
              decsboxIter2Output={decsboxIter2Output}
              decperm4Iter2Output={decperm4Iter2Output}
              decleftXORPerm4Iter2Output={decleftXORPerm4Iter2Output}
              decfk2Output={decfk2Output}
              plainText={plainText}
            />

            <div class="form-group w-25">
              <label for="plain">Plain text:</label>
              <input
                type="text"
                id="plain"
                placeholder="Key1:"
                value={plainText}
                readOny
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
