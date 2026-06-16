const statuses = ['Pending', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Closed'];

function OrderTimeline({ currentStatus = 'Pending' }) {
  const currentIndex = Math.max(statuses.indexOf(currentStatus), 0);

  return (
    <section className="timeline-card" aria-label="Order status timeline">
      <p className="section-kicker">Status Timeline</p>
      <div className="timeline">
        {statuses.map((status, index) => {
          const state = index < currentIndex ? 'complete' : index === currentIndex ? 'current' : 'upcoming';
          return (
            <div className={`timeline-step ${state}`} key={status}>
              <span className="timeline-dot" aria-hidden="true" />
              <div>
                <strong>{status}</strong>
                <small>{state === 'current' ? 'Current status' : state === 'complete' ? 'Completed' : 'Waiting'}</small>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default OrderTimeline;
