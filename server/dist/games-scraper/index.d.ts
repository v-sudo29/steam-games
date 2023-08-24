interface IInfo {
    appId?: string;
    name?: string;
    url?: string;
    discount?: string;
    currentPrice?: string;
    originalPrice?: string;
    rating?: string;
    reviewsType?: string;
    imgUrl?: string;
    genres?: string[];
    saleEnds?: string;
    description?: string;
}
declare const _default: () => Promise<IInfo[]>;
export default _default;
