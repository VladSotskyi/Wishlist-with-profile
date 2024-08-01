import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Upload from "../images/upload.png";
import "../style/modalMakeAWish.css";

function ModalMakeAWish(props) {
  const [currency, setCurrency] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    const symbol =
      e.target.options[e.target.selectedIndex].getAttribute("data-symbol");
    setCurrency(selectedCurrency);
    setCurrencySymbol(symbol);
  };

  return (
    <Modal
      {...props}
      size="lg"
      className="active-font"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add wish</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="makeWishModalBody" action="">
          <span className="addWishTitle">Item name</span>
          <input type="text" className="addWishInput" placeholder="Maserati" />
          <span className="addWishTitle">Estimated value</span>
          <div className="currency-input-wrapper">
            <span className="currency-symbol">{currencySymbol}</span>
            <input
              type="number"
              className="addWishInput money currency-input"
              placeholder="100"
            />
            <div className="currency-code-wrapper">
              <span className="currency-code">{currency}</span>
              <select
                className="currency-select"
                value={currency}
                onChange={handleCurrencyChange}
              >
                <option value="USD" data-symbol="$">
                  USD
                </option>
                <option value="EUR" data-symbol="€">
                  EUR
                </option>
                <option value="GBP" data-symbol="£">
                  GBP
                </option>
                <option value="JPY" data-symbol="¥">
                  JPY
                </option>
              </select>
            </div>
          </div>
          <span className="addWishTitle">Link(optional)</span>
          <input
            type="url"
            className="addWishInput link"
            placeholder="https://"
          />
          <span className="addWishTitle">Add Photo</span>
          <label htmlFor="file-upload" className="custom-file-upload">
            <img src={Upload} alt="upload" className="uploadImage" />
            Upload image
          </label>
          <input id="file-upload" type="file" />
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalMakeAWish;
