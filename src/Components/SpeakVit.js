import { useSpeechSynthesis } from "react-speech-kit";
import ButtonVit from "./ButtonVit";

let oldtext = "";

export function SpeakVit (text) {
  // const { speak, voices } = useSpeechSynthesis();

  // const handleFirstClick = () => {
  //   window.speechSynthesis.onvoiceschanged = () => {
  //     const voices = window.speechSynthesis.getVoices();
  //     console.log(voices);
  //   };
  //   window.speechSynthesis.speak(new SpeechSynthesisUtterance("1234")); // Активирует аудио-контекст
  // };

  if (text != "" && oldtext != text) {
    // speak({
    //   text: text,
    //   voice: voices[17],
    //   rate: 1.1,
    //   pitch: 1.2,
    // });

    const msg = new SpeechSynthesisUtterance("Штрихкод не найден");

    // 2. Настраиваем параметры
    msg.lang = "ru-RU";
    msg.rate = 1.1; // Чуть быстрее обычного
    msg.pitch = 1.3; // Чуть более низкий голос
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);

    oldtext = text;
  }

  return true;
};
