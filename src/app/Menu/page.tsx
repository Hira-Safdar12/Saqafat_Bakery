'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

// =============================================================================
// TYPES
// =============================================================================
interface MenuItem {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  img: string;
  category: string;
  badge?: 'Bestseller' | 'Most Loved' | 'NEW';
  desc?: string;
  spiceLevel?: 1 | 2 | 3;
  portion?: string;
  addons?: Addon[];
}

interface Addon {
  id: string;
  label: string;
  price: number;
}

interface Category {
  id: string;
  label: string;
  description: string;
  img: string;
}

// =============================================================================
// CATEGORIES — exact names from your code, unique ids, no emoji, no color
// =============================================================================
const categories: Category[] = [
  {
    id: 'pizza',
    label: 'Pizza',
    description: 'Stone-fired, loaded & fresh',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
  },
  {
    id: 'burgers',
    label: 'Burgers, Sandwiches & Panini',
    description: 'Stacked, grilled, pressed & loaded',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
  },
  {
    id: 'pasta',
    label: 'Pasta & Lasagna',
    description: 'Creamy, spiced & hearty',
    img: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&q=80',
  },
  {
    id: 'steaks',
    label: 'Steaks',
    description: 'Premium cuts, bold sauces',
    img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
  },
  {
    id: 'chinese',
    label: 'Chinese',
    description: 'Wok-tossed & full of flavour',
    img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
  },
  {
    id: 'rice',
    label: 'Rice',
    description: 'Fragrant & flavourful',
    img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
  },
  {
    id: 'noodles',
    label: 'Noodles',
    description: 'Stir-fried, saucy & slurp-worthy',
    img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80',
  },
  {
    id: 'soups',
    label: 'Soups',
    description: 'Warm, comforting & hearty',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
  },
  {
    id: 'salads',
    label: 'Salads',
    description: 'Fresh, crisp & colourful',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  },
  {
    id: 'starters',
    label: 'Starters',
    description: 'Perfect openers & snacks',
    img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80',
  },
  {
    id: 'beef',
    label: 'Beef',
    description: 'Bold, hearty beef dishes',
    img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
  },
  {
    id: 'desserts',
    label: 'Desserts',
    description: 'Sweet endings done right',
    img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80',
  },
  
  {
    id: 'beverages',
    label: 'Beverages',
    description: 'Shakes, coffees & refreshing sips',
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
  },
  {
    id: 'desi',
    label: 'Desi Cuisine',
    description: 'Authentic karahi & kebab classics',
    img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
  },
  {
    id: 'continental',
    label: 'Continential Chicken',
    description: 'Crispy, saucy & irresistible',
    img: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80',
  },
];

