import "./Header.css";
//import { Slider } from "@material-ui/core";

function Header({ categories, choose }) {
  return (
    <nav className="product-filter">
      <h1>All products </h1>
      <div className="sort">
        <div className="collection-sort">
          <label>Filter by:</label>
          <select
            onChange={(e) => {
              choose(e.target.value);
            }}
          >
            <option value="All Categories">All Categories</option>

            {categories.map((category) => (
              <option key={category}> {category}</option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
}
export default Header;
