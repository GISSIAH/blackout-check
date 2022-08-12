import { Listbox, Transition } from "@headlessui/react";
import { FC, Fragment, PropsWithChildren, ReactNode, useState } from "react";
import {
  HiCheck as CheckIcon,
  HiSelector as SelectorIcon,
} from "react-icons/hi";
interface IProps {
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
}

export const SelectItem: FC<PropsWithChildren<{ value: string }>> = ({
  value,
  children,
}) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        `relative cursor-default select-none py-2 pl-10 pr-4 ${
          active ? "bg-amber-100 text-amber-900" : "text-gray-900"
        }`
      }
      value={value}
    >
      {({ selected }) => (
        <>
          <span
            className={`block truncate ${
              selected ? "font-medium" : "font-normal"
            }`}
          >
            {children}
          </span>
          {selected ? (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};

// TODO: Add proper placeholder styles

const Select: FC<PropsWithChildren<IProps>> = ({
  children,
  disabled,
  placeholder,
  onChange
}) => {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={(value) => {
        onChange?.(value)
        setSelected(value)
      }} disabled={disabled}>
        <div className="relative mt-1">
          <Listbox.Button
           
            className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span className="block truncate">{selected ?? placeholder}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {children}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;