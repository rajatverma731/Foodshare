import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBeforeDelete?: number;
  delayBeforeTyping?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  strings, 
  // Adjusted defaults for a more natural feel
  typingSpeed = 40,       // 100ms: Human-like typing speed
  deletingSpeed = 30,      // 50ms: Deleting is usually faster than typing
  delayBeforeDelete = 30000, // 3 seconds: Enough time to read the sentence
  delayBeforeTyping = 30000 // 1 second: Brief pause before starting a new string
}) => {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const tick = () => {
      const currentString = strings[stringIndex];

      // 1. Determine the next character state
      if (isDeleting) {
        setText(currentString.substring(0, text.length - 1));
      } else {
        setText(currentString.substring(0, text.length + 1));
      }

      // 2. Calculate the timing for the NEXT tick
      let nextTickSpeed = isDeleting ? deletingSpeed : typingSpeed;

      // 3. Handle state transitions
      if (!isDeleting && text === currentString) {
        // String is fully typed - Wait before starting to delete
        nextTickSpeed = delayBeforeDelete; 
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        // String is fully deleted - Wait before typing the next string
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
        nextTickSpeed = delayBeforeTyping;
      }

      timeout = setTimeout(tick, nextTickSpeed);
    };

    // Initialize the loop
    timeout = setTimeout(tick, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, stringIndex, strings, typingSpeed, deletingSpeed, delayBeforeDelete, delayBeforeTyping]);

  return (
    <span className="inline-block">
      {text}
      <span className="animate-pulse text-primary font-bold ml-[2px] border-l-2 border-primary">
        &nbsp;
      </span>
    </span>
  );
};

export default Typewriter;