import React, { useEffect, useState } from "react";
import { Html5Qrcode,Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Col, Row } from "react-bootstrap";

const ScanerVit = ({ setScan, setShow }) => {
  const [isEnabled, setEnabled] = useState(true);
  const [qrMessage, setQrMessage] = useState("");
  const [qrErr, setQrErr] = useState("");

  useEffect(() => {
    const config = {
      fps: 5,
      qrbox: { width: 250, height: 250 },
      formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        // Добавьте другие нужные вам форматы
      ],
    };

    const html5QrCode = new Html5Qrcode("qrCodeContainer");

    const qrScanerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then().catch(setQrErr);
      }
    };

    const qrCodeSuccess = (decodedText) => {
      setScan(decodedText);

      setQrMessage(decodedText);

      setQrErr("");
      if (setShow) {
        setShow(false);
      }
      // setEnabled(false);
    };

    const qrCodeErr = (err) => {
      setQrErr("Не удалось подключить камеру!!!");
      setEnabled(false);
    };

    if (isEnabled) {
      html5QrCode
        .start({ facingMode: { exact: "environment" } }, config, qrCodeSuccess)
        .then((ignore) => console.log("Scaner stop"))
        .catch(qrCodeErr);
      setQrMessage("");
    } else {
      qrScanerStop();
    }

    return () => {
      qrScanerStop();
    };
  }, [isEnabled]);

  return (
    <>
      <Row>
        <Col>
          <div id="qrCodeContainer" />
        </Col>
      </Row>
      <Row>{qrMessage && <div className="text-center">{qrMessage}</div>}</Row>
      <Row>{qrErr && <div className="text-center">{qrErr}</div>}</Row>
    </>
  );
};

export default ScanerVit;
