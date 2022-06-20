import { useEffect, useRef } from 'react';

export const usePortal = (id: string) => {
  const rootElemRef = useRef(document.createElement('div'));

  useEffect(() => {
    const parentElem = document.querySelector(`#${id}`);
    parentElem.appendChild(rootElemRef.current);

    return () => {
      rootElemRef.current.remove();
    };
  }, [id]);

  return rootElemRef.current;
};
