import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = function ({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const inputOnChangeHandler = e => {
    setInputValue(e.target.value);
  };

  return (
    <header className={css.searchbar}>
      <form
        className={css.searchform}
        onSubmit={e => {
          e.preventDefault();
          setInputValue('');
          onSubmit(inputValue);
        }}
      >
        <button type="submit" className={css[`searchform-button`]}>
          <span className={css[`searchform-button-label`]}>Search</span>
        </button>

        <input
          className={css[`searchform-input`]}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={inputOnChangeHandler}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
