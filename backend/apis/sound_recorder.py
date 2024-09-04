import speech_recognition as sr

# Initialize the recognizer
recognizer = sr.Recognizer()

# Open a text file in write mode
try:
    print("Recording... Press Ctrl+C to stop.")

    while True:
        # Use the microphone as source for input
        with sr.Microphone() as source:
            # Adjust for ambient noise
            recognizer.adjust_for_ambient_noise(source)

            # Listen for the first phrase and extract the audio
            print("Listening... 👂")
            audio = recognizer.listen(source)

            try:
                # Recognize the speech in Persian
                print(f"Recognizing...")
                text = recognizer.recognize_google(audio, language="fa-IR")
                print(f"Text: {text}")

                print(f"Writing....")
                with open("recognized_text.txt", "a", encoding="utf-8") as file:
                    file.write(text + ' ')

            except sr.UnknownValueError:
                print("Sorry, I could not understand the audio.")
            except sr.RequestError:
                print("Could not request results; check your internet connection.")

except KeyboardInterrupt:
    # Gracefully exit on Ctrl+C
    print("\nRecording stopped. Text saved to recognized_text.txt")
