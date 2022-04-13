import {
  Divider,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { nativeToken } from '../../../config';
import { Select } from '../../../type';

function Selector({ user, tokens, selectToken }: Select) {
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();
  function pair(ticker: string) {
    const pair = ticker + '/' + nativeToken;
    return pair;
  }
  function select(token: any) {
    if (token.ticker === user?.selectedToken.ticker) {
      toast({
        title: 'Error',
        description: 'Token already selected',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    selectToken(token);
    onClose();
  }
  const tokenList = tokens?.map((token: any) => {
    return (
      <div
        className="grid grid-cols-2 pt-1 rounded-lg cursor-pointer justify-evenly hover:bg-slate-400 hover:text-black"
        onClick={() => select(token)}
      >
        <a className="col-span-1">{token.ticker}</a>
        <a className="col-span-1">{pair(token.ticker)}</a>
      </div>
    );
  });

  return (
    <>
      <div className="flex pt-1">
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <PopoverTrigger>
            <a className="flex text-xl text-white cursor-pointer lg:text-2xl">
              {pair(user?.selectedToken.ticker)}
              <IoMdArrowDropdown />
            </a>
          </PopoverTrigger>

          <PopoverContent
            className="flex ml-5 text-white bg-slate-800 border-slate-400"
            bg="slate-800"
          >
            <PopoverHeader>{nativeToken} pairs</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />

            <PopoverBody className="mx-2 mb-1">
              <div className="grid grid-cols-2">
                <a className="col-span-1">Ticker</a>
                <a className="col-span-1">Pair</a>
              </div>
              <Divider />
              {tokenList}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default Selector;
