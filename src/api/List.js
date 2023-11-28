// import { v4 as uuid } from "uuid";
const discountCalc = (originalPrice, discountedPrice) => {
  let discount = Math.ceil(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );
  return discount;
};

const productsLis = [
  {
    name: "Green Colored Kurti",
    category: "kurti",
    keywords: ["women", "ladies", "kurtis", "kurti", "green", "women-wear"],
    discountedPrice: 800,
    originalPrice: 1500,
    url: "https://cdn.shopify.com/s/files/1/0637/4834/1981/products/pista-green-lakhnawi-work-rayon-kurti-peachmode-4.jpg?v=1669040711",
    _id: 1,
  },

  {
    name: "Red Colored Kurti",
    category: "kurti",
    keywords: ["women", "ladies", "kurtis", "kurti", "green", "women-wear"],
    originalPrice: 750,
    url: "https://cdn.shopify.com/s/files/1/0637/4834/1981/products/red-printed-pure-cotton-kurti-peachmode-2.jpg?v=1669066683",
    _id: 2,
  },
  {
    name: "Blue Jeans",
    category: "jeans",
    keywords: ["jeans", "men", "women", "blue", "blue jeans"],
    discountedPrice: 2000,
    originalPrice: 2500,
    url: "https://assets.ajio.com/medias/sys_master/root/20221019/4ikf/634fd570aeb269659c4d8a57/-473Wx593H-441148958-darkblue-MODEL.jpg",
    _id: 3,
  },
  {
    name: "White Shirt",
    category: "shirts",
    keywords: ["white", "shirts", "shirt", "men", "boys"],
    discountedPrice: 1500,
    originalPrice: 2000,
    url: "https://rukminim1.flixcart.com/image/832/832/xif0q/shirt/z/g/n/xl-st1-vebnor-original-imagn7gzxabfjbzp.jpeg?q=70",
    _id: 4,
  },
  {
    name: "Red Colored Saree",
    category: "sarees",
    keywords: ["sarees", "saree", "red", "women", "ladies"],
    discountedPrice: 1250,
    originalPrice: 2500,
    url: "https://rukminim1.flixcart.com/image/612/612/xif0q/sari/b/b/w/free-braso2-o-combo-lorofy-unstitched-original-imagkymbfmjbfeqj.jpeg?q=70",
    _id: 5,
  },
  {
    name: "Handcrafted T-Shirts",
    category: "t-shirts",
    keywords: ["tshirts", "handcrafted", "t-shirts", "tshirt"],
    discountedPrice: 1250,
    originalPrice: 2500,
    url: "https://rukminim1.flixcart.com/image/832/832/xif0q/t-shirt/c/i/0/xl-half-latter-one-nb-nicky-boy-original-imagmmcsjgufmvdq.jpeg?q=70",
    _id: 6,
  },
  {
    name: "Solid Shoulder Bag",
    category: "handbags",
    keywords: ["handbags", "handbag", "shoulder", "bag", "ladies"],
    discountedPrice: 1079,
    originalPrice: 3599,
    url: "https://rukminim1.flixcart.com/image/612/612/xif0q/hand-messenger-bag/m/8/m/-original-imagkycgznh78x4g.jpeg?q=70",
    _id: 7,
  },
  {
    name: "Women Handbag",
    category: "handbags",
    keywords: ["handbags", "handbag", "shoulder", "bag", "ladies"],
    discountedPrice: 1250,
    originalPrice: 2500,
    url: "https://rukminim1.flixcart.com/image/612/612/xif0q/hand-messenger-bag/m/8/t/women-stylish-trendy-collage-lightweight-western-look-hand-bags-original-imagntf6r7hhrnc8.jpeg?q=70",
    _id: 8,
  },
  {
    name: "Floral Waise Cut-out dress",
    category: "dresses",
    keywords: ["dress", "dresses", "floral", "women", "waist", "ladies"],
    discountedPrice: 1250,
    originalPrice: 2500,
    url: "https://rukminim1.flixcart.com/image/612/612/xif0q/dress/a/4/1/l-emz01634-emeros-original-imagmjptyetek6nx.jpeg?q=70",
    _id: 9,
  },
  {
    name: "Women printed Midi dress",
    category: "dresses",
    keywords: ["dresses", "dress", "midi", "women", "ladies", "printed"],
    discountedPrice: 1250,
    originalPrice: 2500,
    url: "https://rukminim1.flixcart.com/image/612/612/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70",
    _id: 10,
  },
  {
    name: "Women Twill Parallel Trousers",
    category: "trousers",
    keywords: ["trousers", "trouser", "twill", "parallel", "women", "ladies"],

    discountedPrice: 1250,
    originalPrice: 2500,
    url: "https://rukminim1.flixcart.com/image/612/612/xif0q/trouser/y/9/0/34-kttwomenspant353-kotty-original-imagp8wgzamubj9p.jpeg?q=70",
    _id: 11,
  },
  {
    name: "Women Trousers",
    category: "trousers",
    keywords: ["trousers", "trouser", "women", "ladies"],
    discountedPrice: 1250,
    originalPrice: 2500,
    url: "https://rukminim1.flixcart.com/image/612/612/xif0q/trouser/y/v/e/32-women-trouser-lupi-foxter-original-imagm99dzsz3fnqy.jpeg?q=70",
    _id: 12,
  },
];
export { productsLis, discountCalc };
