import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';

// ==================== CONTEXT API IMPLEMENTATION ====================

// Cart Context - Global state management for shopping cart
const CartContext = createContext();

// Reducer function to manage cart state transitions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If exists, increment quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      // If new item, add with quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    default:
      return state;
  }
};

// Cart Provider Component - Wraps app with cart context
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Action creators for cart operations
  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Computed values - demonstrating derived state
  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context - demonstrates hook composition
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// ==================== CUSTOM HOOKS ====================

// Custom hook for API data fetching - demonstrates useEffect patterns
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock data for demonstration - in a real app, this would be an API call
        const mockProducts = [
          {
            id: 1,
            title: "iPhone 14 Pro",
            price: 999.99,
            description: "Latest Apple smartphone with advanced camera system and A16 Bionic chip",
            category: "electronics",
            image: "📱",
            rating: { rate: 4.5, count: 150 }
          },
          {
            id: 2,
            title: "MacBook Air M2",
            price: 1199.99,
            description: "Lightweight laptop with M2 chip for professional work and creative tasks",
            category: "electronics",
            image: "💻",
            rating: { rate: 4.8, count: 89 }
          },
          {
            id: 3,
            title: "AirPods Pro",
            price: 249.99,
            description: "Wireless earbuds with active noise cancellation and spatial audio",
            category: "electronics",
            image: "🎧",
            rating: { rate: 4.6, count: 203 }
          },
          {
            id: 4,
            title: "iPad Pro 12.9",
            price: 799.99,
            description: "Professional tablet with M2 chip for creative work and productivity",
            category: "electronics",
            image: "📱",
            rating: { rate: 4.7, count: 156 }
          },
          {
            id: 5,
            title: "Apple Watch Series 8",
            price: 399.99,
            description: "Smart watch with health monitoring, fitness tracking, and crash detection",
            category: "electronics",
            image: "⌚",
            rating: { rate: 4.4, count: 98 }
          },
          {
            id: 6,
            title: "Gaming Headset Pro",
            price: 129.99,
            description: "High-quality headset with 7.1 surround sound for gaming and streaming",
            category: "accessories",
            image: "🎮",
            rating: { rate: 4.3, count: 67 }
          },
          {
            id: 7,
            title: "Wireless Mouse",
            price: 79.99,
            description: "Ergonomic wireless mouse with precision tracking and long battery life",
            category: "accessories",
            image: "🖱️",
            rating: { rate: 4.2, count: 134 }
          },
          {
            id: 8,
            title: "USB-C Hub",
            price: 49.99,
            description: "Multi-port USB-C hub with HDMI, USB 3.0, and card reader support",
            category: "accessories",
            image: "🔌",
            rating: { rate: 4.1, count: 87 }
          }
        ];

        // Simulate network delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProducts(mockProducts);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once when component mounts

  return { products, loading, error };
};

// Custom hook for search and filtering - demonstrates stateful logic encapsulation
const useProductFilter = (products) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // useMemo prevents unnecessary recalculations when other state changes
  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredProducts
  };
};

// ==================== UI COMPONENTS ====================

// Loading Spinner Component - demonstrates conditional rendering
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    gap: '1rem'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #007bff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{ 
      color: '#666', 
      fontSize: '1.2rem',
      fontWeight: '500'
    }}>
      Loading awesome products...
    </p>
  </div>
);

// Error Message Component - demonstrates error state handling
const ErrorMessage = ({ message, onRetry }) => (
  <div style={{
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#fee',
    border: '2px solid #fcc',
    borderRadius: '10px',
    margin: '2rem auto',
    maxWidth: '500px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }}>
    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
    <p style={{ 
      color: '#c33', 
      fontSize: '1.2rem', 
      marginBottom: '1.5rem',
      fontWeight: '500'
    }}>
      {message}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '500',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        🔄 Try Again
      </button>
    )}
  </div>
);

// Search Bar Component - demonstrates controlled components and event handling
const SearchBar = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e9ecef'
  }}>
    <h3 style={{ 
      margin: 0, 
      color: '#495057',
      fontSize: '1.1rem',
      fontWeight: '600'
    }}>
      🔍 Find Your Perfect Tech
    </h3>
    
    <div style={{
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
      <input
        type="text"
        placeholder="Search by name or description..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          flex: '2',
          minWidth: '250px',
          padding: '0.875rem',
          border: '2px solid #dee2e6',
          borderRadius: '8px',
          fontSize: '1rem',
          transition: 'border-color 0.2s ease',
          outline: 'none'
        }}
        onFocus={(e) => e.target.style.borderColor = '#007bff'}
        onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
      />
      
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{
          flex: '1',
          minWidth: '150px',
          padding: '0.875rem',
          border: '2px solid #dee2e6',
          borderRadius: '8px',
          fontSize: '1rem',
          backgroundColor: 'white',
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        <option value="all">🛍️ All Categories</option>
        <option value="electronics">📱 Electronics</option>
        <option value="accessories">🎧 Accessories</option>
      </select>
    </div>
  </div>
);