// =============================================================================
// MENU ITEMS
// =============================================================================
const menuItems: MenuItem[] = [

  // ── Pizza ──
  { id:'pz1', name:'Alfredo Pizza',                  priceLabel:'From Rs. 675', price:675, category:'pizza', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
    desc:'Creamy white Alfredo sauce with grilled chicken and melted mozzarella.' },
  { id:'pz2', name:'Fajita Pizza',                   priceLabel:'From Rs. 675', price:675, category:'pizza',
    img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    desc:'Spiced chicken fajita strips with bell peppers, onions and smoky salsa.', spiceLevel:2 },
  { id:'pz3', name:'Supreme Pizza',                  priceLabel:'From Rs. 675', price:675, category:'pizza', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    desc:'The works — chicken, beef, peppers, mushrooms and olives on a rich tomato base.' },
  { id:'pz4', name:'Chicken Tikka Pizza',            priceLabel:'From Rs. 675', price:675, category:'pizza',
    img:'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=800&q=80',
    desc:'Marinated chicken tikka with desi spices and fresh coriander.', spiceLevel:2 },
  { id:'pz5', name:'Grilled Chicken Jalapeño Pizza', priceLabel:'From Rs. 675', price:675, category:'pizza',
    img:'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&q=80',
    desc:'Tender grilled chicken with fresh jalapeños and a fiery kick.', spiceLevel:3 },
  { id:'pz6', name:'Smoked Chicken Pizza',           priceLabel:'Rs. 545',      price:545, category:'pizza',
    img:'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&q=80',
    desc:'Smoky slow-cooked chicken with BBQ drizzle and caramelised onions.' },
  { id:'pz7', name:'Saqafat Special Pizza',          priceLabel:'From Rs. 775', price:775, category:'pizza', badge:'NEW',
    img:'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80',
    desc:"Our signature pizza — the chef's secret recipe you won't find anywhere else." },

  // ── Burgers, Sandwiches & Panini ──
  { id:'bg1', name:'Zinger Chicken Burger',              priceLabel:'Rs. 450',       price:450, category:'burgers',
    img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    desc:'Crispy spiced chicken fillet with lettuce, pickles and our house sauce.', spiceLevel:2 },
  { id:'bg2', name:'Grilled Chicken Burger',             priceLabel:'Rs. 595',       price:595, category:'burgers',
    img:'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
    desc:'Juicy grilled chicken breast with fresh vegetables in a toasted brioche bun.' },
  { id:'bg3', name:'Saqafat Special Chicken Burger',     priceLabel:'Rs. 595',       price:595, category:'burgers', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80',
    desc:'Our signature chicken burger with a secret sauce that keeps you coming back.' },
  { id:'bg4', name:'Grilled Beef Burger',                priceLabel:'Rs. 595',       price:595, category:'burgers',
    img:'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80',
    desc:'100% beef patty grilled to perfection with fresh toppings.' },
  { id:'bg5', name:'Saqafat Special Beef Burger',        priceLabel:'Rs. 695',       price:695, category:'burgers', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80',
    desc:'Our premium beef burger loaded with everything — the ultimate Saqafat experience.' },
  { id:'bg6', name:'Russo Double Patty Burger',          priceLabel:'Rs. 745',       price:745, category:'burgers', badge:'NEW',
    img:'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80',
    desc:'Double beef patty stacked high with cheese, sauce and all the trimmings.' },
  { id:'sw1', name:'Club Sandwich',                      priceLabel:'Rs. 625',       price:625, category:'burgers', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=800&q=80',
    desc:'Triple-decker with grilled chicken, egg, fresh vegetables and our signature sauce.' },
  { id:'sw2', name:'Salsa Chicken Sandwich',             priceLabel:'Rs. 595',       price:595, category:'burgers',
    img:'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80',
    desc:'Grilled chicken with fresh tomato salsa, lettuce and chipotle mayo.', spiceLevel:1 },
  { id:'sw3', name:'Saqafat Special Panini Sandwich',    priceLabel:'From Rs. 725',  price:725, category:'burgers', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80',
    desc:'Our pressed signature panini — loaded with the finest fillings and grilled golden.' },
  { id:'sw4', name:'Grilled Chicken Jalapeño Panini',    priceLabel:'Rs. 745',       price:745, category:'burgers',
    img:'https://images.unsplash.com/photo-1603046891744-1f7993a7f73e?w=800&q=80',
    desc:'Hot-pressed panini with grilled chicken and fresh jalapeños.', spiceLevel:3 },
  { id:'sw5', name:'Chicken Tikka Panini Sandwich',      priceLabel:'Rs. 655',       price:655, category:'burgers',
    img:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    desc:'Spiced chicken tikka in a crispy pressed panini with mint chutney.', spiceLevel:2 },
  { id:'sw6', name:'Fillet Steak Sandwich',              priceLabel:'Rs. 625',       price:625, category:'burgers',
    img:'https://images.unsplash.com/photo-1509722747041-616f39b57e3a?w=800&q=80',
    desc:'Tender beef fillet strips with caramelised onions and peppercorn sauce.' },

  // ── Pasta & Lasagna ──
  { id:'pa1', name:'Chicken Lasagna',        priceLabel:'Rs. 895', price:895, category:'pasta', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1619895092538-128341789043?w=800&q=80',
    desc:'Layered pasta sheets with rich chicken bolognese and béchamel, oven-baked golden.' },
  { id:'pa2', name:'Alfredo Pasta',          priceLabel:'Rs. 995', price:995, category:'pasta',
    img:'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&q=80',
    desc:'Creamy parmesan Alfredo sauce tossed with penne and grilled chicken.' },
  { id:'pa3', name:'Arrabbiata Pasta',       priceLabel:'Rs. 995', price:995, category:'pasta',
    img:'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=800&q=80',
    desc:'Classic spicy tomato arrabbiata sauce with penne — fiery and flavourful.', spiceLevel:3 },
  { id:'pa4', name:'Spicy Fettuccine Pasta', priceLabel:'Rs. 995', price:995, category:'pasta', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80',
    desc:'Wide fettuccine ribbons in a spiced cream sauce with grilled chicken.', spiceLevel:2 },

  // ── Steaks ──
  { id:'st1', name:'Black Pepper Chicken Steak',             priceLabel:'Rs. 1,395', price:1395, category:'steaks',
    img:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
    desc:'Juicy chicken breast in a bold black pepper sauce with grilled vegetables.' },
  { id:'st2', name:'Whiskey River Chicken Steak',            priceLabel:'Rs. 1,395', price:1395, category:'steaks',
    img:'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80',
    desc:'Smoky whiskey-glazed chicken steak with mushroom sauce.' },
  { id:'st3', name:'Mexican Chicken Steak',                  priceLabel:'Rs. 1,395', price:1395, category:'steaks',
    img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    desc:'Spiced Mexican-style chicken with salsa, jalapeños and sour cream.', spiceLevel:2 },
  { id:'st4', name:'Saqafat Special Jalapeño Chicken Steak', priceLabel:'Rs. 1,595', price:1595, category:'steaks', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
    desc:'Our fiery signature chicken steak smothered in jalapeño cream sauce.', spiceLevel:3 },
  { id:'st5', name:'Black Pepper Beef Steak',                priceLabel:'Rs. 1,695', price:1695, category:'steaks',
    img:'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
    desc:'Premium beef cut in a rich black pepper and herb sauce.' },
  { id:'st6', name:'Whiskey River Beef Steak',               priceLabel:'Rs. 1,695', price:1695, category:'steaks',
    img:'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    desc:'Tender beef with a smoky whiskey glaze and caramelised onions.' },
  { id:'st7', name:'Mexican Beef Steak',                     priceLabel:'Rs. 1,695', price:1695, category:'steaks',
    img:'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=800&q=80',
    desc:'Boldly spiced beef steak with Mexican salsa and pickled jalapeños.', spiceLevel:2 },
  { id:'st8', name:'Saqafat Special Jalapeño Beef Steak',    priceLabel:'Rs. 1,895', price:1895, category:'steaks', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    desc:'Our premium beef masterpiece — jalapeño cream, herb butter and all the trimmings.', spiceLevel:3 },

  // ── Chinese ──
  { id:'ch1', name:'Spicy Honey Wings',    priceLabel:'Rs. 685',        price:685,  category:'chinese', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80',
    desc:'Crispy chicken wings glazed in a sticky sweet-heat honey sauce.', spiceLevel:2 },
  { id:'ch2', name:'Tempura Chicken',      priceLabel:'Rs. 685',        price:685,  category:'chinese',
    img:'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
    desc:'Light Japanese-style battered chicken strips, crispy and golden.' },
  { id:'ch3', name:'Thai Sweet Chili Wings', priceLabel:'Rs. 740',      price:740,  category:'chinese',
    img:'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80',
    desc:'Crispy wings tossed in a tangy Thai sweet chili glaze.', spiceLevel:1 },
  { id:'ch4', name:'American Chop Suey',   priceLabel:'Rs. 1,045',      price:1045, category:'chinese',
    img:'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80',
    desc:'Crispy noodles topped with a rich mixed vegetable and chicken sauce.' },
  { id:'ch5', name:'Chicken Cashewnut',    priceLabel:'From Rs. 1,325', price:1325, category:'chinese',
    img:'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80',
    desc:'Tender chicken stir-fried with roasted cashews in a savoury sauce.' },
  { id:'ch6', name:'Mongolian Crispy',     priceLabel:'From Rs. 1,100', price:1100, category:'chinese', badge:'NEW',
    img:'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
    desc:'Crispy beef or chicken in a bold Mongolian sauce with spring onions.' },

  // ── Noodles ──
  { id:'nd1', name:'Chicken Chow Mein',    priceLabel:'Rs. 945', price:945, category:'noodles', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80',
    desc:'Stir-fried noodles with tender chicken, vegetables and soy sauce.' },
  { id:'nd2', name:'Beef Chow Mein',       priceLabel:'Rs. 995', price:995, category:'noodles',
    img:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
    desc:'Classic wok-tossed beef noodles with vegetables and savoury soy glaze.' },
  { id:'nd3', name:'Hakka Noodles',        priceLabel:'Rs. 895', price:895, category:'noodles',
    img:'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80',
    desc:'Indo-Chinese style Hakka noodles tossed with peppers and sauces.', spiceLevel:1 },

  // ── Rice ──
  { id:'ri1', name:'Egg Fried Rice',     priceLabel:'Rs. 795',   price:795,  category:'rice',
    img:'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
    desc:'Classic wok-tossed egg fried rice with spring onions and soy.' },
  { id:'ri2', name:'Garlic Rice',        priceLabel:'Rs. 795',   price:795,  category:'rice',
    img:'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80',
    desc:'Fragrant steamed rice tossed with golden garlic and herbs.' },
  { id:'ri3', name:'Vegetable Rice',     priceLabel:'Rs. 680',   price:680,  category:'rice',
    img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
    desc:'Light and healthy mixed vegetable fried rice.' },
  { id:'ri4', name:'Chicken Fried Rice', priceLabel:'Rs. 740',   price:740,  category:'rice', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1596560548464-f010b45e3e33?w=800&q=80',
    desc:'Wok-tossed chicken fried rice with vegetables and soy sauce.' },
  { id:'ri5', name:'Masala Rice',        priceLabel:'Rs. 1,645', price:1645, category:'rice', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    desc:'Aromatic masala rice served with a rich curry.', spiceLevel:2 },

  // ── Soups ──
  { id:'sp1', name:'Chicken Corn Soup', priceLabel:'From Rs. 245', price:245, category:'soups', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    desc:'Creamy chicken and sweet corn soup — comforting and warming.' },
  { id:'sp2', name:'Hot & Sour Soup',  priceLabel:'From Rs. 245', price:245, category:'soups',
    img:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
    desc:'Classic Chinese hot and sour broth with vegetables and egg.', spiceLevel:2 },
  { id:'sp3', name:'Szechuan Soup',    priceLabel:'From Rs. 295', price:295, category:'soups',
    img:'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80',
    desc:'Fiery Szechuan-spiced broth with chicken and vegetables.', spiceLevel:3 },

  // ── Salads ──
  { id:'sl1', name:'Caesar Salad',       priceLabel:'Rs. 595', price:595, category:'salads',
    img:'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80',
    desc:'Crisp romaine, parmesan shavings, croutons and classic Caesar dressing.' },
  { id:'sl2', name:'Garden Fresh Salad', priceLabel:'Rs. 495', price:495, category:'salads',
    img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    desc:'A colourful medley of seasonal vegetables with house vinaigrette.' },
  { id:'sl3', name:'Grilled Chicken Salad', priceLabel:'Rs. 695', price:695, category:'salads', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    desc:'Tender grilled chicken strips over fresh greens with balsamic dressing.' },

  // ── Starters ──
  { id:'ap1', name:'Garlic Bread',  priceLabel:'Rs. 310', price:310, category:'starters',
    img:'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800&q=80',
    desc:'Toasted bread with roasted garlic butter and herbs.' },
  { id:'ap2', name:'Fries',         priceLabel:'Rs. 295', price:295, category:'starters', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80',
    desc:'Golden crispy fries, perfectly salted.' },
  { id:'ap3', name:'Loaded Fries',  priceLabel:'Rs. 445', price:445, category:'starters', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&q=80',
    desc:'Crispy fries piled with cheese sauce, jalapeños and toppings.' },
  { id:'ap4', name:'Chicken Wings', priceLabel:'Rs. 645', price:645, category:'starters',
    img:'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80',
    desc:'Crispy fried chicken wings with your choice of dipping sauce.', spiceLevel:1 },

  // ── Beef ──
  { id:'bf1', name:'Beef Stir Fry',       priceLabel:'Rs. 895',   price:895,  category:'beef',
    img:'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=800&q=80',
    desc:'Tender beef strips wok-tossed with vegetables in a rich savoury sauce.', spiceLevel:2 },
  { id:'bf2', name:'Beef Karahi',         priceLabel:'Rs. 1,295', price:1295, category:'beef', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80',
    desc:'Rich, slow-cooked beef karahi with tomatoes, ginger and aromatic spices.', spiceLevel:2 },
  { id:'bf3', name:'Beef Seekh Kebab',    priceLabel:'Rs. 795',   price:795,  category:'beef',
    img:'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=800&q=80',
    desc:'Juicy minced beef seekh kebabs grilled on skewers with herbs.', spiceLevel:2 },
  { id:'bf4', name:'Beef Nihari',         priceLabel:'Rs. 1,095', price:1095, category:'beef', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    desc:'Slow-simmered beef nihari with rich gravy, garnished with ginger and green chillies.', spiceLevel:2 },

  // ── Desserts ── (from your menu photo)
  { id:'ds1', name:'Thothi Kheer',                      priceLabel:'Rs. 200', price:200, category:'desserts',
    img:'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    desc:'Traditional creamy rice pudding made with fresh bottle gourd.' },
  { id:'ds2', name:'Garam Gulaab Jamun (3 pieces)',     priceLabel:'Rs. 295', price:295, category:'desserts', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
    desc:'Warm, soft gulab jamun soaked in rose-scented sugar syrup.' },
  { id:'ds3', name:'Rus Malai',                         priceLabel:'Rs. 350', price:350, category:'desserts',
    img:'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=800&q=80',
    desc:'Soft chenna dumplings served in chilled, cardamom-scented cream.' },
  { id:'ds4', name:'Saqafat Special Brownie with Ice Cream', priceLabel:'Rs. 445', price:445, category:'desserts', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1606312619344-64a3c6b6b0c7?w=800&q=80',
    desc:'Our legendary fudgy brownie served warm with a scoop of vanilla ice cream.' },
  { id:'ds5', name:'Molten Lava Cake with Ice Cream',   priceLabel:'Rs. 545', price:545, category:'desserts', badge:'NEW',
    img:'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80',
    desc:'Warm chocolate cake with a flowing molten centre, served with ice cream.' },
  { id:'ds6', name:'Walnut Pie / Chocolate Pie',        priceLabel:'Rs. 545', price:545, category:'desserts',
    img:'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    desc:'Rich walnut or chocolate pie slice — a classic comfort dessert.' },
  { id:'ds7', name:'Skillet Brownie with Ice Cream',    priceLabel:'Rs. 595', price:595, category:'desserts',
    img:'https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=800&q=80',
    desc:'Cast-iron skillet brownie served sizzling hot with vanilla ice cream.' },
  { id:'ds8', name:'Cheese Cake Slice',                 priceLabel:'Rs. 645', price:645, category:'desserts',
    img:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    desc:'Creamy New York-style cheesecake on a buttery biscuit base.' },

  // ── Deserts (Ice Cream) ──
  { id:'ic1', name:'Mango Ice Cream',      priceLabel:'From Rs. 130', price:130, category:'icecream',
    img:'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&q=80',
    desc:'Rich, creamy mango ice cream made with real fruit.' },
  { id:'ic2', name:'Vanilla Ice Cream',    priceLabel:'From Rs. 130', price:130, category:'icecream', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80',
    desc:'Classic smooth vanilla — a timeless favourite.' },
  { id:'ic3', name:'Chocolate Ice Cream',  priceLabel:'From Rs. 130', price:130, category:'icecream',
    img:'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
    desc:'Deep, dark chocolate ice cream for the true chocoholic.' },
  { id:'ic4', name:'Strawberry Ice Cream', priceLabel:'From Rs. 130', price:130, category:'icecream',
    img:'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&q=80',
    desc:'Fresh strawberry ice cream — fruity, sweet and vibrant.' },

  // ── Beverages (Shakes from your menu photo) ──
  { id:'bv1', name:'Vanilla Shake',           priceLabel:'Rs. 425', price:425, category:'beverages',
    img:'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80',
    desc:'Classic smooth vanilla milkshake — simple and delicious.' },
  { id:'bv2', name:'Strawberry Shake',        priceLabel:'Rs. 425', price:425, category:'beverages',
    img:'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
    desc:'Fresh strawberry blended into a thick, fruity shake.' },
  { id:'bv3', name:'Mango Shake',             priceLabel:'Rs. 425', price:425, category:'beverages',
    img:'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80',
    desc:'Fresh mango blended into a thick, tropical shake.' },
  { id:'bv4', name:'Oreo Shake',              priceLabel:'Rs. 425', price:425, category:'beverages', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
    desc:'Crushed Oreo cookies blended with creamy vanilla ice cream.' },
  { id:'bv5', name:'Chocolate Shake',         priceLabel:'Rs. 425', price:425, category:'beverages', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
    desc:'Thick, creamy chocolate milkshake blended to perfection.' },
  { id:'bv6', name:'Lotus with Caramel',      priceLabel:'Rs. 495', price:495, category:'beverages', badge:'NEW',
    img:'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80',
    desc:'Biscoff-infused shake with a rich caramel swirl.' },
  { id:'bv7', name:'Peanut Butter & Jam',     priceLabel:'Rs. 595', price:595, category:'beverages',
    img:'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80',
    desc:'A nostalgic blend of creamy peanut butter and sweet jam.' },
  { id:'bv8', name:'Nutella / KitKat / Dairy Milk', priceLabel:'Rs. 595', price:595, category:'beverages',
    img:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    desc:'Choose your favourite — Nutella, KitKat or Dairy Milk shake.' },

  // ── Desi Cuisine ──
  { id:'kr1', name:'Chicken Tikka Boti',    priceLabel:'Approx. AUD 17', price:17,  category:'desi',
    img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
    desc:'Tender chicken tikka boti marinated in desi spices and charcoal-grilled.', spiceLevel:2 },
  { id:'kr2', name:'Chicken Seekh Kebab',   priceLabel:'Approx. AUD 17', price:17,  category:'desi',
    img:'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=800&q=80',
    desc:'Juicy minced chicken seekh kebabs grilled on skewers with fresh herbs.', spiceLevel:2 },
  { id:'kr3', name:'Chicken White Karahi',  priceLabel:'Approx. AUD 42', price:42,  category:'desi', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    desc:'Creamy white karahi with chicken, green chillies and aromatic spices.', spiceLevel:2 },
  { id:'kr4', name:'Lamb Shinwari Karahi',  priceLabel:'Approx. AUD 54', price:54,  category:'desi', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80',
    desc:'Classic Peshawari Shinwari karahi with tender lamb, tomatoes and oil.', spiceLevel:1 },
  { id:'kr5', name:'Mutton Namkeen Karahi', priceLabel:'Approx. AUD 54', price:54,  category:'desi',
    img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
    desc:'Slow-cooked mutton in a salt-seasoned karahi with fresh ginger.', spiceLevel:1 },
  { id:'kr6', name:'Paneer Tikka Masala',   priceLabel:'Approx. AUD 18', price:18,  category:'desi',
    img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    desc:'Char-grilled paneer in a rich, spiced masala gravy.', spiceLevel:2 },

  // ── Continental Chicken ──
  { id:'cc1', name:'Black Pepper Chicken Steak',             priceLabel:'Rs. 1,395', price:1395, category:'continental',
    img:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
    desc:'Juicy chicken breast in a bold black pepper sauce with grilled vegetables.' },
  { id:'cc2', name:'Whiskey River Chicken Steak',            priceLabel:'Rs. 1,395', price:1395, category:'continental',
    img:'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80',
    desc:'Smoky whiskey-glazed chicken steak with mushroom sauce.' },
  { id:'cc3', name:'Mexican Chicken Steak',                  priceLabel:'Rs. 1,395', price:1395, category:'continental',
    img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    desc:'Spiced Mexican-style chicken with salsa, jalapeños and sour cream.', spiceLevel:2 },
  { id:'cc4', name:'Saqafat Special Jalapeño Chicken Steak', priceLabel:'Rs. 1,595', price:1595, category:'continental', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80',
    desc:'Our fiery signature chicken steak smothered in jalapeño cream sauce.', spiceLevel:3 },
  { id:'cc5', name:'Grilled Chicken with Mushroom Sauce',    priceLabel:'Rs. 1,295', price:1295, category:'continental', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    desc:'Perfectly grilled chicken fillet topped with a rich mushroom cream sauce.' },
];

// =============================================================================
// HELPERS
// =============================================================================
function SpiceIndicator({ level }: { level?: 1 | 2 | 3 }) {
  if (!level) return null;
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3].map((s) => (
        <span key={s} style={{ fontSize: 11, opacity: s <= level ? 1 : 0.2 }}>🌶️</span>
      ))}
    </div>
  );
}

