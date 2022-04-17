import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
function History() {
  const [tabIndex, setTabIndex] = useState(0);
  const selected = 'border-b-2 text-white border-slate-400';
  const notSelected =
    'border-b-2 hover:border-white border-slate-700 hover:text-slate-400 ';
  return (
    <div className="flex px-2 text-lg text-white">
      <Tabs
        isLazy
        variant={'unstyled'}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab className={tabIndex === 0 ? selected : notSelected}>
            Open Orders
          </Tab>
          <Tab className={tabIndex === 1 ? selected : notSelected}>
            Order History
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default History;
