import { useSpeechSynthesis } from "react-speech-kit";

let oldtext = "";

export const SpeakVit = ({text = ""}) => {
  const { speak, voices } = useSpeechSynthesis();
  
  if ((text != "") && (oldtext != text)) {
    speak({
      text: text,
      voice: voices[17],
      rate: 1.1,
      pitch: 1.2,
    });
   
    oldtext = text;
  }

  return true;
};
