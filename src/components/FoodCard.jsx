function FoodCard({ item, onSelect }) {
  return (
    <article className="food-card">
      <div>
        <p className="category-label">{item.category}</p>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
      <div className="card-footer">
        <span className="price">Rs. {item.price}</span>
        {onSelect && (
          <button type="button" className="button secondary small" onClick={() => onSelect(item)}>
            Select
          </button>
        )}
      </div>
    </article>
  );
}

export default FoodCard;
