export function speak(text) {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;

    let voices = synth.getVoices();
    if (!voices.length) {
        synth.onvoiceschanged = () => speak(text);
        return;
    }

    const voice =
        voices.find(v =>
            v.name.toLowerCase().includes("female") ||
            v.name.toLowerCase().includes("girl") ||
            v.name.toLowerCase().includes("child")
        ) || voices[0];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.pitch = 1.8;
    utterance.rate = 0.60;

    synth.speak(utterance);
}
