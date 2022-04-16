import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
function History() {
  return (
    <div className="flex gap-6 px-2 text-lg text-white">
      <Tabs isLazy>
        <TabList>
          <Tab>
            <a className="cursor-pointer hover:text-slate-400 hover:border-b-2">
              Open Orders
            </a>
          </Tab>
          <Tab>
            <a className="cursor-pointer hover:text-slate-400 hover:border-b-2">
              Order History
            </a>
          </Tab>
        </TabList>
        <TabPanels>
          {/* initially mounted */}
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          {/* initially not mounted */}
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default History;
