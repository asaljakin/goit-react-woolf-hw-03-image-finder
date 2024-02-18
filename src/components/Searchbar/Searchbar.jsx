import icon from 'img/icons-search.svg';

export const Searchbar = ({ handleSubmit }) => {
  const onSubmit = event => {
    event.preventDefault();
    handleSubmit(event.target.search.value);
    event.target.search.value = '';
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
          <img src={icon} alt="search" />
        </button>
        <input
          className="SearchForm-input"
          name="search"
          type="text"
          required
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