// =============================================================================
// ITEM MODAL
// =============================================================================
function ItemModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const [qty, setQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);

  const addonTotal  = (item.addons || []).filter((a) => selectedAddons.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const total       = (item.price + addonTotal) * qty;
  const addonLabels = (item.addons || []).filter((a) => selectedAddons.includes(a.id)).map((a) => a.label).join(', ');

  const handleWhatsApp = () => {
    const branch     = typeof window !== 'undefined' ? localStorage.getItem('saqafat_branch') || 'your nearest branch' : 'your nearest branch';
    const addonsText = addonLabels ? ` (${addonLabels})` : '';
    const msg        = encodeURIComponent(`Hi! I'd like to order:\n• ${item.name}${addonsText} x${qty}\nBranch: ${branch}\nPrice: ${item.priceLabel}`);
    window.open(`https://wa.me/923XXXXXXXXX?text=${msg}`, '_blank');
  };

  const badge      = item.badge;
  const badgeStyle = badge === 'NEW' ? st.badgeNew : badge === 'Bestseller' ? st.badgeBest : st.badgeLoved;

  return (
    <div style={st.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true">
      <div style={st.modal}>
        <button style={st.modalClose} onClick={onClose} aria-label="Close">✕</button>

        {/* Image */}
        <div style={st.modalImgWrap}>
          <Image src={item.img} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 560px" />
          {badge && <span style={{ ...st.badge, ...badgeStyle }}>{badge}</span>}
        </div>

        {/* Content */}
        <div style={st.modalContent}>
          <h2 style={st.modalTitle}>{item.name}</h2>
          <div style={st.modalPriceRow}>
            <span style={st.modalPrice}>{item.priceLabel}</span>
            {item.portion && <span style={st.modalPortion}>📦 {item.portion}</span>}
            <SpiceIndicator level={item.spiceLevel} />
          </div>
          {item.desc && <p style={st.modalDesc}>{item.desc}</p>}

          {item.addons && item.addons.length > 0 && (
            <div style={st.addons}>
              <p style={st.addonsLabel}>Customise your order</p>
              {item.addons.map((addon) => (
                <label key={addon.id} style={st.addonRow}>
                  <input type="checkbox" checked={selectedAddons.includes(addon.id)} onChange={() => toggleAddon(addon.id)} style={{ accentColor: '#c8860a' }} />
                  <span style={{ flex: 1, fontSize: 14, color: '#3d2c1e' }}>{addon.label}</span>
                  {addon.price > 0 && <span style={{ fontSize: 13, color: '#c8860a', fontWeight: 600 }}>+Rs. {addon.price}</span>}
                </label>
              ))}
            </div>
          )}

          <div style={st.qtyRow}>
            <span style={{ fontSize: 14, color: '#6b4c2e', fontWeight: 500 }}>Quantity</span>
            <div style={st.qtyCtrl}>
              <button style={st.qtyBtn} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span style={{ minWidth: 28, textAlign: 'center', fontWeight: 700, fontSize: 16, color: '#1a0a00' }}>{qty}</span>
              <button style={st.qtyBtn} onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#c8860a' }}>
              {qty > 1 ? `Rs. ${total.toLocaleString('en-PK')}` : item.priceLabel}
            </span>
          </div>

          <button style={st.waBtn} onClick={handleWhatsApp}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MENU CARD — shows individual item with its own image
// =============================================================================
function MenuCard({ item, onOpen }: { item: MenuItem; onOpen: (item: MenuItem) => void }) {
  const [hovered, setHovered] = useState(false);

  const badge      = item.badge;
  const badgeStyle = badge === 'NEW'
    ? st.badgeNew
    : badge === 'Bestseller'
    ? st.badgeBest
    : st.badgeLoved;

  return (
    <div
      style={{
        ...st.card,
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 14px 32px rgba(0,0,0,.18)'
          : '0 2px 14px rgba(0,0,0,.08)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
    >
      <div style={st.cardImgWrap}>
        <Image
          src={item.img}
          alt={item.name}
          fill
          style={{
            objectFit: 'cover',
            transition: 'transform .5s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 22vw"
        />

        {badge && (
          <span style={{ ...st.badge, ...badgeStyle }}>
            {badge}
          </span>
        )}
      </div>

      <div style={st.cardBody}>
        <h3 style={st.cardName}>{item.name}</h3>

        {item.desc && (
          <p style={st.cardDesc}>{item.desc}</p>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <span style={st.cardPrice}>{item.priceLabel}</span>
          <SpiceIndicator level={item.spiceLevel} />
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// CATEGORY CARD — shows the category hero image
// =============================================================================
function CategoryCard({
  cat,
  count,
  onClick,
}: {
  cat: Category;
  count: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...st.catCard,
        transform: hovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 18px 38px rgba(0,0,0,.22)'
          : '0 4px 20px rgba(0,0,0,.13)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div style={st.catImgWrap}>
        <Image
          src={cat.img}
          alt={cat.label}
          fill
          style={{
            objectFit: 'cover',
            transition: 'transform .6s ease',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}
          sizes="(max-width:640px) 48vw, (max-width:1024px) 30vw, 22vw"
        />

        <div style={st.catGradient} />

        <div style={st.catInfo}>
          <span style={st.catLabel}>{cat.label}</span>
          <span style={st.catDesc}>{cat.description}</span>
          <span style={st.catCount}>{count} items</span>
        </div>
      </div>
    </div>
  );
}
// =============================================================================
// ITEMS VIEW — shown after a category is tapped; renders item cards grid
// =============================================================================
function ItemsView({ cat, onBack, onOpen }: { cat: Category; onBack: () => void; onOpen: (i: MenuItem) => void }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const items = menuItems
    .filter((m) => m.category === cat.id)
    .filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.desc || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <button style={st.backBtn} onClick={onBack}>← Back to Menu</button>
        {/* Category banner with its own image */}
        <div style={st.catBanner}>
          <Image src={cat.img} alt={cat.label} fill style={{ objectFit: 'cover' }} sizes="100vw" />
          <div style={st.catBannerOverlay} />
          <div style={st.catBannerText}>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 700, margin: 0 }}>{cat.label}</h2>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: 14, margin: '4px 0 0', fontFamily: 'sans-serif' }}>{cat.description}</p>
          </div>
        </div>
      </div>

      {/* Search + sort */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' as const }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: '#9b7a5a' }}>🔍</span>
          <input style={st.searchInput} placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select style={st.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
          <option value="default">Default order</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {/* Item count */}
      <p style={{ fontSize: 13, color: '#9b7a5a', fontFamily: 'sans-serif', margin: '0 0 20px' }}>
        {items.length} item{items.length !== 1 ? 's' : ''}
      </p>

      {/* ── ITEM CARDS GRID — every card has its own image ── */}
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9b7a5a', fontFamily: 'sans-serif' }}>
          <p style={{ fontSize: 18 }}>No items found.</p>
          <button style={{ marginTop: 12, color: '#c8860a', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15 }} onClick={() => setSearch('')}>Clear search</button>
        </div>
      ) : (
        <div style={st.itemsGrid}>
          {items.map((item) => (
            <MenuCard key={item.id} item={item} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================
export default function Menu() {
  const searchParams     = useSearchParams();
  const [activeCat,  setActiveCat ] = useState<Category | null>(null);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [catSearch,  setCatSearch ] = useState('');

  useEffect(() => {
    const itemName = searchParams.get('item');
    if (itemName) {
      const found = menuItems.find((m) => m.name.toLowerCase() === itemName.toLowerCase());
      if (found) {
        const cat = categories.find((c) => c.id === found.category) || null;
        setActiveCat(cat);
        setActiveItem(found);
      }
    }
  }, [searchParams]);

  const filteredCats = categories.filter((c) =>
    c.label.toLowerCase().includes(catSearch.toLowerCase())
  );

  return (
    <div style={st.root}>

      {/* ── HERO ── */}
      <section style={st.hero}>
        <video style={st.heroVideo} autoPlay muted loop playsInline poster="/images/menu/hero-poster.jpg">
          <source src="/tea.mp4" type="video/mp4" />
        </video>
        <div style={st.heroOverlay} />
        <div style={st.heroContent}>
          <div style={st.eyebrow}>
            <span style={st.eyebrowLine} />
            <span style={st.eyebrowText}>Saqafat Bakery & Café</span>
            <span style={st.eyebrowLine} />
          </div>
          <h1 style={st.heroH1}>Our Full <span style={st.heroAccent}>Menu</span></h1>
          <p style={st.heroSub}>Pizza · Steaks · Karahi · Desserts · Shakes & more — crafted fresh daily.</p>
        </div>
      </section>

      {/* ── BODY ── */}
      <div style={st.body}>
        {!activeCat ? (
          /* ── CATEGORY GRID — each shows category image ── */
          <div>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, color: '#1a0a00', margin: '0 0 8px' }}>
                What are you craving?
              </h2>
              <p style={{ color: '#7a5c3a', fontSize: 15, margin: '0 0 28px', fontFamily: 'sans-serif' }}>
                Tap a category to see all items
              </p>
              <div style={{ position: 'relative', maxWidth: 400, margin: '0 auto' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: '#9b7a5a' }}>🔍</span>
                <input style={st.searchInput} placeholder="Search categories..." value={catSearch} onChange={(e) => setCatSearch(e.target.value)} />
              </div>
            </div>

            {/* Category cards grid */}
            <div style={st.catGrid}>
              {filteredCats.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  count={menuItems.filter((m) => m.category === cat.id).length}
                  onClick={() => { setActiveCat(cat); setCatSearch(''); }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ── ITEMS VIEW — shows individual item cards ── */
          <ItemsView cat={activeCat} onBack={() => setActiveCat(null)} onOpen={setActiveItem} />
        )}
      </div>

      {activeItem && <ItemModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </div>
  );
}

// =============================================================================
// STYLES
// =============================================================================
const st: Record<string, React.CSSProperties> = {
  root:         { fontFamily: "'Georgia','Times New Roman',serif", background: '#fdf8f2', minHeight: '100vh', color: '#1a0a00' },

  // Hero
  hero:         { position: 'relative', height: 380, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  heroVideo:    { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
  heroOverlay:  { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(10,3,0,.65) 0%,rgba(10,3,0,.8) 100%)' },
  heroContent:  { position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' },
  eyebrow:      { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 },
  eyebrowLine:  { display: 'block', width: 40, height: 1, background: '#c8860a' },
  eyebrowText:  { color: '#c8860a', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'sans-serif' },
  heroH1:       { fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, color: '#fff', margin: '0 0 12px', lineHeight: 1.15 },
  heroAccent:   { color: '#f0b532', fontStyle: 'italic' },
  heroSub:      { color: 'rgba(255,255,255,.75)', fontSize: 'clamp(13px,2vw,16px)', margin: 0, fontFamily: 'sans-serif', fontWeight: 300 },

  // Body
  body:         { maxWidth: 1300, margin: '0 auto', padding: '52px 20px 90px' },

  // Category grid — each card has an image
  catGrid:      { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 22 },
  catCard: {
  borderRadius: 16,
  overflow: 'hidden',
  cursor: 'pointer',
  height: 210,
  position: 'relative',
  boxShadow: '0 4px 20px rgba(0,0,0,.13)',
  transition: 'transform .35s ease, box-shadow .35s ease',
},
  catImgWrap:   { position: 'relative', width: '100%', height: '100%' },
  catGradient:  { position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,.82) 0%, rgba(0,0,0,.35) 55%, transparent 100%)' },
  catInfo:      { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px',
                  display: 'flex', flexDirection: 'column', gap: 2 },
  catLabel:     { color: '#fff', fontWeight: 700, fontSize: 17, lineHeight: 1.2 },
  catDesc:      { color: 'rgba(255,255,255,.78)', fontSize: 12, fontFamily: 'sans-serif' },
  catCount:     { color: 'rgba(255,255,255,.55)', fontSize: 11, fontFamily: 'sans-serif', marginTop: 2 },

  // Category banner in items view
  catBanner:    { position: 'relative', height: 160, borderRadius: 14, overflow: 'hidden', marginBottom: 28 },
  catBannerOverlay: { position: 'absolute', inset: 0, background: 'rgba(10,3,0,.52)' },
  catBannerText:{ position: 'absolute', bottom: 0, left: 0, padding: '18px 22px' },

  // Items grid — cards with their own images
  itemsGrid:    { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 20 },
  card: {
  background: '#fff',
  borderRadius: 14,
  overflow: 'hidden',
  cursor: 'pointer',
  boxShadow: '0 2px 14px rgba(0,0,0,.08)',
  transition: 'transform .35s ease, box-shadow .35s ease',
},

  cardImgWrap:  { position: 'relative', height: 170 },   // ← item's own image renders here
  cardBody:     { padding: '12px 14px 15px' },
  cardName:     { fontSize: 14, fontWeight: 700, margin: '0 0 5px', color: '#1a0a00', lineHeight: 1.3 },
  cardDesc:     { fontSize: 12, color: '#7a5c3a', margin: 0, lineHeight: 1.5, fontFamily: 'sans-serif',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  cardPrice:    { fontSize: 13, fontWeight: 700, color: '#c8860a' },

  // Badge
  badge:        { position: 'absolute', top: 10, left: 10, padding: '3px 9px', borderRadius: 6,
                  fontSize: 10, fontWeight: 700, fontFamily: 'sans-serif', letterSpacing: .5, textTransform: 'uppercase' },
  badgeNew:     { background: '#1a6b3c', color: '#fff' },
  badgeBest:    { background: '#c8860a', color: '#fff' },
  badgeLoved:   { background: '#b5432a', color: '#fff' },

  // Controls
  searchInput:  { width: '100%', boxSizing: 'border-box', border: '1.5px solid #e8d5b8', borderRadius: 10,
                  padding: '10px 14px 10px 42px', fontSize: 15, background: '#fff', color: '#1a0a00',
                  outline: 'none', fontFamily: 'sans-serif' },
  sortSelect:   { border: '1.5px solid #e8d5b8', borderRadius: 10, padding: '10px 14px', fontSize: 14,
                  background: '#fff', color: '#3d2c1e', cursor: 'pointer', fontFamily: 'sans-serif', outline: 'none' },
  backBtn:      { background: 'none', border: '1.5px solid #d4a86a', color: '#8a5c2e', borderRadius: 8,
                  padding: '8px 18px', cursor: 'pointer', fontSize: 14, fontFamily: 'sans-serif',
                  marginBottom: 16, transition: 'all .2s', display: 'inline-block' },

  // Modal
  overlay:      { position: 'fixed', inset: 0, background: 'rgba(10,4,0,.68)', zIndex: 1000,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(4px)' },
  modal:        { background: '#fff', borderRadius: 20, width: '100%', maxWidth: 520,
                  maxHeight: '90vh', overflowY: 'auto', position: 'relative' },
  modalClose:   { position: 'absolute', top: 12, right: 12, zIndex: 10, background: 'rgba(0,0,0,.55)',
                  color: '#fff', border: 'none', borderRadius: '50%', width: 34, height: 34,
                  cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalImgWrap: { position: 'relative', height: 230 },
  modalContent: { padding: '18px 22px 26px' },
  modalTitle:   { fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: '#1a0a00' },
  modalPriceRow:{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 10 },
  modalPrice:   { fontSize: 18, fontWeight: 700, color: '#c8860a' },
  modalPortion: { fontSize: 12, color: '#7a5c3a', background: '#fdf3e3', padding: '3px 10px', borderRadius: 6, fontFamily: 'sans-serif' },
  modalDesc:    { fontSize: 14, color: '#4a3320', lineHeight: 1.6, margin: '0 0 14px', fontFamily: 'sans-serif' },
  addons:       { marginBottom: 14 },
  addonsLabel:  { fontSize: 13, fontWeight: 700, color: '#1a0a00', margin: '0 0 8px', fontFamily: 'sans-serif' },
  addonRow:     { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7, cursor: 'pointer', fontFamily: 'sans-serif' },
  qtyRow:       { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, background: '#fdf3e3', padding: '11px 14px', borderRadius: 10 },
  qtyCtrl:      { display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 8, padding: '4px 8px', border: '1.5px solid #e8d5b8' },
  qtyBtn:       { background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#c8860a', fontWeight: 700, lineHeight: 1, padding: '0 4px' },
  waBtn:        { width: '100%', padding: '13px 0', background: '#25D366', color: '#fff', border: 'none',
                  borderRadius: 12, cursor: 'pointer', fontSize: 15, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  fontFamily: 'sans-serif', letterSpacing: .3 },
};