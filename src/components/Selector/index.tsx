import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { nativeToken } from '../../../config';
import { Select } from '../../../type';

function Selector({ user, tokens, selectToken }: Select) {
  const pair = user?.selectedToken.ticker + '/' + nativeToken;

  return (
    <>
      <div className="flex pt-1">
        <Popover>
          <PopoverTrigger>
            <a className="flex text-xl text-white cursor-pointer lg:text-2xl">
              {pair}
              <IoMdArrowDropdown />
            </a>
          </PopoverTrigger>

          <PopoverContent
            className="flex ml-5 text-white bg-slate-800 border-slate-400"
            bg="slate-800"
          >
            <PopoverHeader>{user?.selectedToken.ticker}</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />

            <PopoverBody>
              {tokens?.map((token: any) => {
                return <></>;
              })}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default Selector;
