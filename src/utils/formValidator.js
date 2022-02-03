import {useEffect, useState} from 'react';

function useInput(initialValue, isOpen) {
  const [value, setValue] = useState(initialValue);
  const isDirtyInput = initialValue === '' ? false : true;
  const [isCorrect, setIsCorrect] = useState(isDirtyInput);
  const [error, setError] = useState('');
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(!isDirtyInput);

  function handleChange(e) {
    if (typeof e === 'object') {
      const input = e.target;
      handleError(input);
      setValue(input.value);
    } else {
      setValue(e);
    }
  }

  function handleError(input) {
    setIsCorrect(input.validity.valid);
    setError(input.validationMessage)
  }

  useEffect(() => {
    if (!isOpen) {
      setError('');
      setIsCorrect(isDirtyInput);
      setValue(initialValue)
    }
  }, [isOpen,isDirtyInput, initialValue])

  useEffect(() => {
    isCorrect ? setDisabledSubmitButton(false) : setDisabledSubmitButton(true);
  }, [isCorrect]);

  return {
    value,
    handleChange,
    handleError,
    isCorrect,
    error,
    disabledSubmitButton
  }
}

export default useInput