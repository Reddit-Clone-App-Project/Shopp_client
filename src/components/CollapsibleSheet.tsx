// CollapsibleSheet.tsx
import React from 'react';
import { useCollapse } from 'react-collapsed';
import CartSummary from './CartSummary'; // Import the CartSummary component

interface CollapsibleSheetProps {
  imageSrc: string;
  imageAlt: string;
}

const CollapsibleSheet: React.FC<CollapsibleSheetProps> = ({
  imageSrc,
  imageAlt,
}) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="collapsible-sheet-container">
      {/* The image acts as the trigger for the collapsible sheet */}
      <img
        src={imageSrc}
        alt={imageAlt}
        {...getToggleProps()}
        style={{ cursor: 'pointer', width: '50px', height: '50px' }} // Basic image styling
        aria-expanded={isExpanded} // Accessibility: indicate expanded state
        aria-controls="cart-summary-collapse" // Accessibility: link to collapsed content
      />

      <section {...getCollapseProps({ id: 'cart-summary-collapse' })}>
        <div className="collapsible-content">
          <CartSummary /> {/* Render CartSummary directly without any props */}
        </div>
      </section>
    </div>
  );
};

export default CollapsibleSheet;
