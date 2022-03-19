import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from 'react-moralis';
import abi from '../../artifacts/contracts/Dex.sol/Dex.json';

//function buildOptions(fName:string, )
function OrderBook() {
  const {
    authenticate,
    isAuthenticated,
    account,
    logout,
    Moralis,
    isWeb3Enabled,
  } = useMoralis();

  async function getTokens() {
    console.log('isWeb3Enabled', isWeb3Enabled);

    if (isWeb3Enabled) {
      const options = {
        contractAddress: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        functionName: 'getTokens',
        abi: abi,
      };
      await Moralis.executeFunction(options);
    }
  }
  const { native } = useMoralisWeb3Api();
  const options = {
    address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    function_name: 'getTokens',
    abi: abi,
  };
  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...options },
  );
  return (
    <div>
      OrderBook
      <div>
        <div>
          <button
            onClick={() => {
              fetch({ params: options });
            }}
          >
            Fetch data
          </button>
          {data && <pre>{JSON.stringify(data)}</pre>}
        </div>
      </div>
    </div>
  );
}

export default OrderBook;
