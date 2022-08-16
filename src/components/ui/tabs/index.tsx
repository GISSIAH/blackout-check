import { FC, PropsWithChildren, ReactNode, useState } from "react";
import { Tab as TabPrimitive } from "@headlessui/react";
import clsx from "clsx";
import { motion } from "framer-motion";

type KeyProp = {
  key?: any | null;
  className?: string;
};

export const Tab: FC<PropsWithChildren<KeyProp>> = ({ children, key }) => {
  return (
    <TabPrimitive
      key={key}
      className={({ selected }) =>
        clsx(
          "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
          selected
            ? "bg-white shadow"
            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
        )
      }
    >
      {children}
    </TabPrimitive>
  );
};

export const TabContent: FC<PropsWithChildren<KeyProp>> = ({
  children,
  key,
  className,
}) => {
  return (
    <TabPrimitive.Panel
      key={key}
      className={clsx("rounded-xl bg-white p-3", "", className)}
      as={motion.div}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </TabPrimitive.Panel>
  );
};

interface TabContentProps {
  classNames?: string;
  panelClassNames?: string;
  tabs: ReactNode[];
}

const Tabs: FC<PropsWithChildren<TabContentProps>> = ({
  children,
  tabs,
  classNames,
  panelClassNames,
}) => {
  return (
    <TabPrimitive.Group>
      <TabPrimitive.List
        className={clsx(
          "flex space-x-1 rounded-xl bg-blue-900/20 p-1",
          classNames
        )}
      >
        {tabs}
      </TabPrimitive.List>
      <TabPrimitive.Panels className={clsx("mt-2", panelClassNames)}>
        {children}
      </TabPrimitive.Panels>
    </TabPrimitive.Group>
  );
};

export default Tabs;
