// This is a combobox input for selecting categories and entering the input.
import { useState, useRef, useEffect, useId, FC, KeyboardEvent, ChangeEvent} from 'react'
import ChevronDown from '../assets/chevron-down.svg';

interface ComboboxProps {
    options: string[];
    placeholder?: string;
    onSelect: (value: string) => void;
}

const CategoryInput: FC<ComboboxProps> = ({ options, placeholder, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    // --- REFS ---
    // Ref for the main container to detect outside clicks.
    const containerRef = useRef<HTMLDivElement>(null);
    // Ref for the listbox to scroll to the highlighted item.
    const listboxRef = useRef<HTMLUListElement>(null);

    // --- HOOKS ---
    // Generate a unique ID for ARIA attributes for accessibility.
    const comboboxId = useId();

    // Handle clicks outside the combobox to close it 
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(containerRef.current && !containerRef.current.contains(event.target as Node)){
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Scroll to the highlighted item into view
    useEffect(() => {
        if(highlightedIndex !== -1 && listboxRef.current){
            const highlightedItem = listboxRef.current.querySelector(`[data-index='${highlightedIndex}']`);
            highlightedItem?.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightedIndex]);

    // --- DATA & DERIVED STATE ---
    // Filter options based on the input value.
    const filteredOptions = options.filter(option => 
        option.toLowerCase().includes(inputValue.toLowerCase())
    );

    // --- EVENT HANDLERS ---
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsOpen(true); // Open the dropdown when input changes
        setHighlightedIndex(-1); // Reset highlighted index on input change
    };

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    const selectOption = (option: string) => {
        setInputValue(option);
        setIsOpen(false);
        onSelect(option); // Call the onSelect callback with the selected value
        setHighlightedIndex(-1); // Reset highlighted index after selection
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(!isOpen) return; // Do nothing if the dropdown is not open
        
        switch (e.key) {
            case 'Escape':
                setIsOpen(false);
                break;
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
                break;
            case 'Enter':
                e.preventDefault();
                if(highlightedIndex !== -1 && filteredOptions[highlightedIndex]) {
                    selectOption(filteredOptions[highlightedIndex]);
                }
                break;
        }
    }

    return (
        <div className='relative' ref={containerRef}>
            <div className='relative'>
                <input 
                    id={comboboxId}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className='w-full pl-4 pr-12 py-3 border border-slate-400 text-slate-400 rounded-md focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all duration-200'
                    role='combobox'
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-controls={`${comboboxId}-listbox`}
                    aria-activedescendant={highlightedIndex !== -1 ? `${comboboxId}-option-${highlightedIndex}` : undefined}
                />
                <button
                    type='button'
                    onClick={() => setIsOpen(!isOpen)}
                    className='absolute inset-y-0 right-0 flex items-center px-4 focus:outline-none'
                    tabIndex={-1} 
                >
                    <img src={ChevronDown} className={`w-4 cursor-pointer transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}/>
                </button>
            </div>
            {isOpen && (
                <ul
                    ref={listboxRef}
                    id={`${comboboxId}-listbox`}
                    role="listbox"
                    className='absolute z-10 w-full mt-2 bg-slate-700 border border-slate-400 rounded-md max-h-60 overflow-y-auto'
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <li
                                key={option}
                                id={`${comboboxId}-option-${index}`}
                                role='option'
                                aria-selected={index === highlightedIndex}
                                data-index={index}
                                className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${index === highlightedIndex ? 'bg-slate-500 text-slate-800' : 'hover:bg-slate-400'}`}
                            >
                                {option}
                            </li>
                        ))
                    ) : (
                        <li className='px-4 py-3 text-gray-500 italic'>No results found</li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default CategoryInput