import toast, { Toaster } from 'react-hot-toast';
import { useState, FormEvent, ChangeEvent } from 'react';
import css from './searchBar.module.css';

interface searchBarProps {
  onSubmit: (searchedValue: string) => void;
}

const SearchBar: React.FC<searchBarProps> = ({ onSubmit }) => {
  const [enteredValue, setEnteredValue] = useState<string>('');

  const notify = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimSearchQuery = enteredValue.trim();

    if (trimSearchQuery === '') {
      toast('Please, enter search word!');
      return;
    }

    onSubmit(enteredValue);
    setEnteredValue('');
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={enteredValue}
          onChange={notify}
          className={css.input}
        />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#fafafa',
              background: 'red',
            },
          }}
        />
      </form>
    </header>
  );
};

export default SearchBar;
