import { Blockchain } from '../store/entities/types';


export const formatBlockchainToString = (blockchain: Blockchain): string | null => {
  switch (blockchain) {
    case 'ethereum':
      return 'Ethereum';
    case 'eos':
      return 'EOS';
    default:
      return null;
  }
};
