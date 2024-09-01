import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Upload from "../images/upload.png";
import "../style/modalMakeAWish.css";
import { db, storage } from "../firebase"; // Предполагается, что у вас есть правильная конфигурация
import { collection, setDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/authContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Riple } from "react-loading-indicators";

function ModalMakeAWish(props) {
  const [itemName, setItemName] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Добавляем состояние загрузки

  const { currentUser } = useAuth();

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    const symbol =
      e.target.options[e.target.selectedIndex].getAttribute("data-symbol");
    setCurrency(selectedCurrency);
    setCurrencySymbol(symbol);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file (jpeg, png, gif, etc.)");
    }
  };

  useEffect(() => {
    const validateForm = () => {
      if (
        itemName.trim() !== "" &&
        estimatedValue.trim() !== "" &&
        previewUrl !== null
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    validateForm();
  }, [itemName, estimatedValue, previewUrl]);

  const clearForm = () => {
    setItemName("");
    setEstimatedValue("");
    setCurrency("USD");
    setCurrencySymbol("$");
    setLink("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsFormValid(false); // Сбрасываем валидацию формы
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Начинаем загрузку

    // Создаём уникальный идентификатор для желания
    const wishId = doc(collection(db, "wishes")).id;
    let imageUrl = "";

    if (selectedFile) {
      // Создаем уникальное имя файла, используя wishId и оригинальное расширение файла
      const fileExtension = selectedFile.name.split(".").pop(); // Получаем расширение файла
      const uniqueFileName = `${wishId}.${fileExtension}`; // Уникальное имя файла

      // Сохраняем изображение в папку wishesImages с использованием уникального идентификатора
      const storageRef = ref(storage, `wishesImages/${uniqueFileName}`);

      try {
        const snapshot = await uploadBytes(storageRef, selectedFile);
        imageUrl = await getDownloadURL(snapshot.ref);
        console.log("Uploaded a blob or file and got URL:", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const formData = {
      uid: wishId,
      createdBy: currentUser.uid,
      itemName: itemName,
      estimatedValue: estimatedValue,
      currency: currency,
      currencySymbol: currencySymbol,
      link: link,
      photo_title: selectedFile ? selectedFile.name : "",
      imageUrl: imageUrl, // Сохраняем URL изображения
    };

    try {
      console.log("Data handled with UID: ", wishId);
      await setDoc(doc(db, "wishes", wishId), formData); // Сохраняем данные с уникальным идентификатором
      clearForm();
      props.onHide();
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false); // Завершаем загрузку
    }
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
        {loading ? (
          <div className="loading">
            <Riple color="#DD6A78" size="medium" text="" textColor="" />
          </div>
        ) : (
          <form className="makeWishModalBody" action="" onSubmit={handleSubmit}>
            <span className="addWishTitle">Item name</span>
            <input
              type="text"
              className="addWishInput"
              placeholder="Maserati"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <span className="addWishTitle">Estimated value</span>
            <div className="currency-input-wrapper">
              <span className="currency-symbol">{currencySymbol}</span>
              <input
                type="number"
                className="addWishInput money currency-input"
                placeholder="100"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
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
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <span className="addWishTitle">Add Photo</span>
            <label htmlFor="file-upload" className="custom-file-upload">
              <img src={Upload} alt="upload" className="uploadImage" />
              Upload image
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            {selectedFile && (
              <div className="file-preview">
                <img src={previewUrl} alt="preview" className="previewImage" />
                <span className="file-name">
                  Selected file: {selectedFile.name}
                </span>
              </div>
            )}
            <button
              type="submit"
              className="btn wishModalBtn"
              disabled={!isFormValid}
            >
              Submit Wish
            </button>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalMakeAWish;
