export type Blockchain = 'eos' | 'ethereum';

export type Address = string;

export type Platform = 'ios' | 'android' | 'windows' | 'web' | 'macos' | 'linux';

export type Type = 'dapp' | 'app' | 'token' | 'media' | 'blockchain';

export type FilterCriteria = 'platform' | 'category' | 'rank' | 'dau' | 'volume' | 'type' | 'blockchain';

export type LoadingState = 'pending' | 'done' | 'error';

export type VotingStage = 'commit' | 'reveal' | 'end';
