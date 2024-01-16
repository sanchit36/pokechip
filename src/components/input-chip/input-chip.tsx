import { ReactNode, useRef, useState } from "react";
import { filterArrayBySearchString } from "../../utils/filter-by-search-string";
import { findDifference } from "../../utils/find-difference";

import "./item-chip.css";

interface InputChipProps<T> {
  keyIdenifier: keyof T;
  dataSource: T[];
  renderChip: (
    item: T,
    highlightedKey: string,
    onClose: () => void,
    onFocus: () => void
  ) => ReactNode;
  renderDropdowmItem: (item: T, onSelect: () => void) => ReactNode;
  onClose?: (item: T) => void;
  onSelect?: (item: T) => void;
  placeholder?: string;
}

const InputChip = <T,>({
  keyIdenifier,
  dataSource,
  onClose,
  onSelect,
  renderChip,
  renderDropdowmItem,
  placeholder,
}: InputChipProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [dropdownItems, setDropdownItems] = useState<T[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [highlightedKey, setHighlightedKey] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (searchValue: string) => {
    setSearchValue(searchValue);

    if (searchValue) {
      const newArray = findDifference(dataSource, selectedItems, keyIdenifier);
      const filteredArray = filterArrayBySearchString(
        newArray,
        keyIdenifier,
        searchValue
      );
      setDropdownItems(filteredArray);
    }
  };

  const handleOnSelect = (item: T) => {
    setSelectedItems((items) => [...items, item]);
    setSearchValue("");
    setDropdownItems([]);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 100);
    onSelect?.(item);
  };

  const handleOnClose = (item: T) => {
    handleDeleteItem(item);
    onClose?.(item);
  };

  const handleOnBlur = () => {
    setDropdownItems([]);
    setHighlightedKey("");
  };

  const handleOnFocus = () => {
    handleOnChange(searchValue);
    setHighlightedKey("");
  };

  const handleDeleteItem = (item: T) => {
    setSelectedItems((items) =>
      items.filter((i) => i[keyIdenifier] !== item[keyIdenifier])
    );
  };

  const handleHighlightLastElement = () => {
    if (selectedItems.length === 0) {
      return;
    }

    const dummyItems = [...selectedItems];
    let lastItem = dummyItems.pop();
    if (lastItem) {
      if (!highlightedKey) {
        setHighlightedKey(`${lastItem[keyIdenifier]}`);
      } else {
        inputRef.current?.focus();
        handleDeleteItem(lastItem);
        lastItem = dummyItems.pop();
        setHighlightedKey(lastItem ? `${lastItem[keyIdenifier]}` : "");
      }
    } else {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Backspace" && !searchValue && selectedItems.length > 0) {
      handleHighlightLastElement();
    }
  };

  return (
    <div
      className="item-chip"
      onKeyDown={handleKeyDown}
      tabIndex={1}
      onBlur={() => {
        setHighlightedKey("");
      }}
    >
      {selectedItems?.map((item) =>
        renderChip(
          item,
          highlightedKey,
          () => handleOnClose(item),
          () => setHighlightedKey(`${item[keyIdenifier]}`)
        )
      )}

      <div className="item-chip__input-container">
        <input
          ref={inputRef}
          className="item-chip__input"
          value={searchValue}
          onChange={(e) => handleOnChange(e.target.value)}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          placeholder={placeholder}
          autoFocus
        />

        <div className="item-chip__dropdown">
          {dropdownItems.map((item) =>
            renderDropdowmItem(item, () => handleOnSelect(item))
          )}
        </div>
      </div>
    </div>
  );
};

export default InputChip;
