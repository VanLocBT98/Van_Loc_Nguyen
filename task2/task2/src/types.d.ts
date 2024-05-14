export interface ICurrency {
    currency: string;
    date: Date | string;
    price: number
}
export interface IOption {
    value: number | string;
    label: string;
    icon: string;
}
export type ITypeListCoins = IItemCoin[]

export interface IItemCoin {
    CoinInfo: CoinInfo
    ConversionInfo: ConversionInfo
}

export interface CoinInfo {
    Id: string
    Name: string
    FullName: string
    Internal: string
    ImageUrl: string
    Url: string
    Algorithm: string
    ProofType: string
    Rating: Rating
    NetHashesPerSecond: number
    BlockNumber: number
    BlockTime: number
    BlockReward: number
    AssetLaunchDate: string
    MaxSupply: number
    Type: number
    DocumentType: string
}

export interface Rating {
    Weiss: Weiss
}

export interface Weiss {
    Rating: string
    TechnologyAdoptionRating: string
    MarketPerformanceRating: string
}

export interface ConversionInfo {
    Conversion: string
    ConversionSymbol: string
    CurrencyFrom: string
    CurrencyTo: string
    Market: string
    Supply: number
    MktCapPenalty: number
    TotalVolume24H: number
    TotalTopTierVolume24H: number
    SubBase: string
    SubsNeeded: string[]
    RAW: string[]
    DirectPairAvailable: boolean
}