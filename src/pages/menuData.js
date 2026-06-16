export const menuItems = [
  {
    name: 'Nirvana Breakfast Platter',
    category: 'Breakfast',
    price: 420,
    description: 'Toast, eggs, seasonal fruit, hash browns, and fresh juice.'
  },
  {
    name: 'South Indian Tiffin Set',
    category: 'Breakfast',
    price: 360,
    description: 'Idli, dosa, vada, sambar, and coconut chutney.'
  },
  {
    name: 'Paneer Butter Masala Combo',
    category: 'Main Course',
    price: 520,
    description: 'Creamy paneer curry served with rice, naan, and salad.'
  },
  {
    name: 'Hyderabadi Chicken Biryani',
    category: 'Main Course',
    price: 580,
    description: 'Aromatic basmati rice layered with spiced chicken and raita.'
  },
  {
    name: 'Classic Club Sandwich',
    category: 'Snacks',
    price: 390,
    description: 'Triple-layer sandwich with fries and house dip.'
  },
  {
    name: 'Masala Tea Service',
    category: 'Beverages',
    price: 180,
    description: 'Freshly brewed masala tea with biscuits.'
  },
  {
    name: 'Fresh Lime Soda',
    category: 'Beverages',
    price: 160,
    description: 'Sweet, salted, or mixed lime soda served chilled.'
  },
  {
    name: 'Extra Towels and Toiletries',
    category: 'Guest Services',
    price: 0,
    description: 'Request fresh towels, dental kit, shaving kit, or toiletries.'
  }
];

export function normalizeMenuItems(data) {
  const items = Array.isArray(data) ? data : data?.items || data?.menuItems || data?.data || [];

  return items
    .map((item) => ({
      id: item.id || item._id || item.item_id || item.name,
      name: item.name || item.item_name || '',
      category: item.category || item.type || 'Room Service',
      price: Number(item.price || item.amount || 0),
      description: item.description || item.details || ''
    }))
    .filter((item) => item.name);
}