// Product Card Component - demonstrates props usage and event handling
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Async function to handle add to cart with realistic loading state
  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate brief loading state for better user experience
    await new Promise(resolve => setTimeout(resolve, 400));
    
    addToCart(product);
    setIsAdding(false);
  };

  return (
    <div style={{
      border: '1px solid #e9ecef',
      borderRadius: '12px',
      padding: '1.5rem',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      height: 'fit-content'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
      e.currentTarget.style.borderColor = '#007bff';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      e.currentTarget.style.borderColor = '#e9ecef';
    }}>
      
      {/* Product Image */}
      <div style={{
        fontSize: '5rem',
        textAlign: 'center',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        {product.image}
      </div>
      
      {/* Product Title */}
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        marginBottom: '0.75rem',
        color: '#212529',
        lineHeight: '1.3'
      }}>
        {product.title}
      </h3>
      
      {/* Product Description */}
      <p style={{
        color: '#6c757d',
        fontSize: '0.95rem',
        marginBottom: '1.5rem',
        lineHeight: '1.5',
        minHeight: '3em'
      }}>
        {product.description}
      </p>
      
      {/* Price and Rating Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #f1f3f4'
      }}>
        <span style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#28a745'
        }}>
          ${product.price}
        </span>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.9rem',
          color: '#495057',
          backgroundColor: '#fff3cd',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px'
        }}>
          <span>⭐</span>
          <span style={{ fontWeight: '600' }}>{product.rating.rate}</span>
          <span style={{ color: '#6c757d' }}>({product.rating.count})</span>
        </div>
      </div>
      
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: isAdding ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: isAdding ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          transform: isAdding ? 'scale(0.98)' : 'scale(1)'
        }}
        onMouseEnter={(e) => {
          if (!isAdding) {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.transform = 'scale(1.02)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isAdding) {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.transform = 'scale(1)';
          }
        }}
      >
        {isAdding ? '⏳ Adding...' : '🛒 Add to Cart'}
      </button>
    </div>
  );
};

// Product Grid Component - demonstrates component composition and responsive design
const ProductGrid = ({ products }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
    padding: '1rem 0'
  }}>
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

// Cart Icon Component - demonstrates context usage and computed state
const CartIcon = ({ onToggleCart }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={onToggleCart}
      style={{
        position: 'relative',
        background: 'none',
        border: '2px solid rgba(255,255,255,0.3)',
        borderRadius: '8px',
        fontSize: '1.5rem',
        cursor: 'pointer',
        padding: '0.75rem',
        color: 'white',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
        e.target.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.transform = 'scale(1)';
      }}
    >
      🛒
      {totalItems > 0 && (
        <span style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          backgroundColor: '#dc3545',
          color: 'white',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          border: '2px solid white',
          animation: totalItems > 0 ? 'bounce 0.5s ease' : 'none'
        }}>
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
};

// Cart Item Component - demonstrates props and complex event handling
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1.5rem',
      borderBottom: '1px solid #e9ecef',
      backgroundColor: 'white',
      transition: 'background-color 0.2s ease'
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}>
      
      {/* Product Image */}
      <div style={{
        fontSize: '2.5rem',
        padding: '0.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        {item.image}
      </div>
      
      {/* Product Details */}
      <div style={{ flex: 1 }}>
        <h4 style={{ 
          margin: 0, 
          fontSize: '1.1rem',
          fontWeight: '600',
          color: '#212529',
          marginBottom: '0.25rem'
        }}>
          {item.title}
        </h4>
        <p style={{ 
          margin: 0, 
          color: '#28a745', 
          fontSize: '1rem',
          fontWeight: '600'
        }}>
          ${item.price} each
        </p>
      </div>
      
      {/* Quantity Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        backgroundColor: '#f8f9fa',
        padding: '0.5rem',
        borderRadius: '8px'
      }}>
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          style={{
            width: '36px',
            height: '36px',
            border: '2px solid #dee2e6',
            backgroundColor: 'white',
            cursor: 'pointer',
            borderRadius: '6px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#6c757d',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#007bff';
            e.target.style.color = '#007bff';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#dee2e6';
            e.target.style.color = '#6c757d';
          }}
        >
          −
        </button>
        
        <span style={{
          minWidth: '50px',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          color: '#212529'
        }}>
          {item.quantity}
        </span>
        
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          style={{
            width: '36px',
            height: '36px',
            border: '2px solid #dee2e6',
            backgroundColor: 'white',
            cursor: 'pointer',
            borderRadius: '6px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#6c757d',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#28a745';
            e.target.style.color = '#28a745';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#dee2e6';
            e.target.style.color = '#6c757d';
          }}
        >
          +
        </button>
      </div>
      
      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: '600',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
      >
        🗑️ Remove
      </button>
    </div>
  );
};

// Cart Sidebar Component - demonstrates conditional rendering and complex layouts
const CartSidebar = ({ isOpen, onClose }) => {
  const { items, getTotalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '450px',
      maxWidth: '90vw',
      height: '100vh',
      backgroundColor: 'white',
      boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease'
    }}>
      
      {/* Cart Header */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '2px solid #e9ecef',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div>
          <h2 style={{ margin: 0, color: '#212529', fontSize: '1.5rem' }}>
            🛒 Shopping Cart
          </h2>
          <p style={{ margin: '0.25rem 0 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: '2px solid #dee2e6',
            borderRadius: '8px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#6c757d',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#dc3545';
            e.target.style.color = '#dc3545';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#dee2e6';
            e.target.style.color = '#6c757d';
          }}
        >
          ✕
        </button>
      </div>
      
      {/* Cart Items */}
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        backgroundColor: '#ffffff'
      }}>
        {items.length === 0 ? (
          <div style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            color: '#6c757d'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛍️</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>
              Your cart is empty
            </h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              Add some awesome products to get started!
            </p>
          </div>
        ) : (
          items.map(item => (
            <CartItem key={item.id} item={item} />
          ))
        )}
      </div>
      
      {/* Cart Footer */}
      {items.length > 0 && (
        <div style={{
          padding: '1.5rem',
          borderTop: '2px solid #e9ecef',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <span style={{ 
              fontSize: '1.3rem', 
              fontWeight: 'bold',
              color: '#212529'
            }}>
              Total:
            </span>
            <span style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              color: '#28a745'
            }}>
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <button
              onClick={clearCart}
              style={{
                flex: 1,
                padding: '1rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6268'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
            >
              🗑️ Clear Cart
            </button>
            
            <button
              style={{
                flex: 2,
                padding: '1rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#218838';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#28a745';
                e.target.style.transform = 'scale(1)';
              }}
            >
              💳 Checkout (${getTotalPrice().toFixed(2)})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Header Component - demonstrates composition and responsive design
const Header = ({ onToggleCart }) => (
  <header style={{
    background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
    color: 'white',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  }}>
    <div>
      <h1 style={{
        margin: 0,
        fontSize: '2rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🏪 TechStore
      </h1>
      <p style={{
        margin: '0.25rem 0 0 0',
        fontSize: '1rem',
        opacity: 0.9,
        fontWeight: '300'
      }}>
        Your one-stop tech destination ✨
      </p>
    </div>
    
    <CartIcon onToggleCart={onToggleCart} />
  </header>
);

// Main TechStore Component - demonstrates component orchestration
const TechStore = () => {
  // Local state for UI interactions
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Custom hooks for data management and filtering
  const { products, loading, error } = useProducts();
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredProducts
  } = useProductFilter(products);

  // Event handlers for cart interactions
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Global CSS Animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translate3d(0,0,0);
            }
            40%, 43% {
              transform: translate3d(0, -8px, 0);
            }
            70% {
              transform: translate3d(0, -4px, 0);
            }
            90% {
              transform: translate3d(0, -2px, 0);
            }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          * {
            box-sizing: border-box;
          }
        `}
      </style>
      
      {/* Header */}
      <Header onToggleCart={toggleCart} />
      
      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
        animation: 'fadeIn 0.5s ease'
      }}>
        
        {/* Search and Filter Section */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        {/* Loading State */}
        {loading && <LoadingSpinner />}
        
        {/* Error State */}
        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}
        
        {/* Products Display */}
        {!loading && !error && (
          <>
            {/* Results Summary */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                color: '#495057',
                fontSize: '1.1rem',
                fontWeight: '500'
              }}>
                📊 Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
                {searchTerm && (
                  <span style={{ color: '#007bff', marginLeft: '0.5rem' }}>
                    for "{searchTerm}"
                  </span>
                )}
              </div>
              
              {selectedCategory !== 'all' && (
                <div style={{
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  {selectedCategory === 'electronics' ? '📱 Electronics' : '🎧 Accessories'}
                </div>
              )}
            </div>
            
            {/* Products Grid or No Results */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                margin: '2rem 0'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                <h3 style={{ 
                  color: '#495057', 
                  marginBottom: '1rem',
                  fontSize: '1.5rem'
                }}>
                  No products found
                </h3>
                <p style={{ 
                  color: '#6c757d', 
                  fontSize: '1.1rem',
                  marginBottom: '2rem'
                }}>
                  Try adjusting your search terms or browse all categories
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  🔄 Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
      
      {/* Overlay for cart sidebar */}
      {isCartOpen && (
        <div
          onClick={closeCart}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease'
          }}
        />
      )}
      
      {/* Footer */}
      <footer style={{
        backgroundColor: '#343a40',
        color: 'white',
        textAlign: 'center',
        padding: '2rem',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
            🏪 TechStore - Demo React Application
          </h3>
          <p style={{ 
            margin: 0, 
            opacity: 0.8,
            fontSize: '1rem'
          }}>
            Built with React Hooks, Context API, and modern web standards ⚛️
          </p>
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}>
            <strong>Learning Concepts Demonstrated:</strong> Props, State, useEffect, Context API, Custom Hooks, Event Handling
          </div>
        </div>
      </footer>
    </div>
  );
};

// Root App Component - demonstrates Context Provider pattern
const FinalTechStore = () => {
  return (
    <CartProvider>
      <TechStore />
    </CartProvider>
  );
};

// Export for CodePen
export default FinalTechStore;