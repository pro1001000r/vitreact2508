import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Col, Row } from "react-bootstrap";

const ScanerVit = ({ setScan, setShow }) => {
  const [isEnabled, setEnabled] = useState(true);
  const [qrMessage, setQrMessage] = useState("");
  const [qrErr, setQrErr] = useState("");

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 200, height: 200 } };

    const html5QrCode = new Html5Qrcode("qrCodeContainer");

    const qrScanerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then().catch(setQrErr);
      }
    };

    const qrCodeSuccess = (decodedText) => {
      setQrMessage(decodedText);
      setScan(decodedText);
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
        .start({ facingMode: "environment" }, config, qrCodeSuccess)
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
