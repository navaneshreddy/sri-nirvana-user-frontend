function OrderSummary({ selectedItem, quantity, totalAmount }) {
  return (
    <aside className="summary-panel">
      <p className="section-kicker">Order Summary</p>
      {selectedItem ? (
        <>
          <div className="summary-row">
            <span>Item</span>
            <strong>{selectedItem.name}</strong>
          </div>
          <div className="summary-row">
            <span>Category</span>
            <strong>{selectedItem.category}</strong>
          </div>
          <div className="summary-row">
            <span>Quantity</span>
            <strong>{quantity}</strong>
          </div>
          <div className="summary-row">
            <span>Unit Price</span>
            <strong>Rs. {selectedItem.price}</strong>
          </div>
          <div className="summary-total">
            <span>Total Amount</span>
            <strong>Rs. {totalAmount}</strong>
          </div>
        </>
      ) : (
        <p className="muted">Choose a food or service item to see the order total.</p>
      )}
    </aside>
  );
}

export default OrderSummary;
