// debounce라는 것을 안쓰면 onChange event로 한글자 마다 백엔드랑 통신이 되어 트래픽이 무한 발썡한다.
// 이를 방지하기 위해 useDebounce라는 usehook을 만듬.
import { useState, useEffect } from 'react';

export default function useDebounce(value: string, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
